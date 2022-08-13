<template>
  <div
    v-if="reason !== undefined"
    class="lg:grid lg:grid-cols-[1fr,2fr] gap-x-10"
  >
    <div
      class="hidden lg:block rounded-xl h-[450px] w-[450px]"
      :style="props.imageStyle"
    ></div>
    <!-- content pane: -->
    <div class="h-[400px] sm:h-[300px] md:h-[400px] lg:h-none relative flex items-none md:items-center  rounded-xl">
      <div class="hidde md:block absolute h-full ">
        <div class="relative w-full h-full flex items-start md:items-center lg:items-start xl:items-center ">
          <div
            class="
              inset-0
              w-[200px]
              h-[200px]
              md:w-[300px]
              md:h-[300px]
              bg-lime-300
              opacity-50
              rounded-3xl
            "
          ></div>
        </div>
      </div>
      <div class="relative w-full">
        <div
          class="pt-4 md:pt-4 grid grid-cols-[1fr,5fr] grid-rows-[min-content,auto] "
        >
          <div
            class="
              text-2xl
              md:text-5xl
              font-titillium font-semibold
              text-center
            "
          >
            {{ props.reason.id }}.
          </div>
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