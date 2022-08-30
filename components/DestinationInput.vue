<template>
  <div class="w-full h-full flex flex-col justify-between mb-5">
    <label class="md:text-lg mb-5 md:pb-0">Destination </label>
    <div class="relative">
      <input
        id="findInput"
        name="search"
        type="text"
        v-model="searchStore.destinationQuery"
        class="
          w-full
          rounded-xl
          bg-white
          p-4
          relative
          input-outline
          hover:shadow-none
        "
        @keyup="manageKeyUp"
        @focus="destinationSuggest.showSuggestions = true"
        @blur="destinationSuggest.showSuggestions = false"
        placeholder="Anywhere"
        ref="findInput"
      />
      <div class="absolute inset-0 flex items-center justify-end pr-2">
        <IconClose
          class="w-6 transition hover:rotate-180 cursor-pointer"
          @mousedown="
            searchStore.destinationQuery = '';
            clear();
          "
        />
      </div>
    </div>
    <!-- autosuggest list-->

    <div
      class="
        absolute
        top-[110%]
        inset-x-0
        unroll
        z-30
        shadow-2xl
        bg-slate-50
        rounded-xl
        overflow-auto
        h-min-[350px]
        origin-top
      "
      v-show="
        destinationSuggest.showSuggestions &&
        destinationSuggest.suggestions.length > 0
      "
    >
      <div class="bg-stone-100 rounded-xl overflow-hidden border">
        <div class="grid">
          <div
            v-for="(item, index) in destinationSuggest.suggestions"
            :key="index"
            class="
              flex
              items-center
              bg-light-300
              py-2
              px-3
              hover:!bg-lime-500 hover:text-white
            "
            :class="{
              '!bg-lime-100 text-black':
                index == destinationSuggest.selectedSuggestion,
            }"
            @mousedown="
              searchStore.destination = item.name;
              searchStore.destinationType = item.type;
              searchStore.destinationQuery = item.name;
            "
          >
            <div class="">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const props = defineProps({
  parent: String,
});

const findInput = ref(null);
const wrapperClass = ref("");
import { useStore } from "@/stores/search";
const searchStore = useStore();
import { useDestinationSuggestStore } from "~~/stores/destinationSuggest";
const destinationSuggest = useDestinationSuggestStore();
onMounted(() => {
  findInput.value.focus();
  if (props.parent == "welcome") {
    wrapperClass.value = "md:top-[64%]";
  }
  if (props.parent == "header") {
    wrapperClass.value = "-top-[50%] md:top-[120%]";
  }
});
const hoveredSuggestion = ref(0);

// clear
const clear = () => {
  destinationSuggest.showSuggestions = false;
  destinationSuggest.suggestions = [];
  destinationSuggest.selectedSuggestion = 0;
};

const manageKeyUp = (e) => {
  // escape:
  if (e.key === "Escape") {
    clear();

    return;
  }

  // down Arrow:
  if (
    e.key === "ArrowDown" &&
    destinationSuggest.selectedSuggestion < suggestions.value.length &&
    destinationSuggest.selectedSuggestion < suggestions.value.length - 1
  ) {
    destinationSuggest.selectedSuggestion++;

    return;
  }
  if (
    e.key === "ArrowDown" &&
    destinationSuggest.selectedSuggestion === suggestions.value.length - 1
  ) {
    destinationSuggest.selectedSuggestion = 0;

    return;
  }
  // up arrow:
  if (e.key === "ArrowUp") {
    if (destinationSuggest.selectedSuggestion >= 0) {
      destinationSuggest.selectedSuggestion--;
    }
    return;
  }
  // enter
  if (e.key === "Enter") {
    // if no selection:
    if (destinationSuggest.selectedSuggestion === -1) {
      return;
    }
    // if suggestion:
    searchStore.destination =
      destinationSuggest.suggestions[destinationSuggest.selectedSuggestion];
    clear();

    return;
  }

  // backspace
  if (e.key === "Backspace") {
    destinationSuggest.showSuggestions = false;
    destinationSuggest.suggestions = [];
    destinationSuggest.selectedSuggestion = -1;
    if (searchStore.destinationQuery == "") {
      return;
    }
  }

  getDestinationSuggestions(searchStore.destinationQuery);
};
const { result: subdestinationResult, search: subdestinationSearch } =
  useSearch("subdestinations");
const { result: destinationResult, search: destinationSearch } =
  useSearch("destinations");
const getDestinationSuggestions = async () => {
  let subdestinationSuggestions = [];
  let destinationSuggestions = [];
  await subdestinationSearch({
    query: searchStore.destinationQuery,
    requestOptions: {
      hitsPerPage: 10,
    },
  }).then((result) => {
    if (result === null || result === undefined) {
      return;
    }
    destinationSuggest.showSuggestions = true;
    subdestinationSuggestions = result.hits.map((item) => ({
      name: item.subdestination,
      type: "subdestination",
    }));
  });

  await destinationSearch({
    query: searchStore.destinationQuery,
    requestOptions: {
      hitsPerPage: 10,
    },
  }).then((result) => {
    if (result === null || result === undefined) {
      return;
    }
    destinationSuggest.showSuggestions = true;

    destinationSuggestions = result.hits.map((item) => ({
      name: item.destination,
      type: "destination",
    }));
    destinationSuggest.suggestions = [
      ...destinationSuggestions,
      ...subdestinationSuggestions,
    ];
  });
};
const mouseOver = (index) => {
  hoveredSuggestion.value = index + 1;
};

const mouseLeave = () => {
  hoveredSuggestion.value = null;
};

watch(
  () => searchStore.destination,
  (a, b) => {
    searchStore.fireQuery();
  }
);
</script>
