<template>
  <div class="relative">
    <div class="h-full flex flex-col justify-between mb-5 md:mb-0">
      <label v-if="validationObject" class="tracking-wide mb-5"
        >{{ label }}
      </label>
      <div class="relative">
        <div class="absolute pointer-events-none flex justify-center w-full">
          <div
            v-show="validationObject.$error"
            class="
              -translate-y-8
              font-medium
              flex
              items-center
              animate__animated animate__headShake
              text-xl text-left text-red-700
              bg-stone-50
              shadow
              rounded-2xl
              p-4
              border
            "
          >
            <div>
              {{ errorMessage }}
            </div>
          </div>
        </div>
        <input
          autocomplete="off"
          :id="inputName"
          :name="inputName"
          @input="setValue"
          class="
            w-full
            rounded-xl
            bg-white
            input-outline
            p-4
            hover:shadow-none
            cursor-pointer
          "
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
    </div>
    <slot />

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
