<template>
  <HomeSectionLayout v-if="reasons !== undefined" bgColor="bg-green-avo">
    <div
      class="bg-green-avo flex flex-col text-2xl justify-evenly md:mx-0 pb-5"
    >
      <SectionHeading
        heading="travel with us"
        subheading="five reasons to"
        :inverted="true"
      />

      <TabMenu
        @selectTab="setActiveTab"
        :titles="titles"
        class="mb-5"
      ></TabMenu>

      <div class="relative h-[280px] md:h-[400px] overflow-hidden">
        <HomeReason
          v-for="(reason, index) in reasons"
          :key="index"
          :reason="reason"
          class="absolute inset-0 transition ease-in duration-300"
          :class="{ 'opacity-0 translate-x-[80vw]': index !== activeTab }"
        />
      </div>
    </div>
  </HomeSectionLayout>
</template>

<script setup>
const activeTab = ref(0);
let titles = ref([]);
const setActiveTab = (index) => {
  activeTab.value = index;
};

const graphql = useStrapiGraphQL();
let reasons = await graphql(`
  query {
    reasons {
      data {
        id
        attributes {
          title
          subtitle
          content
          image_path
        }
      }
    }
  }
`);
titles.value = reasons.data.reasons.data.map((item) => item.attributes.title);
reasons = reasons.data.reasons.data.map((item) => ({
  subtitle: item.attributes.subtitle,
  content: item.attributes.content,
  image_url: item.attributes.image_path.replace(
    "https://res.cloudinary.com/sharkfin/image/upload/",
    ""
  ),
}));
</script>
