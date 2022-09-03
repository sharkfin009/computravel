<template>
  <div
    class="
      p-2
      md-p-1
      rounded-l-xl
      hover:-translate-x-[0%]
      translate-x-[66%]
      md:translate-x-[58%]
      transition
      flex
      gap-4
      items-center
      cursor-pointer
    "
  >
    <slot />
    <div class="text-xs md-text-lg">share</div>
  </div>
</template>