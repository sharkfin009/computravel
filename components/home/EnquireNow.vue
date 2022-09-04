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
        h-[95vh]
        w-[95vw]
      "
    >
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
          pt-0
          md:pt-10
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