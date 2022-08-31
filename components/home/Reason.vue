<template>
  <div
    v-if="reason !== undefined"
    class="h-[400px] lg:grid lg:grid-cols-2 gap-x-10"
  >
    <div class="flex justify-end items-align">
      <div
        class="hidden lg:block rounded-lala h-[400px] w-[400px]"
        :style="props.imageStyle"
      ></div>
    </div>
    <!-- content pane: -->
    <div class="flex items-center justify-center h-full">
      <div class="max-w-[500px]">
        <div class="pt-4 md:pt-4">
          <div class="text-2xl md:text-4xl font-titillium font-semibold mb-10">
            {{ props.reason.attributes.subtitle }}
          </div>

          <div class="" />
          <div class="text-base md:text-xl font-titillium pr-10">
            {{ props.reason.attributes.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reason: Object,
  imageStyle: Object,
});
onMounted(() => {});
</script>