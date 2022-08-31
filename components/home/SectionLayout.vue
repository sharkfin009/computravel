<template>
  <div
    class="text-black pt-20 pb-10 md:pt-40 md:pb-10 px-10 md:px-14"
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