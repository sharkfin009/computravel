<template>
  <HomeSectionLayout bgColor="bg-stone-50" v-if="done">
    <!-- <pre>{{
      destinationPackagesArray.map((item) =>
        item.map((p) => p.attributes.images)
      )
    }}</pre> -->
    <div class="">
      <SectionHeading
        heading="destinations"
        subheading="experience these"
        :inverted="true"
      />
      <!-- XL header:-->
      <div class="xl:block">
        <div />
        <div />
        <!-- mobile -->
        <TabMenu
          class="flex md:hidden"
          @selectTab="setActiveTab"
          :titles="destinationsDictionary.slice(0, 3)"
        ></TabMenu>
        <!-- md -->
        <TabMenu
          class="hidden md:flex"
          @selectTab="setActiveTab"
          :titles="destinationsDictionary"
        ></TabMenu>
      </div>

      <div class="relative h-[470px] w-full">
        <div v-for="(three, index) in destinationPackagesArray" :key="index">
          <HomeDestination
            :destinationPackages="three"
            :destinationImage="destinationImages[index]"
            class="absolute inset-0 w-full flex flex-col"
            :class="{ '!opacity-0 !pointer-events-none': index !== activeTab }"
          >
          </HomeDestination>
        </div>
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

const activeTab = ref(0);

import { useGraphPromise } from "../../composables/useGraphPromise";

const destinationsDictionary = [
  "Europe",
  "Middle East",
  "Africa",
  "Indian Ocean Islands",
  "East and Southeast Asia",
];
// PACKAGES:
const getThree = (region) => {
  return useGraphPromise(`
  query {
    packages(filters:{region:{eq:"${region}"}} pagination:{
      page:1,pageSize:10
    }) {
      data {
        attributes {
          destination
          title
          region
          from
          to
          description
          supplier_ref
          valid_to
          price
          images {
            data {
              attributes {
                url
              }
            }
          }
          category {
            data {
              attributes {
                name
              }
            }
          }
          images{
            data{
              attributes {
                url
                alternativeText
              }
            }
          }
          star_rating
          slug
        }
      }
    }
  }
`);
};
const packageQueryArray = destinationsDictionary.map(async (item) => {
  let three = await getThree(item).then((res) =>
    res.data.packages.data.sort(() => Math.random() - 0.5).slice(0, 3)
  );
  return three;
});
// DESTINATION IMAGES:
const destinationPackagesArray = ref([]);
const getDestinationImages = (region) => {
  return useGraphPromise(`
  query{
  regions(
    filters:{
        name:{
       eq: "${region}"
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
}`);
};
const destinationQueryArray = destinationsDictionary.map(async (item) => {
  return getDestinationImages(item).then((res) => {
    return res.data.regions.data[0].attributes.images.data[0].attributes.url.replace(
      "https://res.cloudinary.com/sharkfin/image/upload/",
      ""
    );
  });
});

const destinationImages = ref([]);
// resolve promises:
const done = ref(false);
Promise.all([...destinationQueryArray, ...packageQueryArray]).then((values) => {
  destinationImages.value = values.slice(0, destinationsDictionary.length);
  destinationPackagesArray.value = values.slice(destinationsDictionary.length);
  console.log(destinationImages.value, destinationPackagesArray.value);
  done.value = true;
});

const setActiveTab = (index) => {
  activeTab.value = index;
};
</script>