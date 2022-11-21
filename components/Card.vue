<template>
  <NuxtLink
    :to="`/packages/${props.package.supplier_ref}/${props.package.slug}`"
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
            overflow-hidden
            shadow
          "
        >
          <div
            v-if="props.package.category.data"
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
              z-10
            "
          >
            {{ props.package.category.data.attributes.name }}
          </div>
          <img
            v-if="image"
            class="absolute inset-0"
            :src="image.url"
            :alt="image.alt"
          />
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
            v-if="props.package.destination"
            class="text-center text-sm font-extralight pb-1"
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            {{ props.package.destination }},&nbsp;
          </div>
          <div
            v-if="props.package.region"
            class="text-center text-sm font-extralight mr-1"
            :class="{ loadingStateClass: searchStore.loadingState }"
          >
            {{ props.package.region }}
          </div>
          <!-- <div v-if="JSON.parse(props.package.countries)!==null" class="text-center text-sm font-extralight pb-5">{{JSON.parse(props.package.countries)[0].name.toUpperCase()}}</div> -->
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
// console.log(props.package.images.data[0].attributes.url)
let image = null;
if (props.package.images.data.length) {
  image = {
    url: props.package.images.data[0].attributes.url,
    alt: props.package.images.data[0].attributes.alternativeText,
  };
}

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
  cutTextTitle = cutTextTitle.substring(2);
}
cutTextTitle = cutTextTitle.replace(/[()0-9]/g, "");
if (cutTextTitle.length > 50) {
  cutTextTitle = cutTextTitle.slice(0, 50);
  cutTextTitle = cutTextTitle.split(" ");
  cutTextTitle.splice(-3, 1);
  cutTextTitle = cutTextTitle.join(" ");
}

let stars = [];
for (let i = 0; i < props.package.star_rating; i++) {
  stars.push(1);
}

onMounted(() => {
  // console.log(props.package);
});
</script>



