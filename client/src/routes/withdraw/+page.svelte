<script lang="ts">
    import { onMount } from "svelte";

    import contractStore from "../../stores/contract-store";
    import { setup, withdraw, getAccounts } from "../../services/contract-service";

    import ContractInfo from "../../components/contract-info.svelte";

    onMount(async () => {
        let accounts = await getAccounts();
        await setup(accounts);
    });

    let isWithdrawing = false;

    async function handleWithdraw() {
        try {
            isWithdrawing = true;
            await withdraw();
            isWithdrawing = false;
        } catch (error) {
            isWithdrawing = false;
            console.error(error);
        }
    }
</script>

{#if $contractStore.isConnected}
    <h1 class="text-3xl text-gray-800 p8 mb-10">WithDraw from the TipJar contract</h1>

    <ContractInfo />

    {#if $contractStore.isIamContractOwner}
        {#if $contractStore.balance && $contractStore.balance.gt(0)}
            <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" on:click={handleWithdraw}>
                { isWithdrawing ? 'Withdrawing...' : 'Withdraw' }
            </button>
        {:else}
            <p class="text-x1 text-red-600">You don't have any balance to withdraw</p>
        {/if}
    {:else}
        <p class="text-x1 text-red-600">You're not the contract owner</p>
    {/if}
{/if}