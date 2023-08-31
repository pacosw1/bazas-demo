<script>
    import {onMount} from "svelte";
    import Dashboard from "./Dashboard.svelte";
    import {push} from "svelte-spa-router";
    import {performWithDelay} from "../lib/auth.js";
    import {itemStore} from "../lib/stores.js";
    import VerySmallSkeleton from "../lib/component/skeleton/VerySmallSkeleton.svelte";

    // State
    let promise

    // Query
    const getData = async () => {
        return await performWithDelay(() => $itemStore.items)
    }

    onMount(() => {
        promise = getData()
    })


</script>

<Dashboard>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 my-10">
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">Items</h1>
                    <p class="mt-2 text-sm text-gray-700">A list of all items blah blah blah,
                        and more</p>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button type="button" on:click={() => push("/dashboard/item/new")}
                            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add Item
                    </button>
                </div>
            </div>
            <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        {#if promise}
                            {#await promise}
                                <div class="space-y-2">
                                    <VerySmallSkeleton/>
                                    <VerySmallSkeleton/>
                                    <VerySmallSkeleton/>
                                    <VerySmallSkeleton/>
                                    <VerySmallSkeleton/>
                                    <VerySmallSkeleton/>
                                </div>
                            {:then response}
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead>
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Name
                                        </th>
                                        <!--                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>-->

                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Last
                                            Updated
                                        </th>

                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody class="divide-y divide-gray-200">

                                    {#each response as item}
                                        <tr>
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {item.name}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {item.date.toDateString()}
                                            </td>
                                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a href="#/dashboard/item/{item.id}"
                                                   class="text-indigo-600 hover:text-indigo-900">Edit<span
                                                        class="sr-only">, Lindsay Walton</span></a>
                                            </td>
                                        </tr>
                                    {/each}
                                    </tbody>
                                </table>
                            {:catch error}
                                <p>{error}</p>
                            {/await}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</Dashboard>