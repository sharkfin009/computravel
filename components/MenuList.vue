<template>
  <div class="relative">
    <div
      v-show="state"
      class="
        absolute
        -top-1
        md:-left-3
        cursor-pointer
        z-10
        bg-gray-200
        px-2
        py-2
        rounded-xl
        shadow-xl
        w-[220px]
        md:w-[180px] md:text-sm
      "
    >
      <div class="absolute right-2 top-2">
        <IconClose
          class="md:hidden w-4 transition hover:rotate-180"
          @mousedown="state = false"
        />
      </div>
      <div v-for="(item, index) in list" :key="index">
        <button
          @click="fireSearch(item)"
          class="
            hover:bg-lime-500 hover:text-lime-50
            block
            px-2
            rounded-xl
            transition
            bg-gray-200
          "
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  list: {
    type: Array,
  },
  state: {
    type: Boolean,
  },
  type: {
    type: String,
  },
});
import { useStore } from "@/stores/search";
const searchStore = useStore();
import { useSearchDestination } from "@/stores/searchDestinationInput";
const destinationInputStore = useSearchDestination();
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();
const fireSearch = (item) => {
  globalStore.showMenu = false;
  //   for region,country , province or city:
  if (props.type !== "category") {
    destinationInputStore.queryString = item;
    searchStore.destinationType = props.type;
    searchStore.findQuery = item;
  } else {
    searchStore.category = item;
  }

  searchStore.fireQuery();
  const route = useRoute();

  if (route.path != "/search") {
    navigateTo({
      path: "/search",
    });
  }
};
</script>