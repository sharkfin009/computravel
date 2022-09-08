import { defineStore } from "pinia";

export const useFindSuggestStore = defineStore("findSuggest", {
    state: () => ({
        suggestions: ref([]),
        query:ref(''),
        showSuggestions: ref(false),
        selectedSuggestion: ref(0)
    }),
    actions: {
        manageKeyUp: (e) => {
            // escape:
            if (e.key === "Escape") {
              clear();
          
              return;
            }
          
            // down Arrow:
            if (
              e.key === "ArrowDown" &&
              selectedSuggestion.value < suggestions.value.length &&
              selectedSuggestion.value < suggestions.value.length - 1
            ) {
              selectedSuggestion.value++;
          
              return;
            }
            if (
              e.key === "ArrowDown" &&
              selectedSuggestion.value === suggestions.value.length - 1
            ) {
              selectedSuggestion.value = 0;
          
              return;
            }
            // up arrow:
            if (e.key === "ArrowUp") {
              if (selectedSuggestion.value >= 0) {
                selectedSuggestion.value--;
              }
              return;
            }
            // enter
            if (e.key === "Enter") {
              // if no selection:
              if (selectedSuggestion.value === -1) {
                showFindSuggestions.value = false;
          
                searchDestination(searchStore.findQuery);
                return;
              }
          
              // if suggestion:
              viewPackage(
                suggestions.value[selectedSuggestion.value].slug,
                suggestions.value[selectedSuggestion.value].supplier_ref
              );
              clear();
              showFindSuggestions.value = false;
              return;
            }
          
            //     // backspace
            if (e.key === "Backspace") {
              showFindSuggestions.value = false;
              suggestions.value = [];
              selectedSuggestion.value = -1;
              if (suggestQuery.value == "") {
                return;
              }
            }
          
            fireSuggestionQuery();
          };
      

    },
    getters: {

    }
})