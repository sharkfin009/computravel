<template>
  <div
    class="
      select-none
      rounded-3xl
      user-select-none
      bg-green-avo
      shadow-xl
      hover:shadow-none
      flex flex-col
      items-start
      justify-between
      p-5
      md:px-10
      opacity-100
      font-medium
      z-10
  "
  >
    <!--  toggle -->
    <div class="flex w-full cursor-pointer">
      <div
        @click="showFilters = true"
        v-if="!showFilters"
        class="w-full text-lime-600 hover:text-lime-500"
      >
        show filters
        <i class="fa fa-chevron-right" />
      </div>
      <div
        @click="showFilters = false"
        v-if="showFilters"
        class="w-full text-lime-600 hover:text-lime-500"
      >
        hide filters
        <i class="fa fa-chevron-down" />
      </div>
    </div>
    <!-- grid -->
    <div
      class="
        mt-5
        flex flex-col
        justify-evenly
        md:grid md:grid-cols-3 md:grid-rows-3
        xl:grid-cols-3 xl:grid-rows-2
        h-none
        lg:h-[400px]
        gap-10
        md-gap-1
        w-full
      "
      v-if="showFilters"
    >
      <!-- destination autosuggest input -->
      <div class="">
        <searchDestinationInput
          label="Region"
          optionsQuery="regions"
          type="region"
        />
      </div>
      <div class="">
        <searchDestinationInput
          label="Country"
          optionsQuery="countries"
          type="country"
        />
      </div>
      <div class="">
        <searchDestinationInput
          label="SA Province"
          optionsQuery="provinces"
          type="province"
        />
      </div>
      <div class="">
        <searchDestinationInput
          label="City"
          optionsQuery="cities"
          type="city"
        />
      </div>

      <SearchSelect
        v-if="categories"
        label="Categories"
        inputName="category"
        :options="
          categories.data.categories.data.map((item) => item.attributes.name)
        "
        @setValue="setValue"
        placeholder="All"
      />

      <!-- dates -->
      <!-- mobile: -->
      <div class="block md:hidden w-full flex justify-center gap-5">
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
      </div>

      <SearchInput
        class="hidden md:block"
        inputName="from_date"
        label="Show Packages From"
        type="date"
        :validationObject="{}"
        errorMessage=""
        placeholder="Anytime"
        @setValue="setValue"
      />
      <SearchInput
        class="hidden md:block"
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
                autocomplete="off"
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
                autocomplete="off"
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
    </div>

    <div
      v-if="showFilters"
      @click="clearFilters"
      class="
        cursor-pointer
        w-full
        mt-10
        text-center text-lime-600
        hover:text-lime-500
      "
    >
      clear filters
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

const showFilters = ref(false);

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

let categoryQuery = `
  query{categories{
    data{
        attributes{
            name
        }
    }
  }}
  `;
const { data: categories, categoryError } = useGraph(categoryQuery);

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