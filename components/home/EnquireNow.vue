<template>
  <div
    class="
      fixed
      inset-0
      w-screen
      h-screen
      flex
      justify-center
      items-center
      bg-black bg-opacity-30
      z-50
    "
  >
    <div
      class="relative bg-green-avo rounded-xl p-10 flex flex-col justify-evenly"
    >
      <div class="text-center font-bold text-2xl mb-5">
        Tell us a few things and we will get right back to you!
      </div>
      <HomeEnquireForm />

      <CloseRow
        class="absolute top-0 left-0"
        @closeModal="enquiry.showEnquireNow = false"
      />
    </div>
  </div>
</template>

<script setup>
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
</script>