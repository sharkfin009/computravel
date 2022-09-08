<template>
  <div class="w-full h-full">
    <div
      class="
        absolute
        inset-0
        bg-black
        opacity-0
        transition
        duration-300
        pointer-events-none
      "
      :class="{
        'opacity-40': suggestions.length > 0 && showFindSuggestions,
      }"
    />

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
        <div class="hidden md:block w-full">
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
              class="block lg:grid lg:grid-cols-[auto,200px] rounded-full"
              :class="{
                '!bg-lime-500 !bg-opacity-80 !text-white':
                  index === hoveredSuggestion - 1,
              }"
              v-on:mouseover="mouseOver(index)"
              @mouseleave="mouseLeave"
              @mousedown="viewPackage(suggestion.slug, suggestion.supplier_ref)"
            >
              <div class="">
                <div
                  class="
                    pl-20
                    py-5
                    w-full
                    rounded-l-full
                    cursor-pointer
                    transition-colors
                  "
                >
                  <div
                    class="hidden lg:block font-semibold mb-3 text-lime-700"
                    :class="{
                      ' !text-lime-200': index === hoveredSuggestion - 1,
                      ' text-lime-200': index === selectedSuggestion,
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
                  justify-end
                  font-medium
                  pr-20
                "
                :class="{
                  ' !text-lime-200': index === hoveredSuggestion - 1,
                  '  !text-lime-200': index === selectedSuggestion,
                }"
              >
                {{ suggestion.destination }}
              </div>
            </div>
          </div>
        </div>

        <div class="hidden lg:block p-2">
          <div class="mb-2">related searches:</div>
          <div class="grid ld:grid-cols-2 gap-2">
            <div
              v-for="(item, index) in suggestStore.suggestions"
              :key="index"
              class="
                flex
                items-center
                bg-slate-50
                rounded-full
                p-1
                hover:bg-lime-500 hover:text-lime-200
              "
              @mousedown="searchDestination(item.name)"
            >
              <IconSearch class="h-4" />
              <div class="">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <!-- mobile: -->
        <div class="block lg:hidden p-2 h-[250px] overflow-auto">
          <div class="mb-2">related searches:</div>
          <div class="grid gap-2">
            <div
              v-for="(item, index) in suggestStore.suggestions"
              :key="index"
              class="
                flex
                items-center
                bg-slate-50
                rounded-full
                p-1
                hover:bg-lime-500 hover:text-lime-200
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

import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useFindSuggestStore } from "~~/stores/findSuggest";
const suggestStore = useFindSuggestStore();

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