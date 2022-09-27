<template>
  <div class="h-full flex flex-col items-between justify-between mb-5">
    <label class="pb-1 mb-0 md:mb-5">{{ label }}</label>
    <v-select
      :options="options"
      v-model="inputValue"
      class="
        bg-white
        rounded-xl
        select-padding
        input-outline
        hover:shadow-none
        font-medium font-open-sans
      "
      :placeholder="placeholder"
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
  inputName: {
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

const inputValue = ref(null);
const emit = defineEmits(["setValue"]);
watch(
  () => inputValue.value,
  (a, b) => {
    emit("setValue", props.inputName, inputValue.value);
  }
);
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

.select-padding {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  padding-left: 11px !important;
  padding-right: 1px !important;
}
.vs__search::placeholder {
  color: #9ca6c1;
  font-size: 17px;
}
</style>