<template>
  <Head>
    <!-- viewport: -->
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
    />
    <meta charset="utf-8" />
    <title>Welcome to Computravel | Home of Luxury Travel Holidays</title>
    <meta
      name="description"
      content="Computravel specialise in luxury holidays abroad to global destinations for the discerning leisure traveller."
    />
    <meta
      name="keywords"
      content="Computravel Holiday, Holiday, Luxury Holiday International Travel Packages, Home of Computravel, Computravel, flight specials, South Africa,travel overseas, south africa travel agent, luxury holiday packages"
    />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Cache-control" content="public" />
    <meta name="language" content="EN-ZA" />
    <meta name="author" content="Computravel" />
    <meta name="distribution" content="web" />
    <!-- social: -->
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
      property="description"
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

  <div class="text-sm md:text-xl tracking-wide">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const nuxtApp = useNuxtApp();

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