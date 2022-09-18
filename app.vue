<template>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="https://computravel.co.za" />

  <meta
    name="twitter:image"
    content=" https://res.cloudinary.com/sharkfin/image/upload/v1662040372/Screen_Shot_2022_09_01_at_12_47_02_60dcc9e618.png
      "
  />
  <Head>
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
    />
    <Meta name="pinterest-rich-pin" content="false" />
    <Meta property="og:type" content="Holiday Package" />
    <Meta property="og:title" content="Computravel Travel Experts" />
    <Meta
      property="og:description"
      content="Computravel serves as an online South African travel agent, boasting
          highly professional experts with years in the tourism and hospitality
          industries."
    />
    <Meta
      property="og:image"
      content="https://res.cloudinary.com/sharkfin/image/upload/v1662040372/Screen_Shot_2022_09_01_at_12_47_02_60dcc9e618.png"
    />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:site" content="'https://computravel.co.za'" />

    <Meta
      name="twitter:image"
      content=" https://res.cloudinary.com/sharkfin/image/upload/v1662040372/Screen_Shot_2022_09_01_at_12_47_02_60dcc9e618.png
      "
    />
  </Head>

  <div class="text-sm md:text-xl" @click="globalStore.showMenu = false">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
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