export const useSocialSharing = () => {
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
        "https://twitter.com/intent/tweet?url=" +
        fullPath +
        "&text=" +
        pageTitle;
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
  return { share };
};
