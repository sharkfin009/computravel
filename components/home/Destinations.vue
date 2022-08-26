<template>
  <div
    class="flex flex-col pt-20 text-2xl px-10 md:px-[80px] md:pt-40 md:pb-20
    bg-stone-50"
    v-if="data"
  >
    <h3 class="text-4xl font-medium mb-2">experience these</h3>

    <h1 class="text-5xl font-titillium font-semibold mr-4 xl:mb-10">
      destinations
    </h1>
    <!-- XL header:-->
    <div class="hidden xl:block">
      <div />
      <div />
      <TabMenu
        @selectTab="setActiveTab"
        :titles="destinationsDictionary"
      ></TabMenu>
    </div>

    <div class="relative h-[800px] lg:h-[500px] w-full">
      <HomeDestination
        v-for="(destination, index) in packages"
        :key="index"
        :destination="packages[index]"
        class="absolute inset-0 w-full"
        :class="{ 'opacity-0': index !== activeTab }"
      >
        <!-- unnamed slot for destination pic on left: -->
        <div
          class="
            relative
            rounded-lala
            overflow-hidden
            shadow-2xl
            h-[250px]
            lg:h-[450px] lg:mr-10
          "
          v-if="picStyles.length > 0"
        >
          <div
            v-for="(destination, index) in destinationsDictionary"
            :key="index"
            :style="picStyles[index]"
            class="absolute inset-0"
            :class="{ 'opacity-0': index !== activeTab }"
          ></div>
        </div>
      </HomeDestination>
    </div>
  </div>
</template>

<style>
.line-top {
  border-top: solid black 2px;
}
</style>

<script setup>
const packages = ref([]);
const images = ref({});

const activeTab = ref(0);

import { useGraph } from "../../composables/useGraph";

const destinationsDictionary = ["Europe", "Middle East", "Africa"];
const destinationsDictionaryMobile = ["Europe", "Middle East", "Africa"];

const destinations = ref([]);
const randomChoices = [];
const { data, error } = useGraph(`query{
  packages{
    data{
      attributes{
        destination
        title
        subdestination
        from 
        to
        description
        supplier_ref
        valid_to
        price
        supplier
        image_url_md
        star_rating
        slug
      }
    }
  }
}
`);

watch(
  () => data.value,
  () => {
    console.log(data.value);
    destinationsDictionary.forEach((destination) => {
      const arrayOfThisDestination = data.value.packages.data.filter(
        (tour) => tour.attributes.destination === destination
      );
      destinations.value.push(arrayOfThisDestination);
      let threeChoices = [];
      for (let i = 1; i <= 3; i++) {
        threeChoices.push(
          Math.floor(Math.random() * arrayOfThisDestination.length)
        );
      }
      randomChoices.push(threeChoices);
      packages.value = randomChoices.map((item, index) => {
        return item.map(
          (randomIndexNumber) => destinations.value[index][randomIndexNumber]
        );
      });
      // console.log(packages.value)
    });
  }
);

// get urls for destination pics:

const { data: destinationPics, error: error2 } = useGraph(`query{
  destinationContents(
    filters:{
        destination:{
            in:
                ["Africa","Europe","Indian Ocean Islands", "Middle East"]
            
        }
    }
    )
    {
    data{
      attributes{
        destination
       images{
         data{
           attributes{
             url
           }
         }
       }
      }
    }
  }
}
`);
const picStyles = ref([]);
const config = useRuntimeConfig();

watch(
  () => destinationPics.value,
  (a, b) => {
    picStyles.value = destinationsDictionary.map((item, index) => {
      console.log(
        destinationPics.value.destinationContents.data.find(
          (dest) => dest.attributes.destination === item
        ).attributes.images,
        item
      );
      let url = destinationPics.value.destinationContents.data.find(
        (dest) => dest.attributes.destination === item
      ).attributes.images.data[0].attributes.url;

      return {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        dest: item,
      };
    });
    console.log(picStyles.value);
  }
);

const setActiveTab = (index) => {
  activeTab.value = index;
};
</script>