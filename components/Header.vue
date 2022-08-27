<template>
  <div
    class="fixed w-full z-50 md:pb-0"
    :class="{ 'bg-gray-100': route.path !== '/' }"
  >
 
    <!-- mobile logo: -->
    <div class="absolute z-10 block md:hidden w-full h-[10px] pt-2 ml-5 flex">
      <NuxtLink class="text-primary" to="/">
        <div
          style="transform-origin: 0% 0%"
          class="
            bg-opacity-80 bg-green-avo
            rounded-full
            scale-[45%]
            pt-3
            shadow
            px-5
            py-2
          "
        >
          <IconComputravelLogo class="" />
        </div>
      </NuxtLink>
    </div>
    <div
      class="
        relative
        flex
        w-full
        items-center
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
            hidden
            md:block
            bg-opacity-80 bg-green-avo
            rounded-full
            shadow
            px-5
            py-2
          "
        >
          <IconComputravelLogo class="" />
        </div>
      </NuxtLink>

      <SearchBar
        v-if="route.path !== '/'"
        class="hidden md:block w-[20%]"
        :parent="'header'"
      />

      <!--  enq now button: -->

      <div class="flex gap-5">
        <BookButton
          v-if="enquiry.showEnquireNow == false && enquiry.enquirySent == false"
          @mousedown="enquiry.showEnquireNow = true"
          class=""
          >enquire now</BookButton
        >

        <div
          @click="showMenu = true"
          class="
            flex flex-col
            items-center
            bg-green-avo
            rounded-full
            bg-opacity-80
            shadow
            p-2
            lg:p-5
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