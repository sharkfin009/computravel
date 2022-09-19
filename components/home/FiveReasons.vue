<template>
  <HomeSectionLayout bgColor="bg-green-avo">
    <div
      class="bg-green-avo flex flex-col text-2xl justify-evenly md:mx-0 pb-5"
      v-if="reasons.length > 0"
    >
      <SectionHeading
        heading="travel with us"
        subheading="five reasons to"
        :inverted="true"
      />

      <TabMenu
        v-if="titles.length > 0"
        @selectTab="setActiveTab"
        :titles="titles"
        class="mb-5"
      ></TabMenu>

      <div class="relative h-[280px] md:h-[400px] overflow-hidden">
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
  </HomeSectionLayout>
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