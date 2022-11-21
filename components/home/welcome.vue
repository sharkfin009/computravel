<template>
  <section class="relative">
    <!-- slider -->
    <div class="relative w-full h-[98vh] pt-20 px-20 flex flex-col justify-end">
      <div v-if="images.length">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full h-full absolute inset-0"
        >
          <nuxt-img
            class="
              absolute
              inset-0
              w-full
              h-full
              transition
              ease-in
              duration
              object-cover
            "
            :src="image"
            :class="{ 'opacity-0 fadeIn': index !== activePic }"
            quality="80"
            format="webp"
          />
        </div>
      </div>
      <div
        class="
          w-full
          h-full
          absolute
          inset-0
          grid grid-rows-[1fr,1fr]
          p-10
          md:pt-[85px] md:px-20
          xl:pl-40
        "
      >
        <div class="flex flex-col justify-end">
          <div
            class="
              text-white text-shadow
              font-semibold font-titillium
              md:text-4xl
              text-3xl
              md:w-[40vw]
              leading-none
              mb-5
            "
          >
            Welcome to <span class="">Computravel</span>, the travel experts who
            care.
          </div>
          <h3
            class="
              text-white
              font-open-sans font-medium
              text-2xl
              md:text-3xl
              text-shadow
            "
          >
            Let us help you book <br />your perfect holiday!
          </h3>
        </div>

        <div
          class="
            left-0
            bottom-[40%]
            w-full
            pt-20
            flex flex-col
            justify-start
            items-center
          "
        >
          <div
            class="relative w-full flex flex-col items-center justify-center"
          >
            <SearchBar class="sm:w-[400px]" />
            <div class="relative w-full mt-5 bg-green-400">
              <SearchAutoSuggestOverlay parent="welcome" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const config = useRuntimeConfig();
import { useGraphPromise } from "../../composables/useGraphPromise";
const images = ref([]);
useGraphPromise(
  `query{
  homePageCarousel{
    data{attributes{
      pics{
        data{
          attributes{
            url
          }
        }
      }
    }}
  }
}`
).then((res) => {
  images.value = res.data.homePageCarousel.data.attributes.pics.data.map(
    (item) =>
      item.attributes.url.replace(
        "https://res.cloudinary.com/sharkfin/image/upload/",
        ""
      )
  );
  console.log(images.value);
});

let activePic = ref(0);
setInterval(() => {
  if (activePic.value === images.value.length - 1) {
    activePic.value = 0;
  }
  activePic.value++;
}, 6000);
</script>

<style scoped>
.text-shadow {
  text-shadow: black 1px 0 10px;
}

.fadeIn {
  animation-duration: 2s;
  animation-name: slideout;
  animation-timing-function: ease-in;
}

@keyframes slideout {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}

.duration {
  transition-duration: 2000ms;
}
</style>