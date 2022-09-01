<template>
  <meta property="og:type" content="article" />
  <meta property="og:title" content="When Great Minds Don’t Think Alike" />
  <meta
    property="og:description"
    content="How much does culture influence creative thinking?"
  />
  <meta
    property="og:image"
    content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
  />
  <div class="text-sm md:text-xl">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
nuxtApp.vueApp.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith("fa-icon");
};
import { useenquiry } from "@/stores/enquiry";
const enquiryState = useenquiry();
onMounted(() => {
  if (
    localStorage.getItem("enquirySent") &&
    localStorage.getItem("enquiryRef") &&
    localStorage.getItem("enquiryId")
  ) {
    enquiryState.enquirySent = true;
    enquiryState.enquiryRef = localStorage.getItem("enquiryRef");
    enquiryState.enquiryId = localStorage.getItem("enquiryId");
  }
});
</script>