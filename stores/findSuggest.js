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
          
          };
        packageSuggestionQuery: async () => {
            await findSearch({
              query: searchStore.findQuery,
              requestOptions: {
                hitsPerPage: 5,
              },
            }).then((result) => {
              if (result === null || result === undefined) {
                return;
              }
          
              suggestions.value = result.hits.map((item) => ({
                titleShort: ellipsis(item.title, 70),
                title: item.title,
                description: ellipsis(item.description, 150),
                destination: item.destination,
                slug: item.slug,
                supplier_ref: item.supplier_ref,
              }));
          
          
             
          
              if (suggestions.value.length === 0) {
                showFindSuggestions.value = false;
              } else {
                showFindSuggestions.value = true;
              }
            });
          };

        destinationSuggestionQuery: async () => {
            let regionSuggestions = [];
            let destinationSuggestions = [];
            await regionSearch({
              query: searchStore.findQuery,
              requestOptions: {
                hitsPerPage: 10,
              },
            }).then((result) => {
              if (result === null || result === undefined) {
                return;
              }
              suggestStore.showSuggestions = true;
              regionSuggestions = result.hits.map((item) => ({
                name: item.region,
                type: "region",
              }));
            });
          
            await destinationSearch({
              query: searchStore.findQuery,
              requestOptions: {
                hitsPerPage: 10,
              },
            }).then((result) => {
              if (result === null || result === undefined) {
                return;
              }
              suggestStore.showSuggestions = true;
          
              destinationSuggestions = result.hits.map((item) => ({
                name: item.destination,
                type: "destination",
              }));
              suggestStore.suggestions = [
                ...destinationSuggestions,
                ...regionSuggestions,
              ];
            });
          };

    },
    
    getters: {

    }
})