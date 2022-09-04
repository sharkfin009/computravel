import { defineStore } from "pinia"

export const useStore = defineStore("package",{
    state: () => ({
        package:ref({}),
        alreadyAdded : ref(false)
    }),
    actions: {},
    getters: {}
})