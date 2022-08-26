<template>
  <div
    class="
      bg-green-avo
      flex flex-col
      text-2xl
      p-10
      justify-evenly
      md:px-[80px] pt-20 md:pt-40 md:pb-20
    "
    v-if="reasons.length > 0"
  >
    <h3 class="text-4xl font-medium mb-2">five reasons to</h3>
    <div class="text-5xl font-titillium font-semibold leading-none mb-5 md:mb-10">
      travel with us
    </div>
    <!-- XL header section -->

    <TabMenu
      v-if="titles.length > 0"
      @selectTab="setActiveTab"
      :titles="titles"
      class="mb-5 md:mb-10"
    ></TabMenu>


    <div class="relative h-[350px] overflow-hidden">
      <HomeReason
        v-for="(reason, index) in reasons"
        :key="index"
        :reason="reason"
        :imageStyle="imageStyles[index]"
        class="absolute inset-0 transition ease-in duration-700"
        :class="{ 'opacity-0 translate-x-[80vw]': index !== activeTab }"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores/reasons";
const reasonsPinia = useStore();
const reasons = ref([]);
const imageStyles = ref([]);
const activeTab = ref(2);
const titles = ref([]);
const setActiveTab = (index) => {
  activeTab.value = index;
};

reasonsPinia.getReasons();
reasonsPinia.$subscribe((mutations, state) => {
  if (state.reasons.length > 0) {
    reasons.value = state.reasons;
    imageStyles.value = reasons.value.map((item) => ({
      backgroundImage: `url(${item.attributes.image_path})`,
      backgroundSize: "cover",
    }));
    titles.value = reasons.value.map((item) => item.attributes.title);
  }
});
</script>