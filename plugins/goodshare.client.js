import { Facebook } from 'vue-socialmedia-share';
export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.vueApp.component( 'goodshare' , Facebook, {})
})