<template>
  <div
    class="bg-green-avo text-black flex flex-col justify-between w-screen"
    v-if="favourites"
  >
    <!-- top row -->
    <div class="flex flex-col justify-end px-10 md:px-[80px] pt-20 md:pt-40 md:pb-20">
      <h3 class="text-4xl font-medium mb-2">our favourite</h3>
      <h2 class="text-5xl font-titillium font-semibold">holiday packages</h2>
    </div>
    <!-- desktop cards: -->
    <div class="hidden md:grid w-full grid-cols-[80px,auto,80px]">
      <div class="flex items-center justify-center">
        <IconChevronLeft
          class="cursor-pointer hover:scale-110"
          @click="scrollLeft"
        />
      </div>

      <div class="overflow-x-auto lg:snap-x lg:snap-mandatory" ref="cardRow">
        <div ref="" class="flex gap-8 pb-8">
          <div
            v-for="(fave, index) in favourites.favourites.data.map(
              (item) => item.attributes.package.data.attributes
            )"
            :key="index"
            class=" snap-center "
          >
            <Card class="" :package="fave" />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <IconChevronRight class="cursor-pointer hover:scale-110" @click="scrollRight" />
      </div>
    </div>

    <!-- mobile cards: -->
    <div class="flex justify-center md:hidden relative w-full  pt-10">
      <div class="relative w-[320px] h-[400px]">
        <card
          v-for="(fave, index) in favourites.favourites.data.map(
            (item) => item.attributes.package.data.attributes
          )"
          :key="index"
          :package="fave"
          class="absolute inset-0 transition-opacity opacity-0 duration-700"
          :class="{ '!opacity-100': index == browsePointer }"
        ></card>
      </div>
    </div>

    <div class="flex justify-center items-center h-full py-5">
      <BlackButton class="hidden lg:flex mx-10 md:mx-20 shadow-2xl mb-5">
        view more holidays
      </BlackButton>
      <div class="flex lg:hidden w-full justify-evenly">
        <IconChevronLeft class="cursor-pointer " @click="browseLeft" />
        <IconChevronRight class="cursor-pointer" @click="browseRight" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGraph } from "../../composables/useGraph";

const { data: favourites, error } = useGraph(`
  query {
          favourites {
            data {
              attributes {
                package {
                  data {
                    attributes {
                      title
                      subdestination
                      starts
                      destination
                      price
                      includes
                      excludes
                      duration
                      from
                      to
                      star_rating
                      description
                      terms
                      supplier_ref
                      supplier
                     image_url_md 
                      valid_to
                    }
                  }
                }
              }
            }
          }
        }`);
const faves = ref([]);
watch(
  () => favourites.value,
  () => {
    console.log(favourites.value);
  }
);
const cardRow = ref(null);

cardRow.scrollBehavior = "smooth";
var scrollAmount = 0;

const scrollRight = () => {
  cardRow.value.scrollTo({
    top: 0,
    left: Math.max((scrollAmount += 500), 1000),
    behavior: "smooth",
  });
};

const scrollLeft = () => {
  cardRow.value.scrollTo({
    top: 0,
    left: Math.max((scrollAmount -= 500), 0),
    behavior: "smooth",
  });
};
const browsePointer = ref(0);
const browseLeft = () => {
  if (browsePointer.value > 0) {
    browsePointer.value--;
  } else browsePointer.value = favourites.value.favourites.data.length -1;
};
const browseRight = () => {
  if (browsePointer.value < favourites.value.favourites.data.length - 1) {
    browsePointer.value++;
  } else browsePointer.value = 0


};
</script>