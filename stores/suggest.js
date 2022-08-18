import { defineStore } from "pinia";

export const useSuggestStore = defineStore("suggest", {
    state: () => ({
        suggestions: ref([]),
        query:ref(''),
        showSuggestions: ref(false),
        selectedSuggestion: ref(0)
    }),
    actions: {
   
      

    },
    getters: {

    }
})