import {authenticationStore} from "./stores.js"
import {replace} from "svelte-spa-router";

const registerUser = async (email, password, phoneNumber) => {
    let session = {
        isAuthenticated: true,
        user: {
            email,
            phoneNumber
        }
    }
    await authenticationStore.set(session)
    await localStorage.setItem("session", JSON.stringify(session))
}

const signOutUser = async () => {

    // TODO Implement actual logout
    await authenticationStore.update(data => {
        return {
            isAuthenticated: false,
            user: null,
        }
    })

    await localStorage.removeItem("session")
    await replace("/")
}

const authenticateUser = async (email, password) => {
    await performWithDelay(() => {
        // TODO Implement actual sign in
        let session = {
            isAuthenticated: true,
            user: {
                email: email,
                phoneNumber: "1111111"
            }
        }
        authenticationStore.set(session)
        localStorage.setItem("session", JSON.stringify(session))
    })
}

// HELPERS
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const performWithDelay = async (action) => {
    const delayMs = Math.floor(Math.random() * (800 - 400 + 1)) + 400;

    await delay(delayMs)
    let result = await action()
    console.log(result)
    return result
}

export default {
    authenticateUser,
    registerUser,
    signOutUser
}
