<template>
  <div
    class="
      p-1
      md:p-3
      rounded-l-xl
      hover:-translate-x-[0%]
      translate-x-[66%]
      md:translate-x-[58%]
      transition
      flex
      items-center
      cursor-pointer
    "
  >
    <slot />
    <div class="ml-1 md:ml-5 text-xs md-text-lg">share</div>
  </div>
</template>