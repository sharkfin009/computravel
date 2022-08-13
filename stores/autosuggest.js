import { defineStore } from "pinia";

export const useStore = defineStore("autosuggest", {
    state: () => ({
        results: ref([]),
        query:ref(''),


    }),
    actions: {
     
    },
    getters: {

    }
})