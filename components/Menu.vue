<template>
  <div
    class="fixed select-none inset-0 flex justify-end z-50 pointer-events-none"
  >
    <div class="backdrop-blur h-full">
      <div
        class="
          h-full
          w-[100vw]
          md:w-[50vw]
          lg:w-[30vw]
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
        ref="menu"
      >
        <div class="overflow-auto pb-[800px] w-full">
          <div class="text-sm mt-4 mb-3">Search Packages by:</div>

          <ul
            v-if="menuData"
            class="pl-3 grid grid-cols-[100px,auto] list-style-none"
            @mouseleave="clear"
          >
            <li
              class="mb-3 hover:text-lime-500 relative"
              @click="thisListOnly('regions')"
              @mouseover="thisListOnly('regions')"
            >
              Region
            </li>

            <MenuList
              :list="menuData.regions"
              :state="listState.regions"
              type="region"
            />

            <li
              class="mb-3 hover:text-lime-500"
              @click="thisListOnly('countries')"
              @mouseover="thisListOnly('countries')"
            >
              Country
            </li>
            <MenuList
              :list="menuData.countries"
              :state="listState.countries"
              type="destination"
            />

            <li
              class="mb-3 hover:text-lime-500"
              @mouseover="thisListOnly('provinces')"
            >
              SA Province
            </li>
            <MenuList
              :list="menuData.provinces"
              :state="listState.provinces"
              type="destination"
            />

            <li
              class="mb-3 hover:text-lime-500"
              @mouseover="thisListOnly('cities')"
            >
              City
            </li>
            <MenuList
              :list="menuData.cities"
              :state="listState.cities"
              type="city"
            />

            <li
              class="mb-3 hover:text-lime-500"
              @mouseover="thisListOnly('categories')"
            >
              Category
            </li>

            <MenuList
              :list="menuData.categories"
              :state="listState.categories"
              type="category"
            />
          </ul>
          <ul class="list-none">
            <li
              v-for="(item, index) of items"
              :key="index"
              class="mb-3 hover:text-lime-500"
            >
              <NuxtLink
                @click="globalStore.showMenu = false"
                class="w-full"
                :to="item.url"
              >
                <div class="w-full">
                  {{ item.name }}
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
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
    name: "Contact",
    url: "/contact",
  },
];
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();
const { menuData } = useMenuData();
console.log(menuData.value);
const listState = reactive({
  regions: false,
  countries: false,
  provinces: false,
  cities: false,
  categories: false,
});
const thisListOnly = (item) => {
  listState.regions = false;
  listState.countries = false;
  listState.provinces = false;
  listState.cities = false;
  listState.categories = false;
  listState[item] = true;
};
const clear = () => {
  listState.regions = false;
  listState.countries = false;
  listState.provinces = false;
  listState.cities = false;
  listState.categories = false;
};
const menu = ref(null);
import useDetectOutsideClick from "@/composables/useDetectOutsideClick";

useDetectOutsideClick(menu, () => {
  globalStore.showMenu = false;
});
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>