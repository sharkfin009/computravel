<template>
  <div v-if="package_data" class="">
    <div
      class="
        grid
        md:grid-cols-[auto,100px]
        bg-green-avo
        rounded-3xl
        md:p-5
        shadow
        p-5
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
            md:text-4xl
            flex
            items-center
            justify-center
            md:justify-start md:p-2
          "
        >
          <h3 class="mb-5 text-center md:text-start">
            {{ package_data.title }}
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
            R{{ package_data.price }}
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
        <div class="order-2 md:order-none p-0 md:p-2 w-full">
          {{ package_data.destination }},
          {{ package_data.region }}
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
              {{ props.package_data.valid_to }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="
          relative
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
        <TooltipUnder v-if="firstVisit && /packages/.test($route.path)">
          Interested in this Package? Add it to your favourites
        </TooltipUnder>
        <div v-if="!packageStore.alreadyAdded" class="">
          <!-- mobile -->
          <NuxtLink to="/my-packages" class="flex flex-col items-center">
            <div class="text-xs order-none md:order-2 block md:hidden">
              add to
            </div>
            <IconHeart class="w-8" />
            <div class="text-xs order-none block md:hidden md:order-3">
              favourites
            </div>

            <!-- md up -->
            <div class="text-xs text-center hidden md:block">
              add to
              <br />

              favorites
            </div>
          </NuxtLink>
        </div>
        <div
          v-if="packageStore.alreadyAdded"
          class="flex flex-col items-center"
        >
          <!-- mobile -->
          <div class="text-xs order-none md:order-2 block md:hidden">
            added to
          </div>
          <IconHeart class="w-8 text-lime-500" />

          <NuxtLink to="/my-packages">
            <div
              class="
                text-xs
                order-none
                block
                md:hidden md:order-3
                hover:scale-150
                transition
                duration-200
                font-semibold
              "
            >
              favorites
            </div>
          </NuxtLink>

          <!-- md up -->
          <div class="text-lime-500 text-xs text-center hidden md:block">
            added to
            <br />

            <NuxtLink to="/my-packages">
              <div
                class="
                  text-xs
                  order-none
                  block
                  hover:scale-150
                  transition
                  duration-200
                  font-semibold
                "
              >
                favorites
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const hasPackages = () => {
  // alert(localStorage.getItem("my-packages"));
  return localStorage.getItem("my-packages");
};
const props = defineProps({
  package_data: Object,
});
import { useStore } from "@/stores/package";
let packageStore = useStore();
const firstVisit = ref(true);
onMounted(() => {
  firstVisit.value = localStorage.getItem("visitCount") == "1";
});
</script>