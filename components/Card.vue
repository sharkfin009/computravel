<template>
  <NuxtLink
    :to="`/package/${props.package.slug}_ref=${props.package.supplier_ref}`"
    class=""
  >
    <div
      class="
        w-[320px]
        h-[400px]
        grid grid-rows-2
        overflow-hidden
        h-full
        shadow
        hover:shadow-none
        rounded-lala
      "
    >
      <div>
        <div
          class="h-full flex items-end bg-slate-50"
          :style="{
            backgroundImage: `url(https://${props.package.image_url_md})`,
            backgroundSize: 'cover',
          }"
        >
          <div
            v-if="props.package.category"
            class="
              bg-black
              text-white
              w-[50%]
              text-center
              mb-10
              py-3
              font-titillium
              shadow-light-300 shadow-xl
              rounded-r-xl
            "
          >
            {{ props.package.category }}
          </div>
        </div>
      </div>
      <div class="p-8 bg-white flex flex-col justify-evenly">
        <div class="w-full font-titillium font-semibold text-xl">
          <h3 class="text-center mb-3">{{ titleFirstBit }}</h3>
          <div class="flex items-center justify-center mb-3">
            <div
              v-for="(star, index) in parseInt(props.package.star_rating)"
              :key="index"
              class="px-2"
            >
              <IconStar />
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            v-if="props.package.destination"
            class="text-center text-sm font-extralight mr-1"
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            {{ props.package.destination }},
          </div>
          <!-- <div v-if="JSON.parse(props.package.countries)!==null" class="text-center text-sm font-extralight pb-5">{{JSON.parse(props.package.countries)[0].name.toUpperCase()}}</div> -->
          <div
            v-if="props.package.subdestination"
            class="text-center text-sm font-extralight pb-1"
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            {{ props.package.subdestination }}
          </div>
        </div>
        <div
          class="hidden text-sm pb-1"
          :class="{ loadingStateClass: searchStore.loadingState }"
        >
          loading
        </div>
        <div class="flex justify-between items-center pb-5">
          <div
            class="font-titillium text-center text-3xl"
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            R{{ props.package.price }}
          </div>
          <div class="">
            <div
              class="font-open-sans text-sm flex justify-start"
              :class="{ loadingStateClass: searchStore.loadingState }"
            >
              <div class="w-[100px] font-bold text-right pr-2">departs</div>
              <div>{{ props.package.from }}</div>
            </div>
            <div
              class="font-open-sans text-sm flex justify-start"
              :class="{ loadingStateClass: searchStore.loadingState }"
            >
              <div class="w-[100px] font-bold text-right pr-2">book before</div>
              <div>{{ props.package.valid_to }}</div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="
              underline
              text-base
              leading-
              text-gray-700
              decoration-gray-300
              hover:text-lime-500
            "
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            read more
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  package: Object,
});

import { useStore } from "@/stores/search";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const searchStore = useStore();
const route = useRoute();

let text = props.package.title;

let cutTextTitle = text.substring(0, 30);
let lastWord = cutTextTitle.split(" ").pop(-1);
let cutTitle = cutTextTitle.slice(0, cutTextTitle.length - lastWord.length);
if (cutTitle[cutTitle.length - 1] == "-") {
  cutTitle.pop();
}
let titleFirstBit = text.split(" - ")[0];

let stars = [];
for (let i = 0; i < props.package.star_rating; i++) {
  stars.push(1);
}

onMounted(() => {
  // console.log(props.package);
});
</script>

<style scoped>
.loadingStateClass {
  transition: color;
  background: linear-gradient(-45deg, #ffffff, #808080, #aaaaaa, #ffffff);
  background-size: 1000% 1000%;
  animation: gradient 15s ease infinite;
  border-radius: 8px;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
    color: #b7b7b700;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
    color: black;
  }
}
</style>