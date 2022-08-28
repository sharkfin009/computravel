<template>
  <div class="py-5 lg:py-10">
    <!-- normal -->
    <div v-if="!inverted">
      <div
        class="
          text-4xl
          md:text-5xl
          font-titillium font-regular
          md:font-semibold
          leading-none
          mb-5
          md:mb-10
        "
      >
        {{ heading }}
      </div>
      <h3 class="text-3xl md:text-4xl font-semibold md:font-medium mb-2">
        {{ subheading }}
      </h3>
    </div>
    <!-- inverted -->
    <div v-if="inverted">
      <h3 class="text-3xl md:text-4xl font-semibold md:font-medium mb-2">
        {{ subheading }}
      </h3>
      <div
        class="
          text-4xl
          md:text-5xl
          font-titillium font-regular
          md:font-semibold
          leading-none
          mb-5
          md:mb-5
        "
      >
        {{ heading }}
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  heading: {
    type: String,
  },
  subheading: {
    type: String,
  },
  inverted: {
    type: Boolean,
  },
});
</script>