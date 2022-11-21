wle<template>
  <div class="lg:grid lg:grid-cols-2 gap-x-10">
    <div class="flex justify-end items-center">
      <nuxt-img
        class="
          hidden
          lg:block
          rounded-lala
          h-[400px]
          w-[400px]
          overflow-hidden
          bg-blue-100
        "
        width="400"
        height="400"
        fit="cover"
        quality="70"
        :src="reason.image_url"
        format="webp"
        loading="lazy"
      />
    </div>
    <!-- content pane: -->
    <div class="flex items-center justify-center h-full">
      <div class="max-w-[500px]">
        <div class="pt-4 md:pt-4">
          <div class="text-2xl md:text-4xl font-titillium font-semibold mb-10">
            {{ reason.subtitle }}
          </div>

          <div class="" />
          <div class="text-base md:text-xl font-titillium pr-10">
            {{ reason.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reason: Object,
});
</script>