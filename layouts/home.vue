<template>
  <div class="bg-slate-50 font-open-sans w-screen">
    <Header />
    <div
      v-if="
        suggestStore.showSuggestions &&
        suggestStore.destinationSuggestions.length
      "
      class="relative bg-none mx-5"
    >
      <SearchAutoSuggestOverlay />
    </div>
    <div class="px-5 md:px-10 md:px-14 bg-slate-50 pb-10 md:pb-14">
      <div :class="{ 'opacity-0!': suggestStore.showSuggestions }">
        <slot />
        <Footer />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
</script>

