<template>
  <div
    class="fixed w-full z-50  h-[50px] md:h-[130px] flex "
    :class="{ 'bg-gray-100': route.path !== '/' }"
  >
 

    <div
      class="
        relative
        flex
        w-full
        justify-between
        py-3
        lg:px-5
        px-5
      "
    >
      <!-- desktop logo -->

      <NuxtLink class="text-primary" to="/">
        <div
          class="
           
            bg-opacity-90 bg-green-avo
            rounded-full
            shadow
            w-[160px]
            md:w-[320px]
            justify-center
            h-full
            flex 

            items-center 
          "
        >
          <IconComputravelLogo class="h-[30px] md:h-[60px]" />
        </div>
      </NuxtLink>

      <SearchBar
        v-if="route.path !== '/'"
        class="hidden md:block w-[20%]"
        :parent="'header'"
      />


      <div class="grid grid-cols-[auto,auto] gap-4 ">
      <!--  enq now button: -->
        <BookButton
          v-if="enquiry.showEnquireNow == false && enquiry.enquirySent == false"
          @mousedown="enquiry.showEnquireNow = true"
          class=""
          >enquire now</BookButton
        >
<!-- hamburger -->
        <div
          @click="showMenu = true"
          class="
            flex 
            justify-center
            items-center
            bg-green-avo
            rounded-full
            bg-opacity-80
            shadow
            
            flex
            w-[40px]
            md:w-[109px]
            lg:px-0
            cursor-pointer
            z-10
           
          "
          :class="{
            'opacity-0': showMenu == true,
          }"
        >
          <IconHamburger />
        </div>
      </div>
    </div>
    <!-- mobile search bar -->
    <div
      v-if="route.path !== '/'"
      class="block md:hidden w-full flex justify-evenly items-center pt-1 pb-4"
    >
      <SearchBar class="w-[80%]" :parent="'header'" />
    </div>

    <!-- MODALs -->

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
      <ConfirmModal v-if="enquiry.showConfirmation">
        <h3 class="text-6xl font-bold">Thankyou for your enquiry!</h3>
        <p>One of our travel experts will be in touch soon.</p>
        <div>
          Your enquiry reference is
          <span class="text-lime-500"> {{ enquiry.enquiryRef }} </span>
        </div>
      </ConfirmModal>
    </transition>
    <transition name="fade">
      <Menu v-if="showMenu" @hideMenu="showMenu = false" />
    </transition>

 <SocialShares/>
  </div>
       
    
</template>

<script setup>
const route = useRoute();
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
const showMenu = ref(false);
</script>