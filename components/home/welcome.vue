<template>
  <section class="relative">
    <!-- slider -->
    <div class="relative w-full h-[98vh] pt-20 px-20 flex flex-col justify-end overflow-hidden">
      <Transition name="fade">
        <div v-if="imageStyles.length > 0">
          <div class="w-full h-full absolute inset-0">
            <div
              v-for="(image, index) in imageStyles"
              :key="index"
              class="w-full h-full absolute transition ease-in duration"
              :style="imageStyles[index]"
              :class="{ 'opacity-0 fadeIn': index !== activePic }"
            ></div>
          </div>
        </div>
      </Transition>
      <div
        class="w-full h-full absolute inset-0 grid grid-rows-[1fr,1fr] p-10 md:pl-20 xl:pl-40"
      >
        <div class="flex flex-col justify-end">
          <div
            class="
              text-white text-shadow
              font-medium font-titillium
              xl:text-5xl
              md:text-3xl
              text-2xl
              md:w-[40vw]
              leading-none
              mb-5
            "
          >
            Welcome to <span class="">Computravel</span>, the travel experts who
            care.
          </div>
          <h3 class="text-white font-open-sans font-medium text-xl md:text-2xl xl:text-3xl w-[250]">
            Let us help book you <br />your perfect holiday!
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
          <SearchBar class="mb-20 w-full  sm:w-[400px] " :parent="'welcome'" />
     
        </div>
      </div>
    </div>
  
  </section>
</template>
<script setup>
const config = useRuntimeConfig();
import { useGraph } from "~/composables/useGraph";

const { data: images, error } = useGraph(
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
);
const imageStyles = ref([]);
watch(
  () => images.value,
  () => {
    imageStyles.value =
      images.value.homePageCarousel.data.attributes.pics.data.map((item) => {
        let url = item.attributes.url;
        return {
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
        };
      });
    console.log(imageStyles.value);
  }
);

let activePic = ref(0);
setInterval(() => {
  if (activePic.value === imageStyles.value.length - 1) {
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