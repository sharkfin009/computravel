<template>
  <div class="h-full flex flex-col justify-between h:none md:h-[50px]">
    <label class="mb-5">{{ label }}</label>
    <v-select
      :options="options"
      v-model="searchStore[type]"
      class="bg-white rounded-xl select-padding input-outline hover:shadow-none"
      :placeholder="placeholder"
      @option:selected="inputChange()"
    >
      <template v-slot:option="option">
        <div
          class="
            flex
            items-center
            bg-light-300
            py-2
            px-3
            hover:!bg-lime-500 hover:text-white
            border-none
          "
        >
          {{ option.label }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script setup>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const props = defineProps({
  label: {
    type: String,
  },
  type: {
    type: String,
  },
  options: {
    type: Array,
  },
  placeholder: {
    type: String,
  },
  errorMesssage: {
    type: String,
  },
  validationObject: {
    type: Object,
  },
});
import { useStore } from "@/stores/search";
const searchStore = useStore();
const value = ref();
const inputChange = () => {
  searchStore.findQuery = searchStore[props.type];
  searchStore.destinationType = props.type;
  searchStore.fireQuery();
};
</script>

<style >
* {
  --vs-controls-color: #5c5f59;
  --vs-border-color: #e6eeea00;

  --vs-dropdown-bg: #f5f5f4;
  --vs-dropdown-color: black;
  --vs-dropdown-option-color: black;

  /* --vs-selected-bg: #664cc3; */
  --vs-selected-color: black;

  --vs-search-input-color: black;

  --vs-dropdown-option--active-bg: #ecfccb !important;
  --vs-dropdown-option--active-color: black;
}
.vs__dropdown-option {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.vs__dropdown-menu {
  margin-top: 10px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  border-width: 1px !important;
  border-color: rgba(176, 175, 175, 0.706) !important;
  border-radius: 10px !important;
}
vs__dropdown-toggle {
  padding: 0 !important;
}
vs__selected {
  padding: 0 !important;
  margin: 0 !important;
}
/* .select-padding {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  padding-left: 11px !important;
  padding-right: 1px !important;
} */
</style>