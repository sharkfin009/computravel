<template>
  <div class="relative h-full w-full bg-slate-300">
    <HomeWelcome />
    <div :class="{ 'opacity-0': suggestStore.showSuggestions }">
      <HomeFavouritePackages />
      <HomeDestinations />
      <FlSpecials />
      <HomeTestimonials />
      <HomeFiveReasons />
      <Footer />
    </div>
    <div class="absolute inset-0 pointer-events-none">
      <Header class="pointer-events-auto" />
    </div>
  </div>
</template>
<script setup>
import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
</script>