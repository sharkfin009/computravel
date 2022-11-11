<template>
  <HomeSectionLayout bgColor="bg-stone-50">
    <div class="" v-if="data">
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

      <div class="relative h-[470px] lg:h-[500px] w-full">
        <HomeDestination
          v-for="(region, index) in packages"
          :key="index"
          :region="packages[index]"
          class="absolute inset-0 w-full flex flex-col items-center"
          :class="{ '!opacity-0 !pointer-events-none': index !== activeTab }"
        >
          <!-- unnamed slot for destination pic on left: -->
          <div
            class="hidden md:block w-[320px] md:w-full h-[130px] lg:h-[450px]"
          >
            <div class="relative h-full lg:mr-10">
              <div
                v-for="(region, index) in destinationsDictionary"
                :key="index"
                class="absolute inset-0 rounded-3xl md:rounded-lala shadow-2xl"
                :class="{
                  '!opacity-0 ': index !== activeTab,
                }"
              >
                <img :src="url" />
              </div>
            </div>
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
const packages = ref([]);
const images = ref({});

const activeTab = ref(0);

import { url } from "@vuelidate/validators";
import { useGraphPromise } from "../../composables/useGraphPromise";

const destinationsDictionary = [
  "Europe",
  "Middle East",
  "Africa",
  "Indian Ocean Islands",
  "East and South East Asia",
];
const destinationsDictionaryMobile = ["Europe", "Middle East", "Africa"];

const destinations = ref([]);
const randomChoices = [];

const getThree = (region) => {
  return useGraphPromise(`
  query {
    packages(filters:{region:{eq:"${region}"}}) {
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

getThree("Europe").then((output) => {
  console.log(output);
});

// watch(
//   () => data.value,
//   () => {
//     console.log(data.value);
//     destinationsDictionary.forEach((region) => {
//       const arrayOfThisDestination = data.value.data.packages.data.filter(
//         (tour) => tour.attributes.region === region
//       );
//       console.log(arrayOfThisDestination);
//       destinations.value.push(arrayOfThisDestination);
//       let threeChoices = [];
//       for (let i = 1; i <= 3; i++) {
//         threeChoices.push(
//           Math.floor(Math.random() * arrayOfThisDestination.length)
//         );
//       }
//       randomChoices.push(threeChoices);
//       packages.value = randomChoices.map((item, index) => {
//         return item.map(
//           (randomIndexNumber) => destinations.value[index][randomIndexNumber]
//         );
//       });
//       console.log(packages.value);
//     });
//   }
// );

// get urls for destination pics:

// const { data: destinationPics, error: error2 } = useGraph(`query{
//   regions(
//     filters:{
//         name:{
//             in:
//                 ["Europe", "Middle East", "Africa", "Indian Ocean Islands", "East and South East Asia"]

//         }
//     }
//     )
//     {
//     data{
//       attributes{
//         name
//        images{
//          data{
//            attributes{
//              url
//            }
//          }
//        }
//       }
//     }
//   }
// }
// `);
// const url = ref(null);
// const config = useRuntimeConfig();

// watch(
//   () => destinationPics.value,
//   (a, b) => {
//     url.value = destinationsDictionary.map(
//       (item) =>
//         destinationPics.value.data.regions.data.find(
//           (dest) => dest.attributes.name === item
//         ).attributes.images.data[0].attributes.url
//     );
//   }
// );

const setActiveTab = (index) => {
  activeTab.value = index;
};
</script>