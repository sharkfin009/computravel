import { defineNuxtConfig } from "nuxt";
export default defineNuxtConfig({
  meta: {
    script: [
      {
        src: "https://kit.fontawesome.com/7e89521fcf.js",
        crossorigin: "anonymous",
      },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Titillium+Web:ital,wght@0,400;0,600;1,400&display=swap",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  },
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/algolia", "@pinia/nuxt"],
  modules: ["@nuxtjs/strapi"],
  publicRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
    baseUrl: process.env.BASE_URL,
    strapiUser: process.env.STRAPI_USER,
    algolia_index_prefix: process.env.ALGOLIA_INDEX_PREFIX,
  },
  algolia: {
    apiKey: "c0e3a53fd96cb2d0a385e82faf323317",
    applicationId: "3HMM035S1R",
    lite: false,
    instantSearch: false,
    crawler: {
      apiKey: "c0e3a53fd96cb2d0a385e82faf323317",
      indexName: "trureview",
      meta: ["title", "description"],
      include: () => true,
    },
  },
  css: [
    "~/styles/general.css",
    "animate.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith("font-awesome-icon");
      },
    },
  },
});
