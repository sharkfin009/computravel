<template>
  <div class="fixed inset-0 flex justify-end items-center pointer-events-none">
    <div
      class="
        flex flex-col
        w-[70px]
        md:w-[100px]
        text-3x text-white
        pointer-events-auto
      "
    >
      <SocialButton class="bg-blue-500 mb-3" @click="share('facebook')">
        <IconFacebook class="cursor-pointer ml-[1px] w-4 md:w-8 mr-1" />
      </SocialButton>
      <SocialButton class="bg-blue-200 mb-3" @click="share('twitter')">
        <IconTwitterWhite class="cursor-pointer ml-[1px] w-5 md:w-8 mr-1" />
      </SocialButton>

      <SocialButton class="bg-gray-400 mb-3" @click="share('email')">
        <IconEnvelope class="cursor-pointer w-4 ml-[2px] md:w-6 mr-1" />
      </SocialButton>

      <SocialButton class="bg-green-500" @click="share('whatsapp')">
        <IconWhatsappWhite class="cursor-pointer ml-[1px] w-4 md:w-6 mr-1" />
      </SocialButton>
    </div>
  </div>
</template>

<script setup>
import { useSocialSharing } from "@/composables/socialSharing";

const { share } = useSocialSharing();
</script>
