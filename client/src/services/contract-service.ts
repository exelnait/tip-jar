import { browser } from '$app/environment';

import type { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { get } from 'svelte/store';

import TipJarABI from '../../../blockchain/artifacts/contracts/TipJar.sol/TipJar.json';
import type { TipJar } from '../../../blockchain/typechain-types';

const ethereum = browser && window.ethereum;
export const contractAddress: string = import.meta.env.VITE_CONTRACT_ADDRESS;
export const provider = getEthereumProvider();

export function getEthereumProvider(): Web3Provider | null {
    return ethereum ? new ethers.providers.Web3Provider(ethereum) : null;
}

export function getContract(): TipJar {
    if (provider) {
        return new ethers.Contract(contractAddress, TipJarABI.abi, provider) as TipJar;
    } else {
        throw new Error("Can't getContract(). No provider");
    }
}

// Signer contract
export async function getRwContract(): Promise<TipJar> {
    if (provider) {
        return new ethers.Contract(contractAddress, TipJarABI.abi, provider.getSigner()) as TipJar;
    } else {
        throw new Error("Can't getRwContract(). No provider");
    }
}

export async function updateBalance(): Promise<void> {
    if (provider) {
        const userAddress = get(contractStore).userAddress;
        if (!userAddress) {
            console.error("Can't updateBalance(). No userAddress");
        }
        const userBalance = await provider.getBalance(userAddress!);
        const contractBalance = await provider.getBalance(contractAddress);
        contractStore.update(store => ({
            ...store,
            balance: contractBalance,
            userBalance: userBalance
        }));
    } else {
        console.error("Can't updateBalance(). No provider");
    }
}

export function getAccounts(): Promise<string[]> {
    if (ethereum && ethereum.request) {
        return ethereum.request({ method: "eth_accounts" });
    } else {
        throw new Error("No ethereum object found");
    }
}

export function requestAccounts(): Promise<string[]>  {
    if (ethereum && ethereum.request) {
        return ethereum.request({ method: "eth_requestAccounts" });
    } else {
        throw new Error("No ethereum object found");
    }
}

import contractStore from './../stores/contract-store';

export async function setup(accounts: string[]): Promise<boolean> {
    try {
        if (accounts.length == 0) {
            throw new Error("No accounts found");
        }
        const userAddress = accounts[0];
        const contractOwnerAddress = await getContract().owner();
        if (ethereum && userAddress && provider) {
            const network = await provider.getNetwork();
            const userBalance = await provider.getBalance(userAddress);
            const contractBalance = await provider.getBalance(contractAddress);
            const isIamContractOwner = ethers.utils.getAddress(userAddress) === ethers.utils.getAddress(contractOwnerAddress);
            const isConnected = true;
            contractStore.set({
                userAddress,
                userBalance,
                network,
                balance: contractBalance,
                isIamContractOwner,
                isConnected
            })
            return true;
        } else {
            throw new Error("No ethereum provider or userAddress found");
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function withdraw(): Promise<void> {
    const {isConnected} = get(contractStore);
    if (isConnected) {
        const contract = getContract();
        const rwContract =  await getRwContract();

        const tx = await rwContract.withdraw();

        return new Promise(async (resolve, reject) => {
            contract.once("NewWithdraw", async () => {
                await updateBalance();
                resolve();
            })
    
            await tx.wait();
        });
    } else {
        console.error("Can't withdraw(). No connection");
    }
}