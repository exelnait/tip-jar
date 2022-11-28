<script lang="ts">
    import { ethers } from "ethers";

    import contractStore from "../stores/contract-store";
</script>

<div class="p-10">
    <p class="text-x1 text-green-600">
        You're connected! Your address is <strong>{$contractStore.userAddress}</strong>
    </p>
    <ul>
        <li>Network: {$contractStore.network?.name}</li>
        <li>Your current balance: {$contractStore.userBalance && ethers.utils.formatEther($contractStore.userBalance)} eth</li>
        <li>Current contract balance: {$contractStore.balance && ethers.utils.formatEther($contractStore.balance)} eth</li>
    </ul>
</div>