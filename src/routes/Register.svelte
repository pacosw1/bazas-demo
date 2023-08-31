<script lang="ts">
    import client from "../lib/auth"
    import {authenticationStore} from "../lib/stores"
    import {push, pop, replace} from 'svelte-spa-router'
    import {onDestroy} from "svelte";

    // Reactive values
    let email = ""
    let phoneNumber = ""
    let password = ""

    // auth status
    let unsub = authenticationStore.subscribe(status => {
        if (status.isAuthenticated) {
            push("/dashboard")
        }
    })

    onDestroy(unsub)

    const onSubmit = async () => {
        await client.registerUser(email, password)
    }

</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form class="space-y-6" on:submit|preventDefault={onSubmit}>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input id="email" bind:value={email} name="email" type="email" autocomplete="email" required
                               class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" bind:value={password} name="password" type="password"
                               autocomplete="current-password" required
                               class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <label for="phone" class="block text-sm font-medium leading-6 text-gray-900 mt-10">Phone
                        Number</label>
                    <div class="mt-2">
                        <input id="phone" bind:value={phoneNumber} name="phone" type="phone" required
                               class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <p class="p-1 text-xs text-gray-600 leading-normal">You'll need to verify this number</p>
                </div>
                <div>
                    <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign up
                    </button>
                </div>
            </form>
            <div>
                <div class="relative mt-10">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-200"></div>
                    </div>
                    <div class="relative flex justify-center text-sm font-medium leading-6">
                        <span class="bg-white px-6 text-gray-900">Already have an account?</span>
                    </div>
                </div>

                <p class="mt-3 text-center text-sm text-gray-500">
                    <a href="#/auth/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign
                        in</a>
                </p>
            </div>
        </div>
    </div>
</div>
