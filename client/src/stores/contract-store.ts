import { writable } from 'svelte/store';
 
import type { BigNumber, ethers } from "ethers";

export interface ContractStore {
    userAddress: string | null;
    userBalance: BigNumber | null;
    network: ethers.providers.Network | null;
    balance: BigNumber | null;
    isIamContractOwner: boolean;
    isConnected: boolean;
}

const defaultValue: ContractStore = {
    userAddress: null,
    userBalance: null,
    network: null,
    balance: null,
    isIamContractOwner: false,
    isConnected: false
};
 
const store = writable<ContractStore>(defaultValue);

export default store;