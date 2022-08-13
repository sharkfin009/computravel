import { defineStore } from "pinia"

export const useStore = defineStore("package",{
    state: () => ({
        package:ref({})
    }),
    actions: {},
    getters: {}
})