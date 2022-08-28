<template>
  <div v-if="data" class="px-10 lg:px-20 bg-slate-50 pb-20">
    <SectionHeading
      :heading="data.data.groupsAndIncentivesContent.data.attributes.title"
      :subheading="
        data.data.groupsAndIncentivesContent.data.attributes.subtitle
      "
    />

    <div class="p-20 bg-green-avo rounded-xl">
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
        class=""
        v-html="data.data.groupsAndIncentivesContent.data.attributes.body"
      ></div>
    </div>
    <SectionHeading
      :heading="data.data.groupsAndIncentivesContent.data.attributes.form_title"
      :subheading="
        data.data.groupsAndIncentivesContent.data.attributes.form_subtitle
      "
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