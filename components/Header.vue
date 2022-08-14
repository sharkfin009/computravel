<template>
  <div
    class="
      fixed
      flex
      z-10
      w-full
      items-center
      justify-between
      py-3
      lg:px-5
      px-5
    "
  >
    <NuxtLink class="relative text-primary" to="/">
      <div
        class="
          hidden
          lg:block
          relative
          bg-opacity-80 bg-green-avo
          rounded-full
          shadow-lg
          py-3
          w-[290px] lg:h-[80px]
         
        "
      >
        <IconComputravelSubtext
          class="hidden lg:block h-full w-full absolute inset-0"
        />
        <IconComputravelLogo class="h-full w-full absolute inset-0" />
      </div>

      <!-- mobile: -->
      <div
        class="
          block
          lg:hidden
          relative
          bg-opacity-80 bg-green-avo
          rounded-full
          shadow-lg
        flex 
        justify-center
       
          w-[120px]
          h-[33px]
        "
      >
 
        <IconComputravelLogo class="h-full w-full " />
      
      </div>
    </NuxtLink>
    <div class="w-full px-2" v-if="route.path !== '/'" >
    <SearchBar class="w-full " :parent="'header'" />
    <!--  enq now button: -->
    </div>
    <div   v-if="route.path == '/' && enquiry.showEnquireNow == false && enquiry.enquirySent==false" class="lg:flex lg:w-full lg:justify-end">
      <BookButton
      
        @mousedown="enquiry.showEnquireNow = true"
        class="z-30 lg:px-10 py-3 lg:py-6  text-sm lg:text-2xl shadow-xl"
        >enquire now</BookButton
      >
      <div class="w-0 lg:w-8 h-full"></div>
    </div>
    <div
      class="
        flex flex-col
        items-center
        bg-green-avo
        rounded-full
        bg-opacity-80
        shadow-xl
        p-2
        lg:p-5
      "
    >
      <IconHamburger />
    </div>
    <!-- enq2 -->
    <!-- <div class="lg:hidden absolute z-50 top-[110px] right-[25px]">
         <BookButton
          v-if="route.path == '/' && enquiry.showEnquireNow == false"
          &&
          !localStorage.getItem(enquirySent)
          @mousedown="enquiry.showEnquireNow = true"
          class="z-30 px-10"
          >Enquire Now!</BookButton
        >
    </div> -->
    <transition name="fade">
      <HomeEnquireNow
        v-if="enquiry.showEnquireNow"
        @success="
          enquiry.showEnquireNow = false;
          enquiry.showConfirmation = true;
        "
      />
    </transition>
    <transition name="fade">
      <EnquiryConfirmation v-if="enquiry.showConfirmation">
        Thank you for your enquiry!
        <br />
         Your enquiry reference is {{enquiry.enquiryRef}}
        One of our travel experts will revert to you very soon.
        You may add to or remove items from your list at any point.
      </EnquiryConfirmation>
    </transition>
  </div>
</template>

<script setup>
const route = useRoute();
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
</script>