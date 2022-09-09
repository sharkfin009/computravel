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
    "
  >
    <div class="relative">
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
          @mousedown="clear()"
        />
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
    </div>
    <!-- autosuggest list-->
  </div>
</template>
<script setup>
const props = defineProps({
  parent: String,
});
onMounted(() => {
  findInput.value.focus();
  if (props.parent == "welcome") {
    wrapperClass.value = "top-[64%]";
  }
  if (props.parent == "header") {
    wrapperClass.value = "top-[120%]";
  }
});
import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
const route = useRoute();

const findInput = ref(null);
const wrapperClass = ref("");

const hoveredSuggestion = ref(0);
const clear = () => {
  searchStore.destinationQuery = "";
  searchStore.findQuery = "";
  suggestStore.showSuggestions = false;
  suggestStore.packageSuggestions = [];
  suggestStore.destinationSuggestions = [];
  suggestStore.selectedSuggestion = -1;
};

const inputHasFocus = ref(false);
const findInputFocus = () => {
  if (suggestStore.packageSuggestions.length > 0) {
    suggestStore.showSuggestions.value = true;
  }
  inputHasFocus.value = true;
};
</script>
<style scoped>
</style>