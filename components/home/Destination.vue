<template>
  <div
    class="
      w-full
  
      lg:grid
      grid-rows-[250px,auto]
      lg:grid-rows-none
      grid-cols-none
     lg:grid-cols-[auto,335px]
      py-10
    "
    v-if="props.destination.length > 0"
  >
    <slot />
    <div class=" flex flex-col mt-8 lg:mt-0 ">
      <div class=" flex justify-center">
        <div class="relative mb-7 w-[335px] h-[500px]">
          <card
            v-for="(tour, index) in props.destination"
            :key="index"
            :title="tour.attributes.title"
            :package="tour.attributes"
            class="absolute inset-0 transition-opacity duration-700"
            :class="{ 'opacity-0': index !== selectedCard }"
          ></card>
        </div>
      </div>
      <div class="flex justify-center gap-5 w-full">
        <div
          v-for="(dot, index) in dots"
          class="cursor-pointer "
          :key="index"
        >
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
  destination: Array,
});
const dots = [1, 1, 1];
const selectedCard = ref(0);

const manageClick = (index) => {
  selectedCard.value = index;
  console.log(selectedCard.value);
};
</script>