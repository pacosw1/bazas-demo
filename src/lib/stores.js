import {writable} from 'svelte/store';

export const authenticationStore = writable({
    isAuthenticated: false,
    user: {
        email: ""
    },
});


export const itemStore = writable({
    items: [
        {
            id: "1",
            name: "item 1",
            date: new Date()
        },
        {
            id: "2",
            name: "item 2",
            date: new Date()
        },
        {
            id: "3",
            name: "item 3",
            date: new Date()
        },
        {
            id: "4",
            name: "item 4",
            date: new Date()
        },
    ]
});