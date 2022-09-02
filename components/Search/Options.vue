<template>
  <div
    v-if="searchStore"
    class="
      md:sticky md:top-[90px]
      select-none
      rounded-3xl
      user-select-none
      bg-green-avo
      shadow-xl
      flex flex-col
      items-center
      justify-between
      p-5
      md:p-10
      opacity-100
      font-medium
    "
  >
    <!--  grid -->
    <div
      class="
        grid grid-cols-1 grid-rows-1
        md:grid-cols-2 md:grid-rows-3
        xl:grid-cols-3 xl:grid-rows-2
        gap-10
        md-gap-1
        w-full
      "
    >
      <!-- destination autosuggest input -->
      <div class="">
        <DestinationInput @setValue="setValue" />
      </div>
      <SearchSelect
        label="Category"
        inputName="category"
        :options="categories"
        placeholder="All"
        @setValue="setValue"
      />

      <!-- dates -->
      <SearchInput
        inputName="from_date"
        label="Show Packages From"
        type="date"
        :validationObject="{}"
        errorMessage=""
        placeholder="Anytime"
        @setValue="setValue"
      />
      <SearchInput
        inputName="to_date"
        label="To"
        type="date"
        :validationObject="{}"
        errorMessage=""
        placeholder="Anytime"
        @setValue="setValue"
      />
      <!-- sort by dropdown -->

      <SearchSelect
        label="Sort by"
        inputName="sort_by"
        :options="sort_options"
        @setValue="setValue"
        placeholder="price low to high"
      />
      <div class="h-full flex flex-col justify-between">
        <div class="mb-5">Price Range</div>
        <div
          class="
            grid
            md:grid-cols-[100px,auto,100px]
            grid-cols-[50px,auto,90px]
            bg-white
            md:py-[15px] md:px-5
            h-[55px]
            rounded-xl
            text-sm
            input-outline
          "
        >
          <div class="text-center flex items-center justify-center">
            R{{ numberWithCommas(searchStore.price_min) }}
          </div>
          <div class="relative">
            <div
              class="
                absolute
                inset-0
                gap-4
                cursor-pointer
                flex flex-col
                justify-center
              "
              id="min"
            >
              <input
                class=""
                v-model.number="searchStore.price_min"
                type="range"
                min="0"
                max="100000"
                @change="searchStore.fireQuery()"
              />
            </div>

            <div class="h-full flex items-center gap-4 cursor-pointer" id="max">
              <input
                v-model.number="searchStore.price_max"
                type="range"
                min="0"
                max="100000"
                @change="searchStore.fireQuery()"
              />
            </div>
          </div>
          <div class="flex justify-center items-center">
            R{{ numberWithCommas(searchStore.price_max) }}
          </div>
        </div>
      </div>
      <div
        @click="clearFilters"
        class="
          cursor-pointer
          absolute
          top-0
          right-0
          m-5
          text-lime-600
          hover:text-lime-500
        "
      >
        clear filters
      </div>
    </div>
  </div>
</template>



<script setup>
import { useGraph } from "../../composables/useGraph";
import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();

const chooseDates = ref(false);

const showFilters = ref(true);

const selectInput = (input) => {
  searchStore.activeInput = input;
};

const setValue = (inputName, value) => {
  if (value == null) return;
  console.log(value);
  let valueForSearchQuery;
  if (typeof value == "string") {
    valueForSearchQuery = value;
  } else {
    if (inputName == "sort_by") {
      valueForSearchQuery = value.order;
    }
  }
  console.log(valueForSearchQuery);
  searchStore[inputName] = valueForSearchQuery;
  searchStore.fireQuery();
};

searchStore.$subscribe((mutation, state) => {
  if (state.price_min > state.price_max) {
    state.price_max = state.price_min;
  }
  if (state.price_max < state.price_min) {
    state.price_min = state.price_max;
  }
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const sort_options = ["Price low to high", "Price high to low"];

const categories = [
  "All Inclusive Holidays",
  "Beach Holidays",
  "Bush Breaks",
  "City Breaks",
  "Family Holiday Packages",
  "Honeymoon Packages",
  "Romantic Getaways",
  "Self Drive",
  "Weekend Getaways",
  "Date Night",
  "Country Escapes",
];

const clearFilters = () => {
  searchStore.$reset();
};
</script>


<style scoped>
/* style for range slider */
#min input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 23px;
  width: 19px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  background-color: #d9e8c9;
  margin-top: -2px;
  transform: translateX(-50%);
  pointer-events: all;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(190, 190, 190, 0.801);
}

#max input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 23px;
  width: 19px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  background-color: #d9e8c9;
  margin-top: -2px;
  transform: translateX(50%);
  pointer-events: all;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(190, 190, 190, 0.801);
}

input[type="range"]::-webkit-slider-thumb:hover {
  background-color: #ecfccb !important;
  box-shadow: 2px 2px 5px grey;
  transition: all;
  transition-duration: 1000;
}

input[type="range"] {
  appearance: none;
  width: 100%;
  background-color: rgb(255, 255, 255);
  background: linear-gradient(#bbbbbb, #c3c3c3) no-repeat center;
  /* Use a linear gradient to generate only the 2px height background */
  background-size: 100% 4px;
  pointer-events: none;
  border-radius: 50%;
}
</style>