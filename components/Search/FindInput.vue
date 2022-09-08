<template>
  <div class="relative w-full">
    <input
      id="findInput"
      name="search"
      type="text"
      v-model="searchStore.findQuery"
      class="
        h-full
        text-sm
        lg:text-base
        rounded-full
        input-outline
        px-12
        md:px-10
        py-2
        md:py-3
        lg:px-[40px]
        w-full
      "
      :class="{ 'shadow-lg': inputHasFocus }"
      @keyup="manageKeyUp"
      @focus="findInputFocus"
      placeholder="Where to?"
      @blur="
        showFindSuggestions = false;
        inputHasFocus = false;
      "
      ref="findInput"
    />
    <SearchAutoSuggestOverlay />
    <div
      class="pr-2 absolute inset-y-0 right-0 cursor-pointer flex justify-center"
    >
      <IconClose class="w-6 transition hover:rotate-180" @mousedown="clear()" />
    </div>
    <div class="absolute inset-0 flex items-center pl-3 pointer-events-none">
      <NuxtLink to="/search">
        <div
          class="
            pointer-events-auto
            bg-green-avo
            rounded-full
            p-2
            flex
            justify-center
            item-center
            hover:bg-lime-500
          "
        >
          <i class="text-xs fa-solid fa-search" />
        </div>
      </NuxtLink>
    </div>

    <!-- autosuggest list-->
  </div>
</template>
<script setup>
import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useFindSuggestStore } from "~~/stores/findSuggest";
const suggestStore = useFindSuggestStore();
const route = useRoute();
const props = defineProps({
  parent: String,
});
const showFindSuggestions = ref(false);

const findInput = ref(null);
const wrapperClass = ref("");
onMounted(() => {
  findInput.value.focus();
  if (props.parent == "welcome") {
    wrapperClass.value = "top-[64%]";
  }
  if (props.parent == "header") {
    wrapperClass.value = "top-[120%]";
  }
});
const suggestQuery = ref("");
const selectedSuggestion = ref(-1);
const suggestions = ref([]);
const hoveredSuggestion = ref(0);
const destinationSuggestions = ref([]);
const clear = () => {
  searchStore.destinationQuery = "";
  searchStore.findQuery = "";
  showFindSuggestions.value = false;
  suggestions.value = [];
  selectedSuggestion.value = -1;
};

const mouseOver = (index) => {
  hoveredSuggestion.value = index + 1;
};

const mouseLeave = () => {
  hoveredSuggestion.value = null;
};

const { result: findResult, search: findSearch } = useSearch(
  "production_api::package.package"
);

const fireSuggestionQuery = async () => {
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

    getDestinationSuggestions(searchStore.findQuery);

    function ellipsis(text, length) {
      if (text.length > length) {
        let cutTextChars = text.substring(0, length);
        let lastWord = cutTextChars.split(" ").pop(-1);
        let cutText = cutTextChars.slice(
          0,
          cutTextChars.length - lastWord.length
        );
        return cutText + "...";
      } else return text;
    }

    if (suggestions.length === 0) {
      showFindSuggestions.value = false;
    } else {
      showFindSuggestions.value = true;
    }
  });

  if (suggestions.value.length === 0) {
    showFindSuggestions.value = false;
  } else {
    showFindSuggestions.value = true;
  }
};

const inputHasFocus = ref(false);
const findInputFocus = () => {
  if (suggestions.value.length > 0) {
    showFindSuggestions.value = true;
  }
  inputHasFocus.value = true;
};

const { result: regionResult, search: regionSearch } = useSearch("regions");
const { result: destinationResult, search: destinationSearch } =
  useSearch("destinations");

const getDestinationSuggestions = async () => {
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

const searchDestination = (destination) => {
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

const viewPackage = (slug, supplier_ref) => {
  navigateTo({
    path: "/package/" + slug + "_ref=" + supplier_ref,
  });
};
</script>
<style scoped>
</style>