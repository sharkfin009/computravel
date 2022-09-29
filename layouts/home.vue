<template>
  <div class="bg-slate-50 font-open-sans w-screen">
    <Header />
    <div
      v-if="
        suggestStore.showSuggestions &&
        suggestStore.destinationSuggestions.length
      "
      class="relative bg-none"
    >
      <SearchAutoSuggestOverlay />
    </div>
    <div class="px-5 md:px-10 md:px-14 bg-slate-50 pb-10 md:pb-14">
      <slot />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
</script>

