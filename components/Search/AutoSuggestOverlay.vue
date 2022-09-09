<template>
  <div
    class="
      absolute
      inset-0
      bg-gray-400
      flex
      justify-center
      items-start
      pt-[170px]
      md:pt-[110px]
      px-20
    "
    v-if="suggestStore.showSuggestions"
  >
    <div
      class="
        rounded-lala
        bg-gray-200
        px-5
        pt-10
        pb-5
        opacity-100
        flex flex-col
        gap-5
      "
    >
      <!-- destinations -->
      <div class="font-semibold ml-10">destinations:</div>
      <div class="ml-10 py-5">
        <div class="flex flex-wrap gap-5">
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
            @click="suggestStore.searchDestination(item.name)"
          >
            <IconSearch class="h-4 text-black" />
            <div class="">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <!-- packages -->
      <div class="font-semibold ml-10">packages:</div>
      <div class="w-full">
        <div
          v-for="(suggestion, index) in suggestStore.packageSuggestions"
          :class="{
            ' !bg-opacity-90  bg-lime-600 text-lime-200':
              index === selectedSuggestion,
          }"
          :key="index"
          class=""
        >
          <div
            class="grid grid-cols-[auto,200px] rounded-lala"
            :class="{
              '!bg-lime-500 !bg-opacity-80 !text-white':
                index === hoveredSuggestion - 1,
            }"
            v-on:mouseover="mouseOver(index)"
            @mouseleave="mouseLeave"
            @mousedown="
              suggestStore.viewPackage(suggestion.slug, suggestion.supplier_ref)
            "
          >
            <div class="">
              <div
                class="
                  pl-10
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
                justify-end
                items-center
                h-full
                text-lime-700
                items-center
                font-medium
                pr-20
                text-end
                w-full
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