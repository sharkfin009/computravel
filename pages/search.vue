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
        class="w-full h-[500px] flex justify-center items-center"
        v-if="!searchStore.loadingState && !noResults"
      >
        <div class="flex flex-col gap-10 items-center text-center">
          <IconSad class="w-[30px]" />
          Sorry we have no results for that search. <br />
          Take a look at these random adventures:
        </div>
      </div>
    </div>
    <div v-if="resultsReady" class="overflow-y-auto hide-scroll w-full pb-10">
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
  if (searchStore.results.length == 0) searchStore.fireDefaultQuery();
});

if (searchStore.results.length > 0) {
  resultsReady.value = true;
  noResults.value = false
}
const noResults = ref(false);
watch(
  () => searchStore.results,
  () => {
    resultsReady.value = true;
    if (searchStore.results.length == 0) {
      noResults.value = true;
      searchStore.fireDefaultQuery();
    }
  }
);
</script>