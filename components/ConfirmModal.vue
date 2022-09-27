<template>
  <div
    class="
      fixed
      inset-0
      h-screen
      w-screen
      flex
      justify-center
      items-center
      bg-black
      z-50
    "
  >
    <div
      class="
        bg-lime-100
        w-[90vw]
        mt-20
        lg-w-[70vw]
        flex flex-col
        items-center
        rounded-3xl
        text-center
        font-medium
        shadow-3xl
        relative
      "
    >
      <div class="px-10 py-20">
        <div
          class="block lg:grid lg:grid-cols-[4fr,5fr] font-titillium text-3xl"
        >
          <!-- left pane -->
          <div class="grid p-5 lg:px-20">
            <h3 class="text-4xl md:text-6xl font-bold">
              <slot name="header" />
            </h3>
            <p class="text-2xl">
              <slot name="body" />
            </p>
            <div v-if="showRef">
              Your enquiry reference is
              <span class="text-lime-500"> {{ enquiryState.enquiryRef }} </span>
            </div>
            <div
              @click="goToSearch"
              class="
                text-lime-700 text-xl
                md:text-base
                underline
                flex
                items-end
                justify-center
                cursor-pointer
              "
              to="/search"
            >
              continue browsing our packages
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/sharkfin/image/upload/v1660814652/computravel/lala_pic_co0zya.png"
            class="hidden lg:block object-cover rounded-3xl"
          />
        </div>
      </div>
      <CloseRow class="absolute w-full h-20 inset-0 z-50" @click="goToSearch" />
    </div>
  </div>
</template>

<script setup>
import { useenquiry } from "@/stores/enquiry";
const props = defineProps({
  showRef: {
    type: Boolean,
  },
});
const enquiryState = useenquiry();
const goToSearch = () => {
  enquiryState.showConfirmation = false;
  enquiryState.showUpdateModal = false;
  navigateTo({
    path: "/search",
  });
};
</script>