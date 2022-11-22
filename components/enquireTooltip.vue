<template>
  <div
    class="
      absolute
      bottom-0
      w-full
      flex
      items-center
      justify-center
      pointer-events-none
      z-50
    "
  >
    <div
      class="
        translate-y-[130%]
        md:translate-y-[110%]
        bg-white
        p-2
        text-xs text-center
        rounded-xl
        shadow-xl
        text-black
      "
    >
      <slot />
      <div class="absolute inset-0 flex items-center justify-center">
        <i
          class="fa fa-long-arrow-up text-gray-500 -translate-y-15"
          aria-hidden="true"
        ></i>
      </div>
    </div>
  </div>
</template>