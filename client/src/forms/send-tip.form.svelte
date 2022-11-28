<script lang="ts" context="module">
    export interface TipFormPayload {
        target: HTMLFormElement;
        data: TipFormData;
    }
    interface TipFormData {
        name: string;
        message: string;
        amount: string;
    }
</script>
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

	export let isSubmitting: boolean;

    function handleSubmit(event: SubmitEvent) {
        if (event.target) {
            const target = event.target as HTMLFormElement
            const formData = new FormData(target);
            const data = Object.fromEntries(formData.entries() as any) as TipFormData;
            
            dispatch('submit', {
                target,
                data
            } as TipFormPayload);
        } else {
            throw new Error("No event target");
        }
    }
</script>

<form
    on:submit|preventDefault={handleSubmit}
    class="w-2/3 mx-auto border rounded-md border-indigo-200 flex flex-col gap-8 p-6 mt-4"
>
    <div class="grid grid-cols-2">
        <label for="amount">Send me an ETH tip!</label>
        <input name="amount" placeholder="0.001" class="border border-gray-500 rounded-sm p-1"/>
    </div>
    <div class="grid grid-cols-2">
        <label for="name">Your name</label>
        <input name="name" class="border border-gray-500 rounded-sm p-1"/>
    </div>
    <div class="grid grid-cols-2">
        <label for="message">Your message</label>
        <input name="message" class="border border-gray-500 rounded-sm p-1"/>
    </div>
    <button disabled={isSubmitting} type="submit" class="bg-green-500  shadow-md rounded-md px-2 py-2 text-center w-1/3 text-white">
        {isSubmitting ? 'Sending...' : 'Send Tip'}
    </button>
</form>