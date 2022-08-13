<template>
  <div
    class="
      bg-gray-200
      flex flex-col
      text-2xl
      p-10
      lg:p-20
      lg:pb-40
      lg:h-screen
      justify-evenly
    "
    v-if="reasons.length > 0"
  >
    <h3 class="text-3xl font-medium mb-2">five reasons to</h3>

    <!-- XL header section -->
    <div class="hidden xl:grid grid-cols-[1fr,5fr]  mb-10">
      <div class="text-5xl font-titillium font-semibold leading-none">
        travel with us
      </div>
      <div />
      <div />
      <div class="flex-1">
        <TabMenu
          v-if="titles.length > 0"
          @selectTab="setActiveTab"
          :titles="titles"
        ></TabMenu>
      </div>
    </div>
    <!-- MD down header section -->
    <div class="grid xl:hidden text-5xl font-titillium font-semibold leading-non mb-10">
      travel with us
    </div>
    <div class="grid xl:hidden mb-10">
      <div class="flex-1">
        <TabMenu
          v-if="titles.length > 0"
          @selectTab="setActiveTab"
          :titles="titles"
        ></TabMenu>
      </div>
    </div>

    <div class="relative h-[450px] overflow-hidden">
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