<template>
  <div class="">
    <Head v-if="package_data">
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
          package_data.packages.data[0].attributes.images.data[0].attributes.url
        "
      />
      <!-- twitter: -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content="'https://computravel.co.za'" />

      <Meta
        name="twitter:image"
        :content="
          package_data.packages.data[0].attributes.images.data[0].attributes.url
        "
      />
    </Head>
    <div
      v-show="responseCount < 3"
      class="h-screen flex justify-center items-center"
    >
      <IconTick
        class="
          animate__animated animate__zoomIn animate__infinite animate__slow
        "
        style="color: #8fc15a"
      />
    </div>
    <div v-if="package_data && responseCount == 3" class="bg-slate-50">
      <div class="w-full">
        <PackageBody
          :package_data="package_data"
          :destination_content="destination_content"
        />
      </div>
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
                 
                   description
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
                   video_url
                   uploaded_images{
                    data{
                      attributes{
                        url
                      }
                    }
                    }
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
    checkCountry(data.packages.data[0].attributes.destination);
    checkRegion(data.packages.data[0].attributes.region);
    checkProvince(data.packages.data[0].attributes.destination);
  })

  .catch((error) => {
    error.value = error;
  });

const config = useRuntimeConfig();
const checkCountry = async (dest) => {
  const { result: countryResult, search: countrySearch } = useSearch(
    "production_api::country.country"
  );

  await countrySearch({
    query: dest,
    requestOptions: {
      hitsPerPage: 1,
    },
  })
    .then((result) => {
      store.location.country = result.hits[0];
      responseCount.value++;
    })

    .catch((error) => {
      destination_content.value = error;
    });
};
const checkProvince = async (dest) => {
  const { result: provinceResult, search: provinceSearch } = useSearch(
    "production_api::province.province"
  );

  await provinceSearch({
    query: dest,
    requestOptions: {
      hitsPerPage: 1,
    },
  })
    .then((result) => {
      store.location.province = result.hits[0];
      responseCount.value++;
    })

    .catch((error) => {
      console.log(error);
    });
};

const checkRegion = async (dest) => {
  const { result: regionResult, search: regionSearch } = useSearch(
    "production_api::region.region"
  );

  await regionSearch({
    query: dest,
    requestOptions: {
      hitsPerPage: 1,
    },
  })
    .then((result) => {
      store.location.region = result.hits[0];
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
      if (store.location.province !== undefined) {
        destination_content.value = {
          name: store.location.province.name,
          copy: store.location.province.copy,

          images: store.location.province.images.map((item) => item.url),
        };
        return;
      }
      if (store.location.country !== undefined) {
        destination_content.value = {
          name: store.location.country.name,
          copy: store.location.country.copy,
          images: store.location.country.images.map((item) => item.url),
        };
        return;
      }
      if (store.location.region !== undefined) {
        destination_content.value = {
          name:
            store.location.region.name == "Mediterranean"
              ? "the Mediterranean"
              : store.location.region.name,
          copy: store.location.region.copy,
          images: store.location.region.images.map((item) => item.url),
        };
        return;
      }
    }
  }
);
</script>