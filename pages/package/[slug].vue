<template>
  <div
    v-if="package_data && responseCount == 3"
    class="bg-slate-50 px-10 md:px-14"
  >
    <Head>
      <Meta
        property="og:description"
        :content="
          'R ' +
          package_data.packages.data[0].attributes.price +
          ' per person sharing'
        "
      />
      <Meta
        property="og:title"
        :content="package_data.packages.data[0].attributes.title"
      />
      <Meta
        property="og:image"
        :content="
          'https://' + package_data.packages.data[0].attributes.image_url_lg
        "
      />
      <!-- twitter: -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content="'https://computravel.co.za'" />

      <Meta
        name="twitter:image"
        :content="
          'https://' + package_data.packages.data[0].attributes.image_url_lg
        "
      />
    </Head>

    <div class="w-full">
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
const favorites = ref(null);
onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem("my-packages"));
});

const route = useRoute();
import { useStore } from "@/stores/package";
let store = useStore();
store.alreadyAdded = false;

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
                   image_url_md
                   includes
                   excludes
                   region
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
const responseCount = ref(0);
const { $graphql } = useNuxtApp();
$graphql(query)
  .then((response) => {
    package_data.value = response.data;
    store.package = response.data.packages.data[0];

    return response.data;
  })
  .then((data) => {
    if (
      favorites.value &&
      favorites.value
        .map((item) => item.attributes.supplier_ref)
        .includes(store.package.attributes.supplier_ref)
    ) {
      store.alreadyAdded = true;
    }
    return data;
  })
  .then((data) => {
    checkCountry(data.packages.data[0].attributes.region);
    checkRegion(data.packages.data[0].attributes.region);
    checkProvince(data.packages.data[0].attributes.destination);
  })

  .catch((error) => {
    error.value = error;
  });

const checkCountry = (dest) => {
  let query = `query{countries(filters:{
      name: {
        eq:"${dest}"
      }
    }){
      data{
        attributes{
          name
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

  $graphql(query)
    .then((response) => {
      store.location.country = response.data.countries.data;
      responseCount.value++;
    })

    .catch((error) => {
      destination_content.value = error;
    });
};
const checkProvince = (dest) => {
  let query = `query{provinces(filters:{
      name: {
        eq:"${dest}"
      }
    }){
      data{
        attributes{
          name
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

  $graphql(query)
    .then((response) => {
      store.location.province = response.data.provinces.data;
      responseCount.value++;
    })

    .catch((error) => {
      console.log(error);
    });
};

const checkRegion = (dest) => {
  let query = `query{regions(filters:{
      name: {
        eq:"${dest}"
      }
    }){
      data{
        attributes{
          name
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

  $graphql(query)
    .then((response) => {
      store.location.region = response.data.regions.data;
      responseCount.value++;
    })

    .catch((error) => {
      console.log(error);
    });
};
watch(
  () => {
    return responseCount.value;
  },
  () => {
    if (responseCount.value == 3) {
      if (store.location.province.length) {
        destination_content.value = {
          name: store.location.province[0].attributes.name,
          copy: store.location.province[0].attributes.copy,

          images: store.location.province[0].attributes.images.data.map(
            (item) => item.attributes.url
          ),
        };
        return;
      }
      if (store.location.country.length) {
        destination_content.value = {
          name: store.location.country[0].attributes.name,
          copy: store.location.country[0].attributes.copy,
          images: store.location.country[0].attributes.images.data.map(
            (item) => item.attributes.url
          ),
        };
        return;
      }
      if (store.location.region.length) {
        destination_content.value = {
          name:
            store.location.region[0].attributes.name == "Mediterranean"
              ? "the Mediterranean"
              : store.location.region[0].attributes.name,
          copy: store.location.region[0].attributes.copy,
          images: store.location.region[0].attributes.images.data.map(
            (item) => item.attributes.url
          ),
        };
        return;
      }
    }
  }
);
</script>