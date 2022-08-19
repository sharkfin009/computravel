import { defineStore } from "pinia";

export const useFindSuggestStore = defineStore("findSuggest", {
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