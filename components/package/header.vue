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
      shadow
    "
  >
    <div class="grid md:grid-cols-[2fr,1fr]">
      <div
        class="
          w-full
          font-titillium font-semibold
          text-2xl
          md:text-5xl
          flex
          items-center
          justify-center
          md:justify-start
          md:p-2
        "
      >
        <h3 class="text-center ">
          {{ props.package_data.packages.data[0].attributes.title }}
        </h3>
      </div>
      <div
        class="
          flex
          items-baseline
          justify-end
          font-titillium font-semibold
          text-5xl
        "
      >
        <div class="flex  md:p-2 justify-center md:justify-end w-full text-lg md:text-3xl">
          R{{ props.package_data.packages.data[0].attributes.price }}
          <div class="font-normal text-lg md:text-3xl flex items-end ml-2">pps</div>
        </div>
      </div>
      <div class=" md:p-2 text-center w-full md:text-start ">
        {{ props.package_data.packages.data[0].attributes.subdestination }},
        {{ props.package_data.packages.data[0].attributes.destination }}
      </div>
      <div class="flex justify-center md:justify-end  md:p-2">
        Valid Until:
        {{ props.package_data.packages.data[0].attributes.valid_to }}
      </div>
    </div>

    <div class="flex flex-col items-center justify-center h-full hover:text-lime-500 cursor-pointer">
      <NuxtLink to="/my-packages">
        
        <fa-icon class="text-2xl md:text-3xl" icon="fa-regular fa-heart"/>
      </NuxtLink>
        <p class="text-sm">add to my list</p>
    </div>
  </div>
</div>
</template>

<script setup>
const props = defineProps({
  package_data: Object,
});
</script>