<template>
  <div
    class="w-full lg:grid lg:grid-rows-none lg:grid-cols-[auto,320px]"
    v-if="props.region.length > 0"
  >
    <slot />

    <div class="flex flex-col">
      <div class="flex justify-center">
        <div class="relative mb-7 w-[320px] h-[400px]">
          <card
            v-for="(pack, index) in region"
            :key="index"
            :package="pack.attributes"
            class="absolute inset-0 transition-opacity duration-1000 opacity-0"
            :class="{
              '!opacity-100': index == selectedCard,
              '!pointer-events-none': index !== selectedCard,
            }"
          >
          </card>
        </div>
      </div>
      <div class="flex justify-center gap-5 w-full z-40">
        <div v-for="(dot, index) in dots" class="cursor-pointer" :key="index">
          <IconActiveDot
            @click="manageClick(index)"
            v-show="index === selectedCard"
          />
          <IconDotInactive
            @click="manageClick(index)"
            v-show="index !== selectedCard"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>

<script setup>
const props = defineProps({
  region: Array,
});
const dots = [1, 2, 3];
const selectedCard = ref(0);

const manageClick = (index) => {
  selectedCard.value = index;
  console.log(selectedCard.value);
};
setInterval(() => {
  if (selectedCard.value < 2) {
    selectedCard.value++;
  } else {
    selectedCard.value = 0;
  }
}, 5000);
</script>