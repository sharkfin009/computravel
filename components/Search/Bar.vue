<template>
  <div
    class="
      w-full
      cursor-pointer
      px-5
      py-4
      bg-green-avo
      shadow
      hover:shadow-none
      rounded-full
      pointer-events-auto
    "
  >
    <div class="relative">
      <input
        autocomplete="off"
        id="findInput"
        name="search"
        type="text"
        v-model="suggestStore.queryString"
        class="
          h-full
          text-sm
          lg:text-base
          rounded-full
          input-outline
          px-12
          md:px-1
          py-2
          md:py-3
          lg:px-[40px]
          w-full
        "
        :class="{ 'shadow-lg': inputHasFocus }"
        @keyup="suggestStore.manageKeyUp"
        @focus="findInputFocus"
        placeholder="Where to?"
        @blur="
          suggestStore.showFindSuggestions = false;
          inputHasFocus = false;
        "
        ref="findInput"
      />
      <div
        class="
          pr-2
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
          @mousedown="suggestStore.clear()"
        />
      </div>
      <div class="absolute inset-0 flex items-center pl-3 pointer-events-none">
        <div
          class="
            pointer-events-auto
            bg-green-avo
            rounded-full
            p-1
            md:p-2
            flex
            justify-center
            item-center
            hover:bg-lime-500
          "
          @click="searchIconClick"
        >
          <i class="text-xs fas fa-search" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  parent: String,
});

import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
const route = useRoute();

const findInput = ref(null);
const wrapperClass = ref("");

const hoveredSuggestion = ref(0);

const inputHasFocus = ref(false);
const findInputFocus = () => {
  if (suggestStore.packageSuggestions.length > 0) {
    suggestStore.showSuggestions = true;
  }
  inputHasFocus.value = true;
  suggestStore.queryString = "";
};
const searchIconClick = () => {
  if (suggestStore.searchSuggestions.length) {
    suggestStore.searchDestination(suggestStore.searchSuggestions[0]);
  } else {
    suggestStore.clear();
    if (route.path != "/search") {
      navigateTo({
        path: "/search",
      });
    }
  }
};
</script>
<style scoped>
</style>