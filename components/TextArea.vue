<template>
  <div class="relative">
    <div class="h-full flex flex-col justify-between mb-5">
      <label v-if="validationObject" class="tracking-wide mb-5 md:mb-5"
        >{{ label }}
      </label>
      <textarea
        class="w-full rounded-xl bg-white input-outline p-4 hover:shadow-none"
        :id="inputName"
        :name="inputName"
        @input="setValue"
        rows="3"
        cols=""
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
        left-[40%]
        top-[0%]
        font-medium
        flex
        items-center
        w-full
        animate__animated animate__headShake
        text-xl text-left text-red-700
      "
    >
      <div class="">
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
