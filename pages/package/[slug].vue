<template>
   
  <div
    v-if="package_data && destination_content"
    class="h-screen fixed overlow-hidden bg-gray-100 px-5 md:px-10 grid grid-rows-[100px,auto]"
  >
    <div />
    <div class="h-full w-full">
      <PackageBody
        :package_data="package_data"
        :destination_content="destination_content"
      />
    </div>


  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
const route = useRoute();
import { useStore } from "@/stores/package";
let store = useStore();

let query = `
            query{packages(
              filters:{ supplier_ref: { eq:"${
                route.params.slug.split("=")[1]
              }" } } ){
                data{
                  id
                  attributes{
                      title
                   image_url_lg
                   includes
                   excludes
                   subdestination
                   destination
                   price
                   valid_to
                   supplier_ref
                   star_rating
                   category
                   from
                   duration
                   terms
                   slug
                   supplier_ref
                  }
                }
              }
              }
            `;

const package_data = ref(null);
const error = ref(null);
const destination_content = ref(null);

const graphql = useStrapiGraphQL();

graphql(query)
  .then((response) => {
    package_data.value = response.data;
    store.package = response.data.packages.data[0];
    getDestinationContent(
      response.data.packages.data[0].attributes.subdestination
    );
  })

  .catch((error) => {
    error.value = error;
  });

const getDestinationContent = (dest) => {
  let query = `query{destinationContents(filters:{
      destination: {
        eq:"${dest}"
      }
    }){
      data{
        attributes{
          copy
          images{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }}`;

  graphql(query)
    .then((response) => {
      destination_content.value = response.data;
    })

    .catch((error) => {
      destination_content.value = error;
    });
};
</script>