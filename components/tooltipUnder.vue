<template>
  <div class="absolute bottom-0 w-full flex items-center pointer-events-none">
    <div
      class="
        translate-y-[110%]
        bg-white
        p-2
        text-xs text-center
        rounded-xl
        shadow
        text-black
      "
    >
      <slot />
      <div class="absolute inset-0 flex items-center justify-center">
        <i
          class="fa fa-long-arrow-up text-gray-500 -translate-y-16"
          aria-hidden="true"
        ></i>
      </div>
    </div>
  </div>
</template>