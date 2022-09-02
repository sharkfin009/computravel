<template>
  <div
    ref="parent"
    class="w-full flex justify-evenly text-center font-semibold relative"
  >
    <div
      ref="marker"
      class="
        absolute
        inset-0
        bg-black
        h-[7px]
        rounded-bl-lg rounded-br-lg
        transition
        ease-out
        duration-700
      "
      :class="{ 'bg-green-logo': marker_highlighted }"
    />
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="
        w-full
        line-top
        cursor-pointer
        hover:text-green-logo hover:border-green-logo
        transition-colors
        duration-700
        py-3
        md:px-5
        text-sm
        md:text-xl
      "
      @click="manageClick(index)"
      v-on:mouseover="titleHover(index)"
      v-on:mouseleave="titleLeave(index)"
    >
      {{ item }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  titles: Array,
});
const marker = ref(null);
const emit = defineEmits(["selectTab"]);
const marker_highlighted = ref(false);
const activeTab = ref(0);
const parent = ref(null);

onMounted(() => {
  marker.value.style.width = `${100 / props.titles.length}%`;
});

const titleHover = (title_ref) => {
  if (title_ref === activeTab.value) {
    marker_highlighted.value = true;
  }
};
const titleLeave = (title_ref) => {
  if (title_ref === activeTab.value) {
    marker_highlighted.value = false;
  }
};
const manageClick = (index) => {
  activeTab.value = index;
  emit("selectTab", index);
  moveMarker(index);
};
const moveMarker = (index) => {
  marker_highlighted.value = true;
  const parentWidth = parent.value.offsetWidth;
  let tabWidth = parentWidth / props.titles.length;
  let translate = tabWidth * index;
  marker.value.style.transform = `translate(${translate}px,0)`;
};
</script>