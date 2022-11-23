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
        <IconFacebook class="cursor-pointer w-8 mr-2" />
      </SocialButton>
      <SocialButton class="bg-blue-200 mb-3" @click="share('twitter')">
        <IconTwitter class="cursor-pointer w-8 mr-2" />
      </SocialButton>

      <SocialButton class="bg-gray-400 mb-3" @click="share('email')">
        <IconEnvelope class="cursor-pointer w-6 ml-1 mr-2" />
      </SocialButton>

      <SocialButton class="bg-green-500" @click="share('whatsapp')">
        <IconWhatsapp class="cursor-pointer w-6 ml-1 mr-2" />
      </SocialButton>
    </div>
  </div>
</template>

<script setup>
import { useSocialSharing } from "@/composables/socialSharing";

const { share } = useSocialSharing();
</script>
