<template>
  <div class="relative bg-light-200 font-open-sans w-screen">
    <Header />
    <div class="px-10 md:px-14 bg-slate-50 pb-10 md:pb-14">
      <slot />
    </div>
    <Footer />
    <!-- <div class="absolute inset-0 bg-blue-400" /> -->
    <SearchAutoSuggestOverlay />
  </div>
</template>

