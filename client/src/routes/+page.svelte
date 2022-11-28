<script lang="ts">
	import { onMount } from "svelte";
    
    import SendTipForm, { type TipFormPayload } from "../forms/send-tip.form.svelte";

    import { setup, getAccounts, requestAccounts } from "../services/contract-service"; 
    import contractStore from "../stores/contract-store";

    import tipsStore from "../stores/tips-store";
	import { requestAllTips, listenForNewTips, sendTip } from "../services/tips-service";

	import ContractInfo from "../components/contract-info.svelte";

    onMount(async () => {
        let accounts = await getAccounts();
        const isSuccess = await setup(accounts);
        if (isSuccess) {
            listenForNewTips();
            await requestAllTips();
        }
    });

    async function connectWallet(): Promise<void> {
        let accounts = await requestAccounts();
        const isSuccess = await setup(accounts);
        if (isSuccess) {
            listenForNewTips();
            await requestAllTips();
        }
    }

    let isSending = false;

    const unsubscribe = tipsStore.subscribe(() => {
        isSending = false;
    });

    async function handleSendTip(event: CustomEvent<TipFormPayload>) {
        const { name, message, amount } = event.detail.data;
        try {
            isSending = true
            await sendTip(name, message, amount);
            isSending = false;
            event.detail.target.reset();
        } catch (error) {
            isSending = false;
            console.error(error);
        }
    }
</script>

{#if $contractStore.isConnected}
    <ContractInfo />
    {#if $contractStore.userBalance?.eq(0)}
        <p class="text-x1 text-red-600">You don't have any balance to send tips</p>
    {:else}
        <SendTipForm on:submit={handleSendTip} isSubmitting={isSending} />
    {/if}
    <table class="mt-8 border-collapse table-auto w-2/3 mx-auto text-sm overflow-auto">
        <thead>
            <tr>
                <th class="border-b border-gray-800 p-4 p1-8 pt-0 pb-3 text-gray-700">Sender Address</th>
                <th class="border-b border-gray-800 p-4 p1-8 pt-0 pb-3 text-gray-700">Name</th>
                <th class="border-b border-gray-800 p-4 p1-8 pt-0 pb-3 text-gray-700">Message</th>
                <th class="border-b border-gray-800 p-4 p1-8 pt-0 pb-3 text-gray-700">Date</th>
                <th class="border-b border-gray-800 p-4 p1-8 pt-0 pb-3 text-gray-700">Amount</th>
            </tr>
        </thead>
        <tbody>
            {#each $tipsStore as item}
                <tr>
                    <td class="border-b border-gray-900 p-4 pl-8 text-gray-600">{item.sender}</td>
                    <td class="border-b border-gray-900 p-4 pl-8 text-gray-600">{item.name}</td>
                    <td class="border-b border-gray-900 p-4 pl-8 text-gray-600">{item.message}</td>
                    <td class="border-b border-gray-900 p-4 pl-8 text-gray-600">{item.timestamp}</td>
                    <td class="border-b border-gray-900 p-4 pl-8 text-gray-600">{item.amount}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <button class="bg-blue-600 text-gray-50 shadow-md rounded-md px-3 py-2 text-center" on:click={connectWallet}>
        Connect with wallet
    </button>
{/if}