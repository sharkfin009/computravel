<template>
  <div class="fixed inset-0 flex justify-end items-center pointer-events-none">
    <div
      class="
        flex flex-col
        gap-5
        md:gap-2 md:w-50
        text-3x text-white
        pointer-events-auto
      "
    >
      <SocialButton class="bg-blue-500 p-2 md-p-1" @click="share('facebook')">
        <fa-icon icon="fab fa-facebook  " />
        <div class="text-xs md-text-lg">share</div>
      </SocialButton>
      <SocialButton class="bg-blue-200 p-2 md-p-1" @click="share('twitter')">
        <fa-icon icon="fab fa-twitter   " />
        <div class="text-xs md-text-lg">share</div>
      </SocialButton>

      <SocialButton class="bg-gray-400 p-2 md-p-1" @click="share('email')">
        <fa-icon icon="far fa-envelope  " />
        <div class="text-xs md-text-lg">share</div>
      </SocialButton>
      <SocialButton class="bg-red-500 p-2 md-p-1" @click="share('pinterest')">
        <fa-icon icon="fab fa-pinterest " />
        <div class="text-xs md-text-lg">share</div>
      </SocialButton>
      <SocialButton class="bg-green-500 p-2 md-p-1" @click="share('whatsapp')">
        <fa-icon icon="fab fa-whatsapp  " />
        <div class="text-xs md-text-lg">share</div>
      </SocialButton>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
console.log(route.fullPath);
var fullPath = encodeURIComponent(config.baseUrl + route.fullPath);
const share = (provider) => {
  let url = "";

  let pageTitle = "";

  if (provider == "facebook") {
    url = "https://www.facebook.com/sharer.php?u=" + fullPath;
    socialWindow(url, 570, 570);
  }

  if (provider == "twitter") {
    url =
      "https://twitter.com/intent/tweet?url=" + fullPath + "&text=" + pageTitle;
    socialWindow(url, 570, 300);
  }

  if (provider == "whatsapp") {
    url = "whatsapp://send?text=" + "package" + "%20" + fullPath;
    socialWindow(url, 570, 450);
  }

  if (provider == "email") {
    url = "/mailto:" + fullPath;
    window.location.href = "mailto:?subject=Hi!&body=" + fullPath;
  }
};

const socialWindow = (url, width, height) => {
  console.log(url);
  var left = (screen.width - width) / 2;
  var top = (screen.height - height) / 2;
  var params =
    "menubar=no,toolbar=no,status=no,width=" +
    width +
    ",height=" +
    height +
    ",top=" +
    top +
    ",left=" +
    left;
  window.open(url, "", params);
};
</script>
