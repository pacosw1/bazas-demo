<script>
    import {authenticationStore} from "./lib/stores.js"

    import Router, {replace} from 'svelte-spa-router'
    import Home from "./routes/Home.svelte";
    import Login from "./routes/Login.svelte";
    import Register from "./routes/Register.svelte";
    import NotFound from "./routes/NotFound.svelte";
    import {onDestroy, onMount} from "svelte";

    import NewItemForm from "./routes/NewItemForm.svelte";
    import InternalError from "./routes/InternalError.svelte";
    import List from "./routes/List.svelte";

    // on app start
    onMount(() => {
        // if user exists
        // get actual session
        let item = localStorage.getItem("session")
        if (item) {
            console.log(true)
            authenticationStore.set(JSON.parse(item))
        }
    })

    let unsub = authenticationStore.subscribe(session => {
        if (session.isAuthenticated) {
            replace("/dashboard")
        } else {
            // not logged in, go back to login page
            replace("/")
        }
    })

    onDestroy(unsub)

</script>

<Router routes={{
        "/": Home,
        "/internal-error": InternalError,
        "/dashboard": List,
        "/dashboard/item/new": NewItemForm,
        "/dashboard/item/:id": NewItemForm,
        "/auth/login": Login,
        "/auth/register": Register,
        // The catch-all route must always be last
        "*": NotFound,
 }}/>
