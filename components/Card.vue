<template>
  <NuxtLink
    :to="`/package/${props.package.slug}_ref=${props.package.supplier_ref}`"
  >
    <div class="w-[320px] h-[400px] grid grid-rows-2">
      <div>
        <div
          class="
            relative
            h-full
            flex
            items-end
            bg-gray-100
            rounded-lala-t
            shadow
          "
          :style="{
            backgroundImage: `url(${images[0]})`,
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
      <div
        class="
          px-8
          py-3
          bg-white
          flex flex-col
          justify-evenly
          rounded-lala-b
          shadow
        "
      >
        <div class="w-full font-titillium font-semibold text-xl">
          <h3 class="text-center mb-3">{{ cutTextTitle }}</h3>
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
            v-if="props.package.region"
            class="text-center text-sm font-extralight mr-1"
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            {{ props.package.region }},
          </div>
          <!-- <div v-if="JSON.parse(props.package.countries)!==null" class="text-center text-sm font-extralight pb-5">{{JSON.parse(props.package.countries)[0].name.toUpperCase()}}</div> -->
          <div
            v-if="props.package.destination"
            class="text-center text-sm font-extralight pb-1"
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            {{ props.package.destination }}
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
  package: {
    type: Object,
  },

  moreLikeThis: {
    type: Boolean,
  },
});

import { useStore } from "@/stores/search";
let imageUrls =
  props.package.image_urls !== null ? props.package.image_urls : [];
// console.log(imageUrls);
let images = [
  ...imageUrls,
  ...props.package.uploaded_images.data.map((item) => item.attributes.url),
];

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

let titleFirstBit = text.split(" - ")[0];

let cutTextTitle = titleFirstBit.substring(0, 150);
// cutTextTitle = cutTextTitle.split(" ").pop(-1);

if (cutTextTitle.charAt(1) == "*") {
  console.log(cutTextTitle);
  cutTextTitle = cutTextTitle.substring(2);
}

let stars = [];
for (let i = 0; i < props.package.star_rating; i++) {
  stars.push(1);
}

onMounted(() => {
  // console.log(props.package);
});
</script>



