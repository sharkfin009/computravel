<template>
  <div class="w-full h-full flex flex-col justify-between mb-5">
    <label class="md:text-lg mb-5 md:pb-0">Destination</label>
    <div class="relative">
      <input
        autocomplete="off"
        name="search"
        type="text"
        v-model="destinationStore.queryString"
        class="
          w-full
          rounded-xl
          bg-white
          p-4
          relative
          input-outline
          hover:shadow-none
          pointer-events-auto
        "
        @keyup="destinationStore.manageKeyUp"
        @focus="
          destinationStore.showSuggestions = true;
          destinationStore.queryString = '';
        "
        @blur="
          destinationStore.showDestinationDropdown = false;
          destinationStore.showSuggestions = false;
        "
        placeholder="anywhere"
      />
      <div
        class="
          absolute
          inset-0
          flex
          items-center
          justify-end
          pr-2
          pointer-events-none
        "
      >
        <IconClose
          class="
            w-6
            transition
            hover:rotate-180
            cursor-pointer
            pointer-events-auto
          "
          @mousedown="
            destinationStore.clear();
            searchStore.destinationQuery = '';
            searchStore.fireQuery();
          "
        />
      </div>
      <!-- autosuggest list-->

      <div
        class="
          absolute
          top-[115%]
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
          destinationStore.showSuggestions &&
          destinationStore.destinationSuggestions.length &&
          destinationStore.queryString.length
        "
      >
        <div class="bg-stone-100 rounded-xl overflow-hidden border">
          <div class="grid">
            <div
              v-for="(item, index) in destinationStore.destinationSuggestions"
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
                  index == destinationStore.selectedSuggestion,
              }"
              @mousedown="clickMethod(item)"
            >
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

const findInput = ref(null);
const wrapperClass = ref("");
import { useStore } from "@/stores/search";
const searchStore = useStore();
import { useDestination } from "@/stores/destinationInput";
import { useSearchDestination } from "@/stores/searchDestinationInput";
const destinationStore =
  props.parent == "search" ? useSearchDestination() : useDestination();
const hoveredSuggestion = ref(0);

const { result: regionResult, search: regionSearch } = useSearch("regions");
const { result: destinationResult, search: destinationSearch } =
  useSearch("destinations");

const mouseOver = (index) => {
  hoveredSuggestion.value = index + 1;
};

const mouseLeave = () => {
  hoveredSuggestion.value = null;
};
const clickMethod = (item) => {
  // if this is not the destination input on the search page:
  if (props.parent !== "enquiryForm") {
    searchStore.destination = item.name;
    searchStore.destinationType = item.type;
    searchStore.destinationQuery = item.name;
    destinationStore.searchDestination(item);
  } else {
    destinationStore.queryString = item.name;
    destinationStore.showSuggestions = false;
  }
};
const emit = defineEmits(["setValue"]);
watch(
  () => destinationStore.queryString,
  (a, b) => {
    emit("setValue", "destination", destinationStore.queryString);
  }
);
</script>
