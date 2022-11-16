<template>
  <div v-if="data" class="px-10 md:px-20 bg-slate-50 pb-20">
    <SectionHeading
      heading="covid-19"
      subheading="statement and global procedure"
      :inverted="false"
    />

    <div class="p-5 md:p-20 bg-green-avo rounded-xl">
      <div class="grid lg:grid-cols-[3fr,1fr] gap-10">
        <div class="" v-html="data.data.covid19.data.attributes.body"></div>
        <!-- pics -->
        <div class="flex flex-col gap-5 pb-10">
          <img
            class="object-cover rounded"
            :src="
              data.data.covid19.data.attributes.images.data[0].attributes.url
            "
          />
          <img
            class="object-cover rouned"
            :src="
              data.data.covid19.data.attributes.images.data[1].attributes.url
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
const config = useRuntimeConfig();
const { data, pending, error, refresh } = await useFetch(
  config.strapiUrl + "/graphql",
  {
    method: "POST",
    body: {
      query: `
            query{
                covid19{
                    data{
                        attributes{
                            title
                            subtitle
                            body
                            images{
                                data{
                                    attributes{
                                        url
                                        alternativeText
                                    }
                                }
                            }
                        }
                    }
                }
            }`,
    },
  }
);
</script>