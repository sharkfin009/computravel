import { defineStore } from "pinia";
import { useStore } from "@/stores/search";

import { useSearchDestination } from "@/stores/searchDestinationInput";

export const useFindSuggestStore = defineStore("findSuggest", {
  state: () => ({
    queryString: ref(""),
    packageSuggestions: ref([]),
    destinationSuggestions: ref([]),
    showSuggestions: ref(false),

    selectedSuggestion: ref(-1),
    packagesFromRegionQuery: [],
    packagesFromDestinationQuery: [],
  }),
  actions: {
    manageKeyUp(e) {
      window.scrollTo(0, 0);
      const searchStore = useStore();
      // escape:
      if (e.key === "Escape") {
        this.clear();

        return;
      }

      // down Arrow:
      if (
        e.key === "ArrowDown" &&
        this.selectedSuggestion < this.destinationSuggestions.length - 1
      ) {
        this.selectedSuggestion++;

        return;
      }
      if (
        e.key === "ArrowDown" &&
        this.selectedSuggestion === this.destinationSuggestions.length - 1
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
          searchDestination(this.destinationSuggestions[0]);
          return;
        }

        // if suggestion:
        if (this.queryString !== "") {
          this.queryString =
            this.destinationSuggestions[this.selectedSuggestion];
        }

        this.searchDestination(
          this.destinationSuggestions[this.selectedSuggestion]
        );
        this.clear();
        this.showSuggestions = false;
        return;
      }

      //     // backspace
      if (e.key === "Backspace") {
        this.showSuggestions = false;
        this.packageSuggestions = [];
        this.destinationSuggestions = [];
        this.selectedSuggestion = -1;
        if (this.queryString == "") {
          return;
        }
      }
      this.suggestionQuery(e.target.value);
    },

    async suggestionQuery(string) {
      //  get both countries and provinces (destinations) and regions and make an nonduped array of object with a type property and a name property , so that we can query the right content type from strapi if this suggestion gets searched
      const searchStore = useStore();
      const { $ellipsis } = useNuxtApp();
      const { result: regionResult, search: regionSearch } =
        useSearch("prod-regions");
      const { result: destinationResult, search: destinationSearch } =
        useSearch("prod-destinations");
      const { result: citiesResult, search: citySearch } =
        useSearch("api::city.city");
      let regionSuggestions = [];
      let destinationSuggestions = [];
      let citySuggestions = [];

      regionSearch({
        query: string,
        requestOptions: {
          hitsPerPage: 15,
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
        this.packagesFromRegionQuery = result.hits;
      });

      destinationSearch({
        query: string,
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
        let withDupes = [...destinationSuggestions, ...regionSuggestions];
        let deduped = [];
        withDupes.forEach((item) => {
          if (!deduped.map((item) => item.name).includes(item.name)) {
            deduped.push(item);
          }
        });
        this.destinationSuggestions = deduped;

        // build packages from same results with destination dupes:
        this.packagesFromDestinationQuery = result.hits;
        this.packageSuggestions = [
          ...this.packagesFromDestinationQuery,
          ...this.packagesFromRegionQuery,
        ]
          .map((item) => ({
            titleShort: $ellipsis(item.title, 70),
            title: item.title,
            description: $ellipsis(item.description, 200),
            destination: item.destination,
            slug: item.slug,
            supplier_ref: item.supplier_ref,
            price: item.price,
          }))
          .filter((item, index) => {
            return index <= 25;
          });
      });
    },

    searchDestination(destination) {
      const route = useRoute();
      const searchStore = useStore();
      const destinationInputStore = useSearchDestination();
      destinationInputStore.queryString = destination.name;
      searchStore.destinationQuery = destination.name;
      searchStore.destination = destination.name;
      searchStore.destinationType = destination.type;
      this.queryString = destination.name;
      searchStore.fireQuery();
      this.packageSuggestions = [];
      this.destinationSuggestions = [];
      this.selectedSuggestion = -1;

      this.showSuggestions = false;
      if (route.path != "/search") {
        navigateTo({
          path: "/search",
        });
      }
    },

    viewPackage(slug, supplier_ref) {
      this.showSuggestions = false;
      navigateTo({
        path: "/package/" + slug + "_ref=" + supplier_ref,
      });
    },
    clear() {
      this.destinationQuery = "";
      this.queryString = "";
      this.selectedSuggestion = "";
      this.destinationSuggestions = [];
      this.packageSuggestions = [];
      this.showSuggestions = false;
      const searchStore = useStore();
      searchStore.$reset();
      window.scrollTo(0, 0);
      const destinationInputStore = useSearchDestination();
      destinationInputStore.queryString = "";
    },
  },

  getters: {},
});
