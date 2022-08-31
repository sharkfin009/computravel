<template>
  <div class="py-5">
    <!-- normal -->
    <div v-if="inverted == false">
      <h2
        class="
          text-4xl
          md:text-5xl
          font-titillium font-medium
          md:font-semibold
          leading-none
          mb-5
          md:mb-10
        "
      >
        {{ heading }}
      </h2>
      <h3 class="text-3xl md:text-4xl font-extralight md:font-light mb-2">
        {{ subheading }}
      </h3>
    </div>

    <!-- inverted -->
    <div v-if="inverted == true">
      <h3 class="text-3xl md:text-4xl font-extralight md:font-light mb-2">
        {{ subheading }}
      </h3>
      <h2
        class="
          text-4xl
          md:text-5xl
          font-titillium font-medium
          md:font-semibold
          leading-none
          mb-5
          md:mb-5
        "
      >
        {{ heading }}
      </h2>
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