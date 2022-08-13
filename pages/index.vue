<template>

    <div class="h-screen overflow-y-scroll snap-y snap-proximity">
         <HomeWelcome class="snap-start"/>
        <HomeFavouritePackages class="snap-start"/> 
        <HomeDestinations class="snap-start"/> 
         <HomeFlights class="snap-start" />
        <HomeTestimonials class="snap-start"/>
        <HomeFiveReasons class=""/> 
    </div>
</template>
<script setup>
    definePageMeta({
        layout: "home",
    })
</script>