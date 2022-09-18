<template>
  <div class="bg-slate-50 font-open-sans w-screen">
    <Header />
    <div
      v-if="suggestStore.showSuggestions"
      class="relative h-[5000px] bg-slate-50 mx-5"
    >
      <SearchAutoSuggestOverlay />
    </div>
    <div class="px-5 md:px-10 md:px-14 bg-slate-50 pb-10 md:pb-14">
      <slot v-if="!suggestStore.showSuggestions" />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
</script>

