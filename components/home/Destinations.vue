<template>
  <HomeSectionLayout bgColor="bg-stone-50">
    <div class="" v-if="data">
      <SectionHeading
        heading="destinations"
        subheading="experience these"
        :inverted="true"
      />
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
          v-for="(region, index) in packages"
          :key="index"
          :region="packages[index]"
          class="absolute inset-0 w-full"
          :class="{ '!opacity-0 !pointer-events-none': index !== activeTab }"
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
              v-for="(region, index) in destinationsDictionary"
              :key="index"
              :style="picStyles[index]"
              class="absolute inset-0"
              :class="{
                '!opacity-0 ': index !== activeTab,
              }"
            ></div>
          </div>
        </HomeDestination>
      </div>
    </div>
  </HomeSectionLayout>
</template>

<style>
.line-top {
  border-top: solid black 2px;
}
</style>

<script setup>
definePageMeta({
  layout: "section",
});
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
        region
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
    destinationsDictionary.forEach((region) => {
      const arrayOfThisDestination = data.value.data.packages.data.filter(
        (tour) => tour.attributes.region === region
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
  regions(
    filters:{
        name:{
            in:
                ["Africa","Europe","Indian Ocean Islands", "Middle East"]
            
        }
    }
    ) 
    {
    data{
      attributes{
        name
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
    picStyles.value = destinationsDictionary.map((item) => {
      let url = destinationPics.value.data.regions.data.find(
        (dest) => dest.attributes.name === item
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