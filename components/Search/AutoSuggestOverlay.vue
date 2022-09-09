<template>
  <div
    class="
      absolute
      inset-0
      bg-black bg-opacity-40
      flex
      justify-center
      items-start
      pt-[180px]
      px-20
    "
    v-if="suggestStore.showSuggestions"
  >
    <div class="rounded-lala bg-gray-200 p-10 opacity-100 flex flex-col gap-5">
      <div class="font-semibold ml-20">destinations:</div>
      <div class="ml-20">
        <div class="flex gap-2">
          <div
            v-for="(item, index) in suggestStore.destinationSuggestions"
            :key="index"
            class="
              flex
              items-center
              bg-slate-50
              rounded-xl
              pl-1
              pr-4
              py-1
              text-lime-700
              hover:bg-lime-500 hover:text-lime-200
              cursor-pointer
            "
            @mousedown="suggestStore.searchDestination(item.name)"
          >
            <IconSearch class="h-4 text-black" />
            <div class="">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="font-semibold ml-20">packages:</div>
      <div class="w-full">
        <div
          v-for="(suggestion, index) in suggestStore.packageSuggestions"
          :class="{
            ' !bg-opacity-90  rounded-3xl bg-lime-600 text-lime-200':
              index === selectedSuggestion,
          }"
          :key="index"
          class=""
        >
          <div
            class="grid grid-cols-[auto,200px] rounded-full"
            :class="{
              '!bg-lime-500 !bg-opacity-80 !text-white':
                index === hoveredSuggestion - 1,
            }"
            v-on:mouseover="mouseOver(index)"
            @mouseleave="mouseLeave"
            @mousedown="viewPackage(suggestion.slug, suggestion.supplier_ref)"
          >
            <div class="">
              <div
                class="
                  pl-20
                  py-6
                  w-full
                  rounded-l-full
                  cursor-pointer
                  transition-colors
                "
              >
                <div
                  class="font-semibold mb-3 text-lime-700"
                  :class="{
                    ' !text-lime-200': index === hoveredSuggestion - 1,
                    ' text-lime-200': index === selectedSuggestion,
                  }"
                >
                  {{ suggestion.titleShort }}
                </div>

                <div class="font-light">
                  {{ suggestion.description }}
                </div>
              </div>
            </div>
            <div
              class="
                flex
                text-lime-700
                items-center
                justify-end
                font-medium
                pr-20
              "
              :class="{
                ' !text-lime-200': index === hoveredSuggestion - 1,
                '  !text-lime-200': index === selectedSuggestion,
              }"
            >
              {{ suggestion.destination }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useFindSuggestStore } from "@/stores/findSuggest";
const suggestStore = useFindSuggestStore();
const route = useRoute();
const props = defineProps({
  parent: String,
});
const showFindSuggestions = ref(false);

const findInput = ref(null);
const wrapperClass = ref("");

const hoveredSuggestion = ref(0);

const mouseOver = (index) => {
  hoveredSuggestion.value = index + 1;
};

const mouseLeave = () => {
  hoveredSuggestion.value = null;
};
</script>
<style scoped>
</style>