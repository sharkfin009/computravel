<template>
  <div class="fixed h-screen inset-0 flex justify-end z-50 pointer-events-none">
    <div
      class="
        w-full
        h-full
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
        md:opacity-90
        relative
        pointer-events-auto
      "
    >
      <ul class="list-none">
        <li v-for="(item, index) of items" :key="index" class="mb-5">
          <NuxtLink @click="hideMenu" :to="item.url">
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
          @click="hideMenu"
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
          <fa class="text-stone-600 text-xl md:text-4xl" icon="fas fa-close" />
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
    name: "Accomodation",
    url: "/accomodation",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];
const emit = defineEmits(["hideMenu"]);
const hideMenu = () => {
  emit("hideMenu");
};
</script>