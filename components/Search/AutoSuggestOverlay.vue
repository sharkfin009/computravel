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
    <div
      class="rounded-lala bg-gray-200 p-10 opacity-100 grid grid-cols-[3fr,1fr]"
    >
      <div class="hidden md:block w-full">
        <div class="font-medium pl-20 pb-2">packages:</div>
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
            class="block md:grid md:grid-cols-[auto,200px] rounded-full"
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
                  class="hidden lg:block font-semibold mb-3 text-lime-700"
                  :class="{
                    ' !text-lime-200': index === hoveredSuggestion - 1,
                    ' text-lime-200': index === selectedSuggestion,
                  }"
                >
                  {{ suggestion.titleShort }}
                </div>

                <div class="hidden lg:block font-light">
                  {{ suggestion.description }}
                </div>
              </div>
            </div>
            <div
              class="
                hidden
                lg:flex
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

      <div class="hidden md:block pl-3">
        <div class="pb-2 font-medium">destinations:</div>
        <div class="grid ld:grid-cols-2 gap-2">
          <div
            v-for="(item, index) in suggestStore.destinationSuggestions"
            :key="index"
            class="
              flex
              items-center
              bg-slate-50
              rounded-full
              p-1
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
      <!-- mobile: -->
      <div class="block md:hidden p-2 h-[250px] overflow-auto">
        <div class="mb-2">related searches:</div>
        <div class="grid gap-2">
          <div
            v-for="(item, index) in suggestStore.destinationSuggestions"
            :key="index"
            class="
              flex
              items-center
              bg-slate-50
              rounded-full
              p-1
              hover:bg-lime-500 hover:text-lime-200
            "
            @mousedown="searchDestination(item.name)"
          >
            <IconSearch class="h-4" />
            <div class="">{{ item.name }}</div>
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