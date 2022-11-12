<template>
  <HomeSectionLayout bgColor="bg-stone-50">
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
        <TabMenu
          @selectTab="setActiveTab"
          :titles="destinationsDictionary"
        ></TabMenu>
      </div>

      <div class="relative h-[470px] w-full">
        <HomeDestination
          v-for="(region, index) in packages"
          :key="index"
          :region="region"
          class="absolute inset-0 w-full flex flex-col"
          :class="{ '!opacity-0 !pointer-events-none': index !== activeTab }"
        >
          <!-- unnamed slot for destination pic on left: -->
          <div class="hidden lg:block relative h-full lg:mr-10">
            <img
              class="
                absolute
                rounded-3xl
                md:rounded-lala
                shadow-2xl
                h-[130px]
                w-[320px]
                md:w-full
                lg:h-[450px]
              "
              :src="destinationImages[index]"
              :class="{
                '!opacity-0 ': index !== activeTab,
              }"
            />
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
// const graphqlw = useStrapiGraphQL();

const activeTab = ref(0);

import { useGraphPromise } from "../../composables/useGraphPromise";

const destinationsDictionary = [
  "Europe",
  "Middle East",
  "Africa",
  "Indian Ocean Islands",
  "East and Southeast Asia",
];
const destinationsDictionaryMobile = ["Europe", "Middle East", "Africa"];

const getThree = (region) => {
  return useGraphPromise(`
  query {
    packages(filters:{region:{eq:"${region}"}} pagination:{
      page:1,pageSize:20
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
          uploaded_images {
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
          image_urls
          star_rating
          slug
        }
      }
    }
  }
`);
};
const packages = ref([]);
const queryArray = destinationsDictionary.map((item) => {
  return getThree(item).then((res) =>
    res.data.packages.data.sort(() => Math.random() - 0.5).slice(0, 3)
  );
});

Promise.all(queryArray).then((values) => {
  packages.value = values;
});
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
const destinationQueryArray = destinationsDictionary.map((item) => {
  return getDestinationImages(item).then((res) => {
    return res.data.regions.data[0].attributes.images.data[0].attributes.url;
  });
});

const destinationImages = ref([]);
Promise.all(destinationQueryArray).then((values) => {
  destinationImages.value = values;
  console.log(values);
});

const setActiveTab = (index) => {
  activeTab.value = index;
};
</script>