<template>
  <div class="w-full h-full relative">
    <label class="text-lg">Destination </label>
    <input
      id="findInput"
      name="search"
      type="text"
      v-model="searchStore.destination"
      class="
        w-full
        rounded-xl
        bg-white
        p-4
        relative
        input-outline
        shadow-xl
        hover:shadow-none
      "
      @keyup="manageKeyUp"
      @focus="suggestStore.showSuggestions = true"
      @blur="suggestStore.showSuggestions = false"
      placeholder="Anywhere"
      ref="findInput"
    />
    <IconClose
      class="
        w-6
        absolute
        right-[10px]
        top-[50%]
        transition
        hover:rotate-180
        cursor-pointer
      "
      @mousedown="
        searchStore.destination= '';
        clear();
      "
    />
    <!-- autosuggest list-->

    <div
      class="
        absolute
        top-[110%]
        inset-x-0
        unroll
        z-30
        shadow-2xl
        bg-gray-100
        rounded-xl
        overflow-auto
        h-min-[350px]
        origin-top
      "
      v-show="suggestStore.showSuggestions && suggestStore.suggestions.length > 0"
    >
      <div class="bg-stone-100 rounded-xl overflow-hidden border">
        <div class="grid">
          <div
            v-for="(item, index) in suggestStore.suggestions"
            :key="index"
            class="
              flex
              items-center
              bg-light-300
              py-2
              px-3
              hover:!bg-green-text hover:text-white
            "
            :class="{ '!bg-lime-100 text-black': index == suggestStore.selectedSuggestion }"
            @mousedown="
              searchStore.destination = item.name
              searchStore.destinationType = item.type
              clear();
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
import {useSuggestStore} from "@/stores/suggest"
const suggestStore = useSuggestStore()
onMounted(() => {
  findInput.value.focus();
  if (props.parent == "welcome") {
    wrapperClass.value = "top-[64%]";
  }
  if (props.parent == "header") {
    wrapperClass.value = "top-[120%]";
  }
});
const hoveredSuggestion = ref(0);

// clear
const clear = () => {
  suggestStore.showSuggestions = false;
  suggestStore.suggestions = [];
  suggestStore.selectedSuggestion = 0;
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
   suggestStore.selectedSuggestion < suggestions.value.length &&
    suggestStore.selectedSuggestion < suggestions.value.length - 1
  ) {
    suggestStore.selectedSuggestion++;

    return;
  }
  if (
    e.key === "ArrowDown" &&
    suggestStore.selectedSuggestion === suggestions.value.length - 1
  ) {
    suggestStore.selectedSuggestion = 0;

    return;
  }
  // up arrow:
  if (e.key === "ArrowUp") {
    if (suggestStore.selectedSuggestion >= 0) {
      suggestStore.selectedSuggestion--;
    }
    return;
  }
  // enter
  if (e.key === "Enter") {
    // if no selection:
    if (suggestStore.selectedSuggestion === -1) {

      return;
    }
    // if suggestion:
    searchStore.destination = suggestStore.suggestions[suggestStore.selectedSuggestion];
    clear();

    return;
  }

  // backspace
  if (e.key === "Backspace") {
    suggestStore.showSuggestions = false;
    suggestStore.suggestions = [];
    suggestStore.selectedSuggestion = -1;
    if (searchStore.destination == "") {
      return;
    }
  }

  getDestinationSuggestions(searchStore.destination);
};
  const { result: subdestinationResult, search: subdestinationSearch } = useSearch("subdestinations")
        const { result: destinationResult, search: destinationSearch } = useSearch("destinations")
const getDestinationSuggestions = async () =>{
  let subdestinationSuggestions = []
  let destinationSuggestions = []
            await subdestinationSearch({
                query: searchStore.destination,
                requestOptions: {
                hitsPerPage: 10,
                },
                })
                .then((result) => {
                    if (result === null || result === undefined) {
                    return;
                    }
                    suggestStore.showSuggestions = true;
                     subdestinationSuggestions = result.hits.map((item) => ({
                    name: item.subdestination,
                    type: "subdestination",
                    }));
                });
    
           await  destinationSearch({
                    query: searchStore.destination,
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
                    ...subdestinationSuggestions,
                    ];
                });
}
const mouseOver = (index) => {
  hoveredSuggestion.value = index + 1;
};

const mouseLeave = () => {
  hoveredSuggestion.value = null;
};

const emit = defineEmits(["setValue"]);
watch(
  () => searchStore.destination,
  (a, b) => {
    emit("setValue", "destination", searchStore.destination);
  }
);
</script>
