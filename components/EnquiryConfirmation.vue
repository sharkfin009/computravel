<template>
  <div class="fixed inset-0 h-screen w-screen flex justify-center items-center">
    <div
      class="
        bg-green-avo
        w-[70vw]
        h-[400px]
        flex flex-col
        items-center
        rounded-3xl
        text-center
        font-medium
        border-4 border-lime-800
        shadow-3xl
        relative
      "
    >
      <div class="h-full flex items-center font-semibold tracking-widest">
        <slot />
      </div>
      <CloseRow
        class="absolute w-full h-full inset-0 z-50"
        @click="enquiry.showConfirmation = false;enquiry.showUpdateModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
</script>