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
      z-10
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
      <div class="p-20">
        <div
          class="block md:grid md:grid-cols-[4fr,5fr] font-titillium text-3xl"
        >
          <!-- left pane -->
          <div class="grid p-5">
            <slot />
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
            class="hidden md:block object-cover rounded-3xl"
          />
        </div>
      </div>
      <CloseRow class="absolute w-full h-20 inset-0 z-50" @click="goToSearch" />
    </div>
  </div>
</template>

<script setup>
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
const goToSearch = () => {
  enquiry.showConfirmation = false;
  enquiry.showUpdateModal = false;
  navigateTo({
    path: "/search",
  });
};
</script>