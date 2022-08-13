<template>
  <div
    class="
      bg-gray-100
      px-10
      h-screen
      w-screen
      grid grid-rows-[130px,auto,auto]
    "
  >
    <div></div>
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
        v-if="!searchStore.loadingState && searchStore.results.length == 0"
      > 
    <div class="flex flex-col gap-10 items-center text-center">
      <IconSad class="w-[30px]"/>
      Sorry we have no results! <br>Please try changing the search filter settings...</div>
      </div>
    </div>
    <div v-if="resultsReady" class="  overflow-y-auto hide-scroll w-full pb-10">
        <div
          
          class="
            flex flex-wrap
            gap-6
            justify-center
            py-10
            w-full
            
            rounded
          "
        >
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
}

watch(
  () => searchStore.results,
  () => {
    resultsReady.value = true;
  }
);
</script>