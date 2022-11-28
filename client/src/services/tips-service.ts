import { ethers } from "ethers";

import { get } from 'svelte/store';

import {getContract, getRwContract, updateBalance} from './contract-service';
import contractStore from './../stores/contract-store';
import tipsStore from "./../stores/tips-store";

export async function requestAllTips(): Promise<void> {
    const contract = getContract();
    const {isConnected} = get(contractStore);
    if (isConnected && contract) {
        const tips = await contract.getAllTips();
        tipsStore.set(tips.map((tip) => {
            return {
                ...tip,
                timestamp: new Date(tip.timestamp.toNumber() * 1000).toLocaleDateString(),
                amount: ethers.utils.formatEther(tip.amount)
            };
        }));
    } else {
        throw new Error("Can't getAllTips(). No contract or contract is not connected");
    }
}

export async function listenForNewTips() {
    const contract = getContract();
    if (contract) {
        contract.on('NewTip', async () => {
            await updateBalance();
            await requestAllTips();
        });
    } else {
        console.log("Can't listenForNewTips(). No provider");
    }
}

export async function sendTip(name: string, message: string, amount: string): Promise<void> {
    const {isConnected} = get(contractStore);
    if (isConnected) {
        const rwContract =  await getRwContract();
        const tx = await rwContract.sendTip(name, message, {
            value: ethers.utils.parseEther(amount)
        });
        await tx.wait();
    } else {
        console.error("Can't sendTip(). No connection");
    }
}