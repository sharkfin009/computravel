<template>
  <div class="h-full w-full ">
    <HomeWelcome class="lg:snap-start" />
    <HomeFavouritePackages class="lg:snap-start" />
  
    <HomeDestinations class="lg:snap-start" />
    <HomeFlights class="lg:snap-start" />
    <HomeTestimonials class="lg:snap-start" />
    <HomeFiveReasons class="" />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
</script>