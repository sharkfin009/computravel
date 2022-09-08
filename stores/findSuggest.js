import { defineStore } from "pinia";
import { useStore } from "@/stores/search";
const searchStore = useStore();

export const useFindSuggestStore = defineStore("findSuggest", {
    state: () => ({
        packageSuggestions: ref([]),
        destinationSuggestions: ref([]), 
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
              this.this.selectedSuggestion < this.suggestions.length &&
              this.this.selectedSuggestion < this.suggestions.length - 1
            ) {
              this.this.selectedSuggestion++;
          
              return;
            }
            if (
              e.key === "ArrowDown" &&
              this.selectedSuggestion === this.suggestions.length - 1
            ) {
              this.selectedSuggestion = 0;
          
              return;
            }
            // up arrow:
            if (e.key === "ArrowUp") {
              if (this.selectedSuggestion >= 0) {
                this.selectedSuggestion--;
              }
              return;
            }
            // enter
            if (e.key === "Enter") {
              // if no selection:
              if (this.selectedSuggestion === -1) {
                this.showSuggestions = false;
                searchDestination(searchStore.findQuery);
                return;
              }
          
              // if suggestion:
              viewPackage(
                this.suggestions[this.selectedSuggestion].slug,
                this.suggestions[this.selectedSuggestion].supplier_ref
              );
              clear();
              this.showSuggestions = false;
              return;
            }
          
            //     // backspace
            if (e.key === "Backspace") {
              this.showSuggestions = false;
              this.suggestions = [];
              this.selectedSuggestion = -1;
              if (suggestQuery == "") {
                return;
              }
            }
          
          };
        getSuggestions:() =>{
            packageSuggestionQuery()
            destinationSuggestionQuery()
        }
        packageSuggestionQuery: async () => {
            const { result: findResult, search: findSearch } = useSearch(
                "production_api::package.package"
              );
            const { $ellipsis } = useNuxtApp()
            await findSearch({
              query: searchStore.findQuery,
              requestOptions: {
                hitsPerPage: 5,
              },
            }).then((result) => {
              if (result === null || result === undefined) {
                return;
              }
          
              this.packageSuggestions = result.hits.map((item) => ({
                titleShort: $ellipsis(item.title, 70),
                title: item.title,
                description:$ellipsis(item.description, 150),
                destination: item.destination,
                slug: item.slug,
                supplier_ref: item.supplier_ref,
              }));
          
          
             
          
              if (this.packageSuggestions.length === 0) {
                this.showSuggestions = false;
              } else {
                this.showSuggestions = true;
              }
            });
          };

        destinationSuggestionQuery: async () => {
            const { result: regionResult, search: regionSearch } = useSearch("regions");
            const { result: destinationResult, search: destinationSearch } = useSearch("destinations");
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
              this.showSuggestions = true;
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
              this.showSuggestions = true;
          
              destinationSuggestions = result.hits.map((item) => ({
                name: item.destination,
                type: "destination",
              }));
              this.destinationSuggestions = [
                ...destinationSuggestions,
                ...regionSuggestions,
              ];
            });
          };
        searchDestination: (destination) => {
            searchStore.destinationQuery = destination;
            searchStore.destination = destination;
            searchStore.findQuery = "";
            searchStore.fireQuery();
            if (route.path != "/search") {
              navigateTo({
                path: "/search",
              });
            }
          };
          
        viewPackage : (slug, supplier_ref) => {
            navigateTo({
              path: "/package/" + slug + "_ref=" + supplier_ref,
            });
          };

    },
    
    getters: {

    }
})