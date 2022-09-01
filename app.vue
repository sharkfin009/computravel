<template>
  <meta property="og:type" content="Holiday Package" />
  <meta property="og:title" content="Computravel" />
  <meta
    property="og:description"
    content="Computravel serves as an online South African travel agent, boasting
          highly professional experts with years in the tourism and hospitality
          industries."
  />
  <meta
    property="og:image"
    content="https://res.cloudinary.com/sharkfin/image/upload/v1662040372/Screen_Shot_2022_09_01_at_12_47_02_60dcc9e618.png"
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