<template>
  <div class="relative">
    <div class="h-full flex flex-col justify-between" >
    <label
      v-if="validationObject"
      class=" tracking-wide"
      >{{ label }}
    </label>
    <input
      autocomplete="off"
      :id="inputName"
      :name="inputName"
      @input="setValue"
      class=" w-full rounded-xl bg-white input-outline p-4 shadow-xl hover:shadow-none"
      :type="type"
      :class="{
        greenClass:
          validationObject.$error === false &&
          validationObject.$anyDirty === true,
        redClass: validationObject.$error === true,
      }"
      :placeholder="placeholder"
      v-model="searchStore[inputName]"
      @blur="validationObject.$touch"
    />
    </div>
    <slot />

    <div
      v-show="validationObject.$error"
      class="
        absolute
        left-[80%]
        top-[10%]
        flex
        items-center
        w-full
        animate__animated animate__headShake
        text-xs text-left
        text-red-900
      "
    >
      <div class="text-red-900">
        {{ errorMessage }}
      </div>
    </div>
    <slot/>
  </div>
</template>
<script setup>
import { useStore } from "@/stores/search"
const searchStore = useStore()
const props = defineProps({
  inputName: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
  },
  validationObject: {
    type: Object,
  },

  placeholder: {
    type: String,
  },
});
const emit = defineEmits(["setValue"]);

watch(
  () => searchStore[props.inputName],
  (a, b) => {
    searchStore.fireQuery();
  }
);
</script>
