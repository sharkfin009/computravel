<template>
  <div class="w-full h-full  "
          style="z-index:1000"
>
          <div
        class="
          fixed
          inset-0
          bg-black
          opacity-0
          transition
          duration-300
          w-screen
          h-screen
          pointer-events-none
         
          thisone
          
        "
        :class="{
          'opacity-40': suggestions.length > 0 && showFindSuggestions,
        }"
      />
    <div class="relative w-full ">
      <input
        id="findInput"
        name="search"
        type="text"
        v-model="searchStore.findQuery"
        class="h-full text-sm rounded-full input-outline p-3 px-5 w-full"
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
      <div
        class="
          pr-3
          absolute
          inset-y-0
          right-0
          cursor-pointer
          flex
          justify-center
        "
      >
        <IconClose
          class="w-6 transition hover:rotate-180"
          @mousedown="clear()"
        />
      </div>
      <!-- autosuggest list-->
    </div>
    <div
      class="
        absolute
        left-0
        bottom-0
        flex
        justify-center
        items-start
        lg:px-20
        w-full
      "
      :class="wrapperClass"
      v-show="showFindSuggestions && suggestions.length > 0"
    >
    
      <div
        class="
          relative
          unroll
          shadow-3xl
          bg-white
          lg:bg-gray-300
          p-2
          lg:p-10
          rounded-3xl
          origin-top
          lg:grid lg:grid-cols-[3fr,1.3fr]
          w-[50%]
          md:w-[90vw]
          z-50
        "
        :class="{
          'md:bg-opacity-60 ': route.path == '/',
        }"
      >
        <div class="w-full">
          <div
            v-for="(suggestion, index) in suggestions"
            :class="{
              ' !bg-opacity-90  rounded-3xl bg-lime-600 text-lime-200':
                index === selectedSuggestion,
            }"
            :key="index"
            class=""
          >
            <div
              class="block lg:grid lg:grid-cols-[auto,120px] rounded-full"
              :class="{
                '!bg-green-text !bg-opacity-80 !text-white':
                  index === hoveredSuggestion - 1,
              }"
              v-on:mouseover="mouseOver(index)"
              @mouseleave="mouseLeave"
              @mousedown="viewPackage(suggestion.slug, suggestion.supplier_ref)"
            >
              <div class="">
                <div
                  class="
                    flex
                    items-center
                    px-3
                    py-2
                    w-full
                    rounded-l-full
                    cursor-pointer
                    transition-colors
                  "
                >
           

                  <div
                    class="hidden lg:block font-semibold mr-2 text-lime-700 "
                    :class="{
                      ' !text-lime-200': index === hoveredSuggestion - 1,
                      ' text-lime-200':
                        index === selectedSuggestion,
                    }"
                  >
                    {{ suggestion.titleShort }}
                  </div>
                  <div
                    class="block lg:hidden font-semibold mr-2 text-lime-900 text-xs text-center w-full" 
                    :class="{
                      ' !text-lime-200': index === hoveredSuggestion - 1,
                      ' !text-lime-200':
                        index === selectedSuggestion,
                    }"
                  >
                    {{ suggestion.titleShort }}
                  </div>
                  <div class="hidden lg:block">
                    {{ suggestion.description }}
                  </div>
                </div>
              </div>
              <div
                class="
                  hidden
                  lg:flex
                  text-lime-700
                  items-center
                  font-medium
                  px-1
                "
                :class="{
                  ' !text-lime-200': index === hoveredSuggestion - 1,
                  '  !text-lime-200':
                    index === selectedSuggestion,
                }"
              >
                {{ suggestion.destination }}
              </div>
            </div>
          </div>
        </div>

        <div class="hidden lg:block p-2">
          <div class="mb-2">related searches:</div>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="(item, index) in destinationSuggestions"
              :key="index"
              class="
                flex
                items-center
                bg-gray-100
                rounded-full
                p-1
                hover:bg-green-text hover:text-lime-200
              "
              @mousedown="searchDestination(item.name)"
            >
              <IconSearch class="h-4" />
              <div class="">{{ item.name }}</div>
            </div>
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
//   const emit = defineEmits(['fireFindQuery', 'clearAll', 'fireSearch'])
const clear = () => {
  searchStore.findQuery = "";
  showFindSuggestions.value = false;
  suggestions.value = [];
  selectedSuggestion.value = -1;
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
      return;
    }
    // if suggestion:
    viewPackage(suggestions.value[selectedSuggestion.value].slug);
    clear();

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
      titleShort: ellipsis(item.title, 30),
      title: item.title,
      description: ellipsis(item.description, 75),
      destination: item.destination,
      slug: item.slug,
      supplier_ref: item.supplier_ref,
    }));

    getDestinationSuggestions(suggestions.value[0].destination);

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

const { result: destinationResult, search: destinationSearch } = useSearch(
  "subdestinations_from_destination"
);

const getDestinationSuggestions = async (destination) => {
  await destinationSearch({
    query: destination,
    requestOptions: {
      hitsPerPage: 5,
    },
  }).then((result) => {
    if (result === null || result === undefined) {
      return;
    }

    destinationSuggestions.value = result.hits.map((item) => ({
      name: item.subdestination,
    }));
  });
};

import { useStore } from "@/stores/search";

const searchStore = useStore();

const searchDestination = (destination) => {
  searchStore.destination = {
    type: "subdestination",
    name: destination,
  };
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