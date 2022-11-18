<template>
  <div v-if="data" class="bg-slate-50 pb-20">
    <SectionHeading
      :heading="data.data.groupsAndIncentivesContent.data.attributes.title"
      :subheading="
        data.data.groupsAndIncentivesContent.data.attributes.subtitle
      "
      :inverted="false"
    />
    <!-- {{ data }} -->

    <div class="p-5 md:p-20 bg-green-avo rounded-xl">
      <div class="grid xl:grid-cols-2 gap-5 xl:gap-40 xl:px-40 pb-10">
        <nuxt-img
          :src="
            data.data.groupsAndIncentivesContent.data.attributes.images.data[0].attributes.url.replace(
              'https://res.cloudinary.com/sharkfin/image/upload',
              ''
            )
          "
          class="object-cover rounded-xl"
        />

        <nuxt-img
          :src="
            data.data.groupsAndIncentivesContent.data.attributes.images.data[1].attributes.url.replace(
              'https://res.cloudinary.com/sharkfin/image/upload',
              ''
            )
          "
          class="object-cover rounded-xl"
        />
      </div>
      <div
        class="groups px-3"
        v-html="data.data.groupsAndIncentivesContent.data.attributes.body"
      ></div>
    </div>

    <div class="w-full flex justify-center">
      <div class="w-full md:max-w-[800px]">
        <SectionHeading
          class="!py-16"
          heading="Send us your group enquiry"
          :inverted="false"
        />

        <GroupsForm />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
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
                groupsAndIncentivesContent{
                    data{
                        attributes{
                            title
                            subtitle
                            body
                            form_title
                            form_subtitle
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