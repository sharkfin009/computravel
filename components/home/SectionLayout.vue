<template>
  <div
    class="text-black px-8 pt-20 pb-10 md:pt-32 md:pb-20 md:px-10 md:px-14"
    :class="bgColor"
  >
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  bgColor: {
    type: String,
  },
});
</script>