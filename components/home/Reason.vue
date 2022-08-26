<template>
  <div
    v-if="reason !== undefined"
    class="lg:grid lg:grid-cols-[1fr,2fr] gap-x-10"
  >
    <div
      class="hidden lg:block rounded-lala h-[350px] w-[350px]"
      :style="props.imageStyle"
    ></div>
    <!-- content pane: -->
    <div
      class="
        flex
        items-center
        justify-center
      "
    >
      <div class="max-w-[500px]">
        <div class="pt-4 md:pt-4">
          <div class="text-2xl md:text-5xl font-titillium font-semibold mb-10">
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