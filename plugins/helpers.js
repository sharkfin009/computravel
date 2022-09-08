import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const ellipsis = (text, length) => {
    if (text.length > length) {
      let cutTextChars = text.substring(0, length);
      let lastWord = cutTextChars.split(" ").pop(-1);
      let cutText = cutTextChars.slice(
        0,
        cutTextChars.length - lastWord.length
      );
      return cutText + "...";
    } else return text;
  };
  return {
    provide: {
      ellipsis: ellipsis,
    },
  };
});
