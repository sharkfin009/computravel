<template>
  <div
    class="
      w-full
      lg:grid lg:grid-rows-none lg:grid-cols-[auto,320px]
      pt-5
      gap-10
    "
  >
    <div class="hidden lg:block relative object-cover">
      <div
        class="
          absolute
          inset-0
          bg-blue-100
          overflow-hidden
          rounded-3xl
          shadow-2xl
        "
      >
        <nuxt-img
          :alt="destinationImage.alt"
          class="w-full h-full object-cover"
          :src="destinationImage.url"
          :class="{ '!opacity-0 ': index !== activeTab }"
          width="1200px"
          height="600px"
          sizes="lg:90vw"
          format="webp"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex justify-center">
        <div class="relative mb-7 w-[320px] h-[400px]">
          <card
            v-for="(pack, index) in destinationPackages"
            :key="pack"
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
        <div v-for="(dot, index) in dots" class="cursor-pointer" :key="dot">
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
  destinationPackages: Array,
  destinationImage: String,
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