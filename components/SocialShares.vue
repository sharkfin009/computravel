<template>
  <div class="fixed inset-0 flex justify-end items-center">
    <div class="flex flex-col w-50 text-3xli text-white">
   <SocialButton class=" bg-blue-500"> 
        <fa-icon icon="fab fa-facebook  " />
        <div class="text-xl">share</div>
     </SocialButton> 
   <SocialButton class="bg-blue-200"> 
        <fa-icon icon="fab fa-twitter   " />
        <div class="text-xl">share</div>
     </SocialButton> 
 
   <SocialButton class="bg-gray-400"> 
        <fa-icon icon="far fa-envelope  " />
        <div class="text-xl">share</div>
     </SocialButton> 
   <SocialButton class="bg-red-500 "> 
        <fa-icon icon="fab fa-pinterest " />
        <div class="text-xl">share</div>
     </SocialButton> 
   <SocialButton class="bg-green-500"> 
        <fa-icon icon="fab fa-whatsapp  " />
        <div class="text-xl">share</div>
     </SocialButton> 
    </div>
  </div>
</template>

<script setup>




const share = ( provider )=>{
 let url = ''
    var pageUrl = encodeURIComponent(document.URL);
    console.log(pageUrl)
        var pageTitle = encodeURIComponent(document.title);
    if (provider == 'facebook') {
      url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
      socialWindow(url, 570, 570);
    }
}



    

    // if (event.target.classList.contains('share__link--twitter')) {
    //   url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle;
    //   socialWindow(url, 570, 300);
    // }

    // if (event.target.classList.contains('share__link--linkedin')) {
    //   url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
    //   socialWindow(url, 570, 570);
    // }

    // if (event.target.classList.contains('share__link--whatsapp')) {
    //   url = "whatsapp://send?text=" + pageTitle + "%20" + pageUrl;
    //   socialWindow(url, 570, 450);
    // }

    // if (event.target.classList.contains('share__link--mail')) {
    //   url = "mailto:?subject=%22" + pageTitle + "%22&body=Read%20the%20article%20%22" + pageTitle + "%22%20on%20" + pageUrl;
    //   socialWindow(url, 570, 450);
    // }

   


const socialWindow = (url, width, height) => {
  var left = (screen.width - width) / 2;
  var top = (screen.height - height) / 2;
  var params = "menubar=no,toolbar=no,status=no,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
  window.open(url,"",params);
}

</script>
