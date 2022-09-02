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
      bg-black bg-opacity-100
      z-50
    "
  >
    <div
      class="
        relative
        bg-green-avo
        rounded-xl
        flex flex-col
        justify-evenly
        md:p-10
        h-[80vh]
        w-[90vw]
      "
    >
      <div class="text-center font-bold text-2xl py-10">
        Tell us a few things and we will get right back to you!
      </div>
      <div
        class="
          h-[80%]
          relative
          block
          md:flex
          flex-col
          justify-evenly
          overflow-auto
          md:overflow-auto
          pt-10
        "
      >
        <HomeEnquireForm />
      </div>
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