<script>
    import Dashboard from "./Dashboard.svelte";

    export let params = {}

    import {replace} from "svelte-spa-router";
    import {onMount} from "svelte";
    import MediumSkeleton from "../lib/component/skeleton/MediumSkeleton.svelte";
    import {performWithDelay} from "../lib/auth.js";
    import {itemStore} from "../lib/stores.js";

    let isEdit = false
    let id = ''
    let name = ''
    let promise;

    onMount(() => {
        id = params.id || null
        isEdit = id != null

        if (isEdit) {
            promise = getExistingData()
            // update data
            promise.then(data => {
                name = data.name
            })
        }
    })

    const getExistingData = async () => {
        return await performWithDelay(() => $itemStore.items.find(item => item.id === id))
    }

    const editBirthday = async () => {
        await performWithDelay(() => {
            let index = $itemStore.items.findIndex(item => item.id === id)
            if (index) {
                $itemStore.items[index] = {
                    ...$itemStore.items[index],
                    name
                }
            }
        })

        await replace("/dashboard")
    }

    const saveBirthday = async () => {
        await performWithDelay(() =>
            $itemStore.items = [...$itemStore.items, {
                id: `${+new Date()}`,
                name,
                date: new Date()
            }]
        )

        await replace("/dashboard")
    }

</script>

<Dashboard>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 my-10">
        <div class="space-y-10 divide-y divide-gray-900/10">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">{isEdit ? "Edit Item" : "New Item"}</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">Some nice description</p>
                </div>
                {#if promise}
                    {#await promise}
                        <MediumSkeleton/>
                    {:then _}
                        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div class="px-4 py-6 sm:p-8">
                                <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="full-name"
                                               class="block text-sm font-medium leading-6 text-gray-900">Name</label>

                                        <div class="mt-2">
                                            <input type="text" name="full-name" id="full-name" autocomplete="given-name"
                                                   bind:value={name}
                                                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                <button on:click={() => replace("/dashboard")} type="button"
                                        class="text-sm font-semibold leading-6 text-gray-900">Cancel
                                </button>
                                <button on:click={() => isEdit ? editBirthday() : saveBirthday()}
                                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Save
                                </button>
                            </div>
                        </div>
                    {/await}
                {:else }
                    <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                        <div class="px-4 py-6 sm:p-8">
                            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-3">
                                    <label for="full-name"
                                           class="block text-sm font-medium leading-6 text-gray-900">Name</label>

                                    <div class="mt-2">
                                        <input type="text" name="name" id="name" autocomplete="given-name"
                                               bind:value={name}
                                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                            <button on:click={() => replace("/dashboard")} type="button"
                                    class="text-sm font-semibold leading-6 text-gray-900">Cancel
                            </button>
                            <button on:click={() => isEdit ? editBirthday() : saveBirthday()}
                                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Save
                            </button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>

</Dashboard>