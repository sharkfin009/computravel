<template>
  <div class="relative">
    <div v-show="state" class="absolute inset-0 cursor-pointer z-10">
      <div v-for="(item, index) in list" :key="index">
        <button
          @click="fireSearch(item)"
          class="
            hover:bg-lime-500 hover:text-lime-50
            block
            px-2
            rounded-xl
            transition
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
const fireSearch = (item) => {
  searchStore.destinationType = props.type;
  destinationInputStore.queryString = item;
  searchStore.destinationQuery = item;
  searchStore.fireQuery();
  const route = useRoute();

  if (route.path != "/search") {
    navigateTo({
      path: "/search",
    });
  }
};
</script>