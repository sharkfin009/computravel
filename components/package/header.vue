<template>
  <div v-if="package_data" class="">
    <div
      class="
        grid
        md:grid-cols-[auto,100px]
        bg-green-avo
        rounded-3xl
        p-2
        md:p-5
        shadow
        px-10
      "
    >
      <div class="grid grid-cols-2 md:grid-cols-[2fr,1fr]">
        <div
          class="
            col-span-full
            md:col-span-1
            w-full
            font-titillium font-semibold
            text-2xl
            md:text-5xl
            flex
            items-center
            justify-center
            md:justify-start md:p-2
          "
        >
          <h3 class="">
            {{ props.package_data.packages.data[0].attributes.title }}
          </h3>
        </div>
        <div
          class="
            order-3
            md:order-none
            flex
            items-baseline
            justify-end
            font-titillium font-semibold
            text-5xl
          "
        >
          <div
            class="
              flex
              md:p-2
              items-center
              justify-end
              w-full
              text-lg
              md:text-3xl
            "
          >
            R{{ props.package_data.packages.data[0].attributes.price }}
            <div
              class="
                font-normal
                text-lg
                md:text-3xl
                flex
                items-end
                ml-2
                order-1
              "
            >
              pps
            </div>
          </div>
        </div>
        <div
          class="
            order-2
            md:order-none
            p-0
            md:p-2
            text-center
            w-full
            flex
            items-center
          "
        >
          {{
            props.package_data.packages.data[0].attributes.subdestination
          }},<br />
          {{ props.package_data.packages.data[0].attributes.destination }}
        </div>
        <div
          class="
            col-span-full
            md:col-span-1
            flex
            justify-center
            md:justify-end md:p-2
          "
        >
          <div>
            <span class="text-xs">Book before: </span>
            <span class="font-medium">
              {{ props.package_data.packages.data[0].attributes.valid_to }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="
          flex
          md:flex-col
          items-center
          justify-center
          h-full
          hover:text-lime-500
          cursor-pointer
          gap-2
        "
      >
        <!-- mobile -->
        <div class="text-xs order-none md:order-2 block md:hidden">add to</div>
        <NuxtLink to="/my-packages">
          <fa-icon class="text-2xl md:text-3xl" icon="fa-regular fa-heart" />
        </NuxtLink>
        <div class="text-xs order-none block md:hidden md:order-3">
          favorites
        </div>

        <!-- md up -->
        <div class="text-xs text-center hidden md:block">
          add to
          <br />

          favorites
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  package_data: Object,
});
</script>