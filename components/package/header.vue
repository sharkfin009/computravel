<template>
<div    v-if="package_data"
class="">
  <div
 
    class="
      grid md:grid-cols-[auto,250px]
      bg-green-avo
      rounded-3xl
      p-2
      md:p-5
      shadow-xl
    "
  >
    <div class="grid md:grid-cols-[2fr,1fr]">
      <div
        class="
          w-full
          font-titillium font-semibold
          text-5xl
          flex
          items-center
          justify-center
          md:justify-start
          p-2
        "
      >
        <h3 class="text-center">
          {{ props.package_data.packages.data[0].attributes.title }}
        </h3>
      </div>
      <div
        class="
          flex
          items-center
          justify-end
          font-titillium font-semibold
          text-5xl
        "
      >
        <div class="flex text-3xl p-2 justify-center md:justify-start w-full">
          R{{ props.package_data.packages.data[0].attributes.price }}
          <div class="font-normal text-3xl flex items-end ml-2">pps</div>
        </div>
      </div>
      <div class="text-xl p-2">
        {{ props.package_data.packages.data[0].attributes.subdestination }},
        {{ props.package_data.packages.data[0].attributes.destination }}
      </div>
      <div class="flex justify-end text-xl p-2">
        Valid Until:
        {{ props.package_data.packages.data[0].attributes.valid_to }}
      </div>
    </div>

    <div class="flex items-center justify-center h-full ">
      <NuxtLink to="/my-packages">
        <BookButton class="md:px-10 md:py-5">Add to my packages</BookButton>
      </NuxtLink>
    </div>
  </div>
</div>
</template>

<script setup>
const props = defineProps({
  package_data: Object,
});
</script>