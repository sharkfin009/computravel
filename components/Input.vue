<template>
  <div class="relative">
    <div class="h-full flex flex-col justify-between mb-5 md:mb-0">
      <label v-if="validationObject" class="tracking-wide mb-5"
        >{{ label }}
      </label>
      <input
        autocomplete="off"
        :id="inputName"
        :name="inputName"
        @input="setValue"
        class="w-full rounded-xl bg-white input-outline p-4 hover:shadow-none"
        :type="type"
        :class="{
          greenClass:
            validationObject.$error === false &&
            validationObject.$anyDirty === true,
          redClass: validationObject.$error === true,
        }"
        :placeholder="placeholder"
        v-model="inputValue"
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
        text-xs text-left text-red-900
      "
    >
      <div class="text-red-900">
        {{ errorMessage }}
      </div>
    </div>
    <slot />
  </div>
</template>
<script setup>
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
const inputValue = ref("");

watch(
  () => inputValue.value,
  (a, b) => {
    emit("setValue", props.inputName, inputValue.value);
  }
);
</script>
