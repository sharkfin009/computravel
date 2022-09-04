<template>
  <div v-if="data" class="bg-slate-50 pb-20">
    <SectionHeading
      :heading="data.data.groupsAndIncentivesContent.data.attributes.title"
      :subheading="
        data.data.groupsAndIncentivesContent.data.attributes.subtitle
      "
      :inverted="false"
    />

    <div class="p-5 md:p-20 bg-green-avo rounded-xl">
      <div class="grid xl:grid-cols-2 gap-5 xl:gap-40 xl:px-40 pb-10">
        <img
          :src="
            data.data.groupsAndIncentivesContent.data.attributes.images.data[0]
              .attributes.url
          "
          class="object-cover rounded-xl"
        />

        <img
          :src="
            data.data.groupsAndIncentivesContent.data.attributes.images.data[1]
              .attributes.url
          "
          class="object-cover rounded-xl"
        />
      </div>
      <div
        style="
          ul {
            list-style-position: inside !important;
          }
        "
        v-html="data.data.groupsAndIncentivesContent.data.attributes.body"
      ></div>
    </div>
    <SectionHeading
      :heading="data.data.groupsAndIncentivesContent.data.attributes.form_title"
      :subheading="
        data.data.groupsAndIncentivesContent.data.attributes.form_subtitle
      "
      :inverted="false"
    />
    <SectionHeading
      heading="Send us your groups and incentives enquiry"
      :inverted="false"
    />

    <GroupsForm class="" />
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