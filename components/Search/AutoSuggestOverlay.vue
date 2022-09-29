<template>
  <div
    class="absolute inset-0 flex justify-center items-start z-50 bg-blue-100"
    v-if="
      suggestStore.showSuggestions &&
      suggestStore.destinationSuggestions.length &&
      suggestStore.queryString.length
    "
  >
    <div
      class="
        rounded-3xl
        bg-gray-100
        px-0
        md:px-5 md:pt-10 md:pb-5
        opacity-100
        flex flex-col
        gap-5
        max-w-[900px]
        cursor-pointer
      "
    >
      <!-- destinations -->
      <div
        class="
          hidden
          md:block
          text-3xl
          font-semibold font-titillium
          tracking-wide
          md:ml-10
        "
      >
        destinations:
      </div>
      <div class="m-0 px-5 py-5">
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
            "
            @click="suggestStore.searchDestination(item)"
            :class="{
              ' !bg-opacity-90  bg-lime-600 text-lime-200':
                index === suggestStore.selectedSuggestion,
            }"
          >
            <IconSearch class="h-4 text-black" />
            <div class="">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <!-- packages -->
      <div
        class="
          hidden
          md:block
          font-semibold font-titillium
          tracking-wide
          text-3xl
          ml-10
        "
      >
        packages:
      </div>
      <div class="md:block w-full">
        <div
          v-for="(suggestion, index) in suggestStore.packageSuggestions"
          :key="index"
          class=""
          @click="
            suggestStore.viewPackage(suggestion.slug, suggestion.supplier_ref)
          "
        >
          <div
            class="rounded-lala px-10 py-6"
            v-on:mouseover="mouseOver(index)"
            :class="{
              '!bg-lime-500 !bg-opacity-80 !text-white':
                index === hoveredSuggestion - 1,
            }"
          >
            <div
              class="grid grid-cols-[auto,100px] mb-2 gap-2"
              @mouseleave="mouseLeave"
            >
              <div class="">
                <div
                  class="w-full rounded-l-full cursor-pointer transition-colors"
                >
                  <div
                    class="font-semibold text-lime-600"
                    :class="{
                      ' !text-lime-200': index === hoveredSuggestion - 1,
                    }"
                  >
                    {{ suggestion.titleShort }}
                  </div>
                </div>
              </div>
              <div
                class="
                  h-full
                  text-lime-700
                  items-center
                  font-medium
                  text-end
                  w-full
                "
                :class="{
                  ' !text-lime-200': index === hoveredSuggestion - 1,
                  '  !text-lime-200': index === suggestStore.selectedSuggestion,
                }"
              >
                {{ suggestion.destination }}
              </div>
            </div>
            <div class="flex md:grid md:grid-cols-[auto,100px]">
              <div class="font-light">
                {{ suggestion.description }}
              </div>
              <div />
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
const test = () => {
  suggestStore.showSuggestions = false;
  navigateTo({
    path: "/blog-archive",
  });
};
</script>
<style scoped>
</style>