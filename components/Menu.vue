<template>
  <div class="absolute h-screen inset-0  flex justify-end z-50">
    <ul class="w-full md:w-[30vw] h-full flex flex-col gap-5 justify-center items-center font-titillium bg-green-avo opacity-90">
        <li v-for = "(item, index) of items" :key="index">
            <NuxtLink @click="hideMenu" :to="item.url">
                {{item.name}}
            </NuxtLink>
        </li>
    </ul>
    <CloseRow @click = "hideMenu" />
  </div>
</template>
<script setup>
let items= [
  {
    name:"COVID-19",
    url: "/covid-19",
  },
  {
    name:"Groups and Incentives",
    url: "/groups-and-incentives",
  },
  {
    name:"Book a Flight",
    url: "/flight-bookings",
  },
  {
    name:"Flight Specials",
    url: "/flight-specials",
  },
  {
    name:"Find A Car",
    url: "/car-bookings",
  },
  {
    name:"Accomodation",
    url: "/accomodation",
  },
  {
    name:"Blog",
    url: "/blog",
  },
  {
    name:"Contact",
    url: "/contact",
  },
];
const emit = defineEmits(['hideMenu'])
const hideMenu = ()=>{
emit('hideMenu')
}
</script>