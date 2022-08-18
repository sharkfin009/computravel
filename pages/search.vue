<template>
  <div class="bg-gray-100 px-10 w-screen pt-[129px] md:pt-[95px] lg:pt-[120px]">
    <div>
      <SearchOptions class="" />
      <div
        class="w-full h-[500px] flex justify-center items-center"
        v-if="searchStore.loadingState"
      >
        <IconTick
          class="
            animate__animated animate__zoomIn animate__infinite animate__slow
          "
          style="color: #8fc15a"
        />
      </div>
      <div
        class="w-full pt-8"
        v-if="
          !searchStore.loadingState &&
          searchStore.results.length == 0 &&
          !searchStore.firstLoad
        "
      >
        <div class="flex flex-col gap-5 items-center text-center">
          <IconSad class="w-[30px]" />
          Sorry we have no results for that search. <br />
          Take a look at these adventures:
        </div>
      </div>
    </div>
    <div
      v-if="resultsReady && searchStore.results.length > 0"
      class="overflow-y-auto hide-scroll w-full pb-10"
    >
      <div class="flex flex-wrap gap-6 justify-center py-10 w-full rounded">
        <div
          class="shadow-2xl hover:shadow-none"
          v-for="(card, index) in searchStore.results"
          :key="index"
        >
          <Card :package="card.attributes" />
        </div>
      </div>
    </div>
    <div
      v-if="resultsReady && searchStore.fallbackResults.length > 0"
      class="overflow-y-auto hide-scroll w-full pb-10"
    >
      <div class="flex flex-wrap gap-6 justify-center py-10 w-full rounded">
        <div
          class="shadow-2xl hover:shadow-none"
          v-for="(card, index) in searchStore.fallbackResults"
          :key="index"
        >
          <Card :package="card.attributes" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});

import { useStore } from "@/stores/search";
const resultsReady = ref(false);
const searchStore = useStore();
onMounted(() => {
  searchStore.fireDefaultQuery();
  searchStore.firstLoad = true
});

if (searchStore.results.length > 0) {
  resultsReady.value = true;
}
watch(
  () => searchStore.results,
  () => {
    searchStore.firstLoad = false;
    if (searchStore.results.length == 0) {
      searchStore.fireDefaultQuery();
    }
    if (searchStore.results.length > 0) {
      resultsReady.value = true;
    }

    resultsReady.value = true;
  }
);
watch(
  () => searchStore.fallbackResults,
  () => {
    resultsReady.value = true;
  }
);
</script>