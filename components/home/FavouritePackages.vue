<template>
  <div
    class="bg-gray-300 text-black flex flex-col justify-between w-screen"
    v-if="favourites"
  >
    <div
      class="
        hidden
        lg:grid
        w-full
        grid-cols-[30px,auto,30px] grid-rows-[200px,auto]
        lg:grid-cols-[100px,auto,100px] lg:grid-rows-[150px,auto]
      "
    >
      <!-- top row -->
      <div></div>
      <div class="flex flex-col justify-end">
        <h3 class="text-3xl font-medium mb-2">our favourite</h3>
        <h2 class="text-5xl font-titillium font-semibold mb-10">
          holiday packages
        </h2>
      </div>
      <div></div>

     <!-- desktop cards: -->
      <div class="hidden md:flex items-center justify-center">
        <IconChevronLeft
          class="cursor-pointer scroll-smooth"
          @click="scrollLeft"
        />
      </div>

      <div
        class=" overflow-x-auto lg:snap-x lg:snap-mandatory"
        ref="cardRow"
      >
        <div ref="" class="flex">
          <div
            v-for="(fave, index) in favourites.favourites.data.map(
              (item) => item.attributes.package.data.attributes
            )"
            :key="index"
            class="mx-8 mb-5 snap-center w-[82vw]"
          >
            <Card class="" :package="fave" />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <IconChevronRight class="cursor-pointer" @click="scrollRight" />
      </div>
    </div>
    <!-- mobile cards: -->
    <div class="block md:hidden relative mb-7 w-[335px]">
      <card
        v-for="(tour, index) in favourites.favourites.data.map(
              (item) => item.attributes.package.data.attributes)"
        :key="index"
        :title="tour.attributes.title"
        :package="tour.attributes"
        class="absolute inset-0 transition-opacity duration-700"
        :class="{ 'opacity-0': index !== selectedCard }"
      ></card>
    </div>
    <div class="flex justify-center items-center h-full">
      <BlackButton class="mx-10 md:mx-20 shadow-2xl mb-5">
        view more holidays
      </BlackButton>
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
</script>