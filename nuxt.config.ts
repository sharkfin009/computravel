import { defineNuxtConfig } from 'nuxt';
export default defineNuxtConfig({
  
  meta: {
    script:[{
      src:"https://kit.fontawesome.com/7e89521fcf.js" ,
      crossorigin:"anonymous"
    }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Titillium+Web:ital,wght@0,400;0,600;1,400&display=swap',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      
    ],
  },
  buildModules: [
    '@nuxtjs/strapi',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/algolia',
    '@pinia/nuxt',
  ],
  publicRuntimeConfig: {
    strapiUrl: process.env.STRAPI_URL,
    baseUrl: process.env.BASE_URL,
    strapiUser: process.env.STRAPI_USER
  },
  algolia: {
    apiKey: 'c0e3a53fd96cb2d0a385e82faf323317',
    applicationId: '3HMM035S1R',
    lite: false,
    instantSearch: false,
    crawler: {
      apiKey: 'c0e3a53fd96cb2d0a385e82faf323317',
      indexName: 'trureview',
      meta: ['title', 'description'],
      include: () => true,
    },
  },
  css: [
    '~/styles/general.css',
    'animate.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

vue:{
      compilerOptions: {
        isCustomElement : (tag) => {
          return tag.startsWith("font-awesome-icon");
        }
    
  }
},
  strapi: {
    url: process.env.STRAPI_URL,
    prefix: '/api',
    version: 'v4',
  },

  
});
