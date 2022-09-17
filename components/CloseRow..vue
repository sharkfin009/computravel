<template>
  <div class="absolute w-full flex justify-end p-5 md:p-12">
    <IconClose
      class="
        h-7
        text-black
        cursor-pointer
        transform
        transition
        hover:rotate-180
      "
      @mousedown="closeModal"
    />
  </div>
</template>
<script setup>
const emit = defineEmits("closeModal");

const closeModal = () => {
  emit("closeModal");
};
</script>