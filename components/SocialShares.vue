<template>
  <div class="fixed inset-0 flex justify-end items-center">
    <div class="flex flex-col w-50 text-3xli text-white">
      <SocialButton class="bg-blue-500" @click="share('facebook')">
        <fa-icon icon="fab fa-facebook  " />
        <div class="text-xl">share</div>
      </SocialButton>
      <SocialButton class="bg-blue-200" @click="share('twitter')">
        <fa-icon icon="fab fa-twitter   " />
        <div class="text-xl">share</div>
      </SocialButton>

      <SocialButton class="bg-gray-400" @click="share('email')">
        <fa-icon icon="far fa-envelope  " />
        <div class="text-xl">share</div>
      </SocialButton>
      <SocialButton class="bg-red-500" @click="share('pinterest')">
        <fa-icon icon="fab fa-pinterest " />
        <div class="text-xl">share</div>
      </SocialButton>
      <SocialButton class="bg-green-500" @click="share('whatsapp')">
        <fa-icon icon="fab fa-whatsapp  " />
        <div class="text-xl">share</div>
      </SocialButton>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

  

const share = (provider) => {
    let pageUrl = config.baseUrl;
  let url = "";

  let pageTitle = "";

  if (provider == "facebook") {
    url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
    socialWindow(url, 570, 570);
  }

  if (provider == "twitter") {
    url =
      "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle;
    socialWindow(url, 570, 300);
  }

  if (provider == "whatsapp") {
    url = "whatsapp://send?text=" + pageTitle + "%20" + pageUrl;
    socialWindow(url, 570, 450);
  }

  if (provider == "mail") {
    url =
      "mailto:" +
      pageUrl;
    socialWindow(url, 570, 450);
  }
};

const socialWindow = (url, width, height) => {
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
