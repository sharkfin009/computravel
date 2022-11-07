import { defineStore } from "pinia";
import { useStore } from "@/stores/search";

export const useSearchDestination = defineStore("searchDestinationInput", {
  state: () => ({
    queryString: ref(""),
    destinationSuggestions: ref([]),
    showSuggestions: ref(false),
    selectedSuggestion: ref(-1),
  }),
  actions: {
    manageKeyUp(e) {
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

      let regionSuggestions = [];
      let destinationSuggestions = [];
      await regionSearch({
        query: string,
        requestOptions: {
          hitsPerPage: 50,
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
      });
    },
    searchDestination(destination) {
      const route = useRoute();
      const searchStore = useStore();
      searchStore.destinationQuery = destination.name;
      searchStore.destination = destination.name;
      searchStore.destinationType = destination.type;
      this.queryString = destination.name;

      searchStore.fireQuery();

      this.destinationSuggestions = [];
      this.selectedSuggestion = -1;

      this.showSuggestions = false;
      if (route.path != "/search") {
        navigateTo({
          path: "/search",
        });
      }
    },

    clear() {
      this.queryString = "";
      this.selectedSuggestion = "";
      this.destinationSuggestions = [];
      this.showSuggestions = false;
    },
  },

  getters: {},
});
