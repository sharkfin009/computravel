<template>
  <div
    v-if="searchStore"
    class="
      select-none
      rounded-3xl
      user-select-none
      bg-green-avo
      shadow-xl
      flex flex-col
      items-center
      justify-between
      p-5
      md-p-10
      opacity-100
      font-medium
    "
  >
    <!-- first row grid -->
    <div class="grid lg:grid-cols-1 xl:grid-cols-5 gap-5 md-gap-10 w-full">
      <!-- destination autosuggest input -->
      <DestinationInput @setValue="setValue" />

      <CTSelect
        label="Category"
        inputName="category"
        :options="categories"
        placeholder="All"
        @setValue="setValue"
      />
      <!--dates  -->

      <!-- dates -->
      <Input
        inputName="from_date"
        label="Show Packages From"
        type="date"
        :validationObject="{}"
        errorMessage=""
        placeholder="Anytime"
        @setValue="setValue"
      />
      <Input
        inputName="to_date"
        label="To"
        type="date"
        :validationObject="{}"
        errorMessage=""
        placeholder="Anytime"
        @setValue="setValue"
      />
      <!-- sort by dropdown -->

      <CTSelect
        label="Sort by"
        inputName="sort_by"
        :options="sort_options"
        @setValue="setValue"
        placeholder="price low to high"
      />
    </div>
    <!-- last two items flex -->
    <div class="flex flex-wrap w-full justify-evenly gap-9 md:gap-10 m-5 ">
      <div class="h-full max-w-[500px]">
        <div class="mb-1">Price Range</div>
        <div
          class="
            grid md:grid-cols-[100px,auto,100px]
           grid-cols-[50px,auto,90px]
            bg-white
            py-4
            md:py-[15px]
            md:px-5
            inputsStyling
            rounded-xl
            text-sm
            shadow-lg
            hover:shadow-none
            input-outline
          "
        >
          <div class="text-center">
            R{{ numberWithCommas(searchStore.price_min) }}
          </div>
          <div class="relative">
            <div
              class="absolute inset-0 flex flex-col gap-4 cursor-pointer"
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

            <div class="flex flex-col gap-4 cursor-pointer" id="max">
              <input
                v-model.number="searchStore.price_max"
                type="range"
                min="0"
                max="100000"
                @change="searchStore.fireQuery()"
              />
            </div>
          </div>
          <div class="text-center">
            R{{ numberWithCommas(searchStore.price_max) }}
          </div>
        </div>
      </div>
      <div class="flex items-end justify-center">
        <QueryButton
          @click="enquiry.showEnquireNow = true"
          class="shadow-xl "
          >send us an enquiry</QueryButton
        >
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
  console.log(value);
  if (value == null) return;

  let valueForSearchQuery;
  if (typeof value == "string") {
    valueForSearchQuery = value;
  } else {
    if (inputName == "sort_by") {
      valueForSearchQuery = value.order;
    }
    if (inputName == "destination") {
      valueForSearchQuery = value;
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

const sort_options = [
  { order: "price:desc", label: "price high to low" },
  { order: "price:asc", label: "price low to high" },
];

const categories = [
  "Adventure",
  "All Inclusive",
  "Beach Holidays",
  "Boutique Hotels",
  "Bush Breaks",
  "City Breaks",
  "Cruise Holidays",
  "Family Holidays",
  "Honeymoons",
  "Romantic Getaways",
  "Private Small Trips",
  "Pet Friendly Holidays",
  "School Holidays",
  "Self-Catering",
  "Self-Drives",
  "Spa Getaways",
  "Sports Travel",
  "Train Trips",
  "Weekend Getaways",
];
</script>


<style scoped>
/* style for range slider */
#min input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 23px;
  width: 19px;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  background-color: #8fc15a;
  margin-top: -2px;
  transform: translateX(-50%);
  pointer-events: all;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(115, 115, 115);
}

#max input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 23px;
  width: 19px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  background-color: #8fc15a;
  margin-top: -2px;
  transform: translateX(50%);
  pointer-events: all;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgb(122, 122, 122);
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