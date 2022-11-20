<template>
  <div
    class="absolute left-0 w-full h-full flex items-center pointer-events-none"
  >
    <div
      class="
        -translate-x-[120%]
        bg-white
        p-2
        text-xs text-center
        rounded-xl
        shadow
      "
    >
      <slot />
      <div
        class="absolute right-0 top-0 h-full flex items-center justify-center"
      >
        <i
          class="fa fa-long-arrow-right text-gray-400 translate-x-6"
          aria-hidden="true"
        ></i>
      </div>
    </div>
  </div>
</template>