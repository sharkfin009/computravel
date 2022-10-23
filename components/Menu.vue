<template>
  <div class="fixed inset-0 flex justify-end z-50 pointer-events-none">
    <div class="backdrop-blur h-full">
      <div
        class="
          h-full
          w-[100vw]
          md:w-[50vw]
          lg:w-[24vw]
          flex flex-col
          gap-5
          justify-start
          items-start
          pl-20
          pt-40
          font-titillium
          bg-white
          opacity-100
          md:opacity-80
          relative
          pointer-events-auto
          text-lg
          md:text-lg
          backdrop-blur-lg
        "
      >
        <ul class="list-none">
          <li
            v-for="(item, index) of items"
            :key="index"
            class="mb-5 hover:text-lime-500"
          >
            <NuxtLink @click="globalStore.showMenu = false" :to="item.url">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
        <div
          class="
            absolute
            inset-0
            flex
            justify-end
            items-start
            pt-3
            px-5
            lg:pt-3 lg:px-5
            pointer-events-none
          "
        >
          <div
            @click="globalStore.showMenu = false"
            class="
              flex
              justify-center
              items-center
              bg-green-avo
              rounded-full
              bg-opacity-80
              shadow
              flex
              w-[45px]
              h-[45px]
              md:w-[69px] md:h-[69px]
              cursor-pointer
              pointer-events-auto
              hover:bg-lime-100
              transition
              duration-300
            "
          >
            <i class="text-stone-600 text-xl md:text-2xl fa-solid fa-close"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let items = [
  {
    name: "Travel Tips",
    url: "/travel-tips",
  },
  {
    name: "Frequently Asked Questions (FAQs)",
    url: "/FAQs",
  },
  {
    name: "COVID-19",
    url: "/covid-19",
  },
  {
    name: "Groups and Incentives",
    url: "/groups-and-incentives",
  },
  {
    name: "Book a Flight",
    url: "/flight-bookings",
  },
  {
    name: "Flight Specials",
    url: "/flight-specials",
  },
  {
    name: "Find A Car",
    url: "/car-bookings",
  },
  {
    name: "Travel Insurance",
    url: "https://www.tic.co.za/systematic/travelinsuranceshop.html?ref=89",
  },
  {
    name: "Blog",
    url: "/blog-archive",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();
</script>