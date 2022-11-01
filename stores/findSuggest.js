import { defineStore } from "pinia";
import { useStore } from "@/stores/search";

import { useSearchDestination } from "@/stores/searchDestinationInput";

export const useFindSuggestStore = defineStore("findSuggest", {
  state: () => ({
    queryString: ref(""),
    packageSuggestions: ref([]),
    searchSuggestions: ref([]),
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
      //  get both countries and provinces and (destinations) and regions and make an nonduped array of object with a type property and a name property , so that we can query the right content type from strapi if this suggestion gets searched
      const searchStore = useStore();
      const { $ellipsis } = useNuxtApp();
      const { result: regionResult, search: regionSearch } =
        useSearch("prod-regions");
      const { result: destinationResult, search: countryOrProvinceSearch } =
        useSearch("prod-destinations");
      const { result: citiesResult, search: citySearch } = useSearch(
        "production_api::city.city"
      );

      Promise.all([
        regionSearch({
          query: string,
          requestOptions: {
            hitsPerPage: 15,
          },
        }),
        countryOrProvinceSearch({
          query: string,
          requestOptions: {
            hitsPerPage: 10,
          },
        }),
        citySearch({
          query: string,
          requestOptions: {
            hitsPerPage: 10,
          },
        }),
      ]).then((values) => {
        console.log(values);
        // if no results dont show overlay, we are done - return
        if (values === null || values === undefined) {
          return;
        }
        // else show overlay and generate suggestions:
        this.showSuggestions = true;

        // get
        this.packageSuggestions = [...values[0].hits, ...values[1].hits].map(
          (item) => ({
            titleShort: $ellipsis(item.title, 70),
            title: item.title,
            description: $ellipsis(item.description, 200),
            destination: item.destination,
            slug: item.slug,
            supplier_ref: item.supplier_ref,
            price: item.price,
          })
        );
        let regionSuggestions = values[0].hits.map((item) => ({
          name: item.region,
          type: "region",
        }));

        let countryOrProvinceSuggestions = values[1].hits.map((item) => ({
          name: item.destination,
          type: "destination",
        }));
        let citySuggestions = values[2].hits.map((item) => ({
          name: item.name,
          type: "city",
        }));
        let searchSuggestions = [
          ...citySuggestions,
          ...regionSuggestions,
          ...countryOrProvinceSuggestions,
        ];
        this.searchSuggestions = searchSuggestions.filter(
          (obj, index, array) =>
            index === array.findIndex((match) => match.name === obj.name)
        );
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
