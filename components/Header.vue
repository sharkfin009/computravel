<template>
  <div
    class="fixed w-full z-50 pb-5 md:pb-0"
    :class="{ 'bg-gray-100': route.path !== '/' }"
  >
    <div class="flex w-full items-center justify-between py-3 lg:px-5 px-5">
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
            w-[290px]
            lg:h-[80px]
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
          <IconComputravelLogo class="h-full w-full" />
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
          class="z-30 lg:px-10 py-3 lg:py-6 text-sm lg:text-2xl shadow-xl"
          >enquire now</BookButton
        >

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
      </div>

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
    </div>
    <!-- mobile search bar -->
    <div v-if="route.path !== '/'" class="w-full flex justify-evenly">
      <SearchBar class="block md:hidden w-[80%]" :parent="'header'" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
</script>