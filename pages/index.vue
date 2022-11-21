<template>
  <div class="relative h-full w-full bg-slate-300 select-none">
    <HomeWelcome />
    <div :class="{ '': suggestStore.showSuggestions }">
      <HomeFavouritePackages id="faves" />
      <HomeDestinations id="dests" />
      <HomeFlSpecials id="flights" />
      <HomeTestimonials />
      <HomeFiveReasons />
      <HomeNewsletterSignup />
      <Footer />
    </div>
    <div class="absolute inset-0 pointer-events-none">
      <Header />
    </div>
  </div>
</template>
<script setup>
import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

watch(
  () => global.homePageScroll,
  (a, b) => {
    scrollTo(a);
  }
);
const scrollTo = (homePageScroll) => {
  console.log(homePageScroll);
  document
    .querySelector("#" + homePageScroll)
    .scrollIntoView({ behavior: "smooth" });
};
const config = useRuntimeConfig();
useJsonld({
  "@context": "https://schema.org",
  "@type": "Organization",
  url: config.baseUrl,
  logo: "https://res.cloudinary.com/sharkfin/image/upload/v1669024295/computravel/computravel-main-logo_b3kl0j.png",
});
</script>