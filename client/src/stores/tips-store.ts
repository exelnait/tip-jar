import { writable } from "svelte/store";

interface Tip {
    sender: string;
    name: string;
    message: string;
    timestamp: string;
    amount: string;
}

const store = writable<Tip[]>([]);

export default store;