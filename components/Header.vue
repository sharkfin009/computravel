<template>
  <div
    class="sticky top-0 w-full z-50 flex flex-col"
    :class="{ 'bg-slate-50': route.path !== '/' }"
  >
    <div
      class="
        relative
        flex
        h-[66px]
        md:h-[90px]
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
            w-[150px]
            md:w-[220px]
            justify-center
            h-full
            flex
            items-center
          "
        >
          <IconComputravelLogo class="h-[30px] md:h-[40px]" />
        </div>
      </NuxtLink>

      <div class="hidden md:flex items-center">
        <SearchBar
          v-if="route.path !== '/'"
          class="w-[250px]"
          :parent="'header'"
        />
      </div>

      <div class="grid grid-cols-[auto,auto] gap-4">
        <!--  enq now button: -->
        <NuxtLink to="/enquire-form">
          <CompuButton
            v-if="enquiry.enquirySent == false"
            class="bg-lime-500 !h-full"
            >enquire now</CompuButton
          >
        </NuxtLink>
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
            w-[45px]
            md:w-[69px]
            cursor-pointer
            z-10
            hover:bg-lime-100
            transition
            duration-300
          "
          :class="{
            'opacity-0': showMenu == true,
          }"
        >
          <i class="text-stone-600 text-xl fa-solid fa-bars" />
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
      <ConfirmModal v-if="enquiry.showConfirmation">
        <h3 class="text-3xl md:text-6xl font-bold mb-5">
          Thankyou for your enquiry!
        </h3>
        <p class="text-xl md:text-base">
          One of our travel experts will be in touch soon.
        </p>
        <div class="text-xl md:text-base mb-5">
          Your enquiry reference is
          <span class="text-lime-500"> {{ enquiry.enquiryRef }} </span>
        </div>
      </ConfirmModal>
    </transition>
    <transition name="fade">
      <Menu v-if="showMenu" @hideMenu="showMenu = false" />
    </transition>

    <SocialShares />
  </div>
</template>

<script setup>
const route = useRoute();
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
const showMenu = ref(false);
</script>