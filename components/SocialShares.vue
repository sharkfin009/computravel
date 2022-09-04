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
      <SocialButton class="bg-blue-500" @click="share('facebook')">
        <i class="fa-brands fa-facebook" />
      </SocialButton>
      <SocialButton class="bg-blue-200" @click="share('twitter')">
        <i class="fa-brands fa-twitter" />
      </SocialButton>

      <SocialButton class="bg-gray-400" @click="share('email')">
        <i class="far fa-envelope" />
      </SocialButton>
      <SocialButton class="bg-red-500" @click="share('pinterest')">
        <i class="fa-brands fa-pinterest" />
      </SocialButton>
      <SocialButton class="bg-green-500" @click="share('whatsapp')">
        <i class="fa-brands fa-whatsapp" />
      </SocialButton>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
// console.log(route.fullPath);
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
