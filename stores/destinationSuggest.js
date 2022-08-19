import { defineStore } from "pinia";

export const useDestinationSuggestStore = defineStore("destinationSuggest", {
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