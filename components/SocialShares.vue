<template>
  <div class="fixed inset-0 flex justify-end items-center pointer-events-none">
    <div
      class="
        flex flex-col
        gap-0
        md:gap-2 md:w-50
        text-3x text-white
        pointer-events-auto
      "
    >
      <SocialButton class="bg-blue-500 mb-3" @click="share('facebook')">
        <i class="fa-brands fa-facebook" />
      </SocialButton>
      <SocialButton class="bg-blue-200 mb-3" @click="share('twitter')">
        <i class="fa-brands fa-twitter" />
      </SocialButton>

      <SocialButton class="bg-gray-400 mb-3" @click="share('email')">
        <i class="far fa-envelope" />
      </SocialButton>
      <!-- <SocialButton class="bg-red-500" @click="share('pinterest')">
        <i class="fa-brands fa-pinterest" />
      </SocialButton> -->
      <SocialButton class="bg-green-500" @click="share('whatsapp')">
        <i class="fa-brands fa-whatsapp" />
      </SocialButton>
    </div>
  </div>
</template>

<script setup>
import { useSocialSharing } from "@/composables/socialSharing";

const { share } = useSocialSharing();
</script>
