<template>
  <div
    class="
      cursor-pointer
      px-5
      py-4
      bg-green-avo
      shadow
      hover:shadow-none
      rounded-full
    "
  >
    <div class="flex items-center gap-2">
      <SearchFindInput :parent="props.parent" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  parent: String,
});
import { useStore } from "@/stores/search";

const searchStore = useStore();

const selectInput = (input) => {
  searchStore.activeInput = input;
};

const selectOption = (args) => {
  searchStore[args[0]] = args[1];
  searchStore.fireQuery();
  navigateTo({
    path: "/search",
  });
};

const go = () => {
  navigateTo({
    path: "/search",
  });
};
</script>