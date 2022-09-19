<template>
  <HomeSectionLayout bgColor="bg-stone-50">
    <div class="grid grid-rows-[min-content,auto,min-content] bg-stone-50">
      <!-- header section -->
      <SectionHeading
        heading="every holiday has a highlight"
        subheading="what our travellers say"
        :inverted="false"
      />
      <!-- body section -->
      <div
        class="
          relative
          flex
          justify-center
          items-center
          h-[200px]
          sm:h-[400px]
          md:h-[500px]
          lg:h-none
        "
        v-if="data"
      >
        <div class="absolute inset-0 flex justify-center items-center lg:px-20">
          <div
            class="
              w-[180px]
              h-[180px]
              sm:w-[310px] sm:h-[310px]
              bg-lime-300
              opacity-50
              rounded-lala
              pointer-events-none
            "
          ></div>
        </div>
        <div
          class="
            w-full
            grid grid-cols-[20px,auto,20px]
            md:grid-cols-[50px,auto,50px]
            lg:grid-cols-[300px,auto,300px]
            h-full
          "
        >
          <div
            class="
              flex
              items-center
              justify-center
              cursor-pointer
              hover:scale-110
              pointer-events-auto
              z-50
            "
          >
            <IconChevronLeft class="" @click="scrollLeft" />
          </div>
          <div
            class="
              relative
              text-xl
              sm:text-3xl
              italic
              leading-6
              font-light
              text-center
              px-10
            "
          >
            <div
              v-for="(item, index) in data.data.testimonials.data"
              :key="index"
              class="
                absolute
                inset-0
                opacity-0
                transition
                duration-700
                flex
                items-center
              "
              :class="{ '!opacity-100': index == pointer }"
            >
              <div v-html="item.attributes.copy" />
            </div>
          </div>
          <div
            class="
              flex
              items-center
              justify-center
              cursor-pointer
              hover:scale-110
              z-50
            "
          >
            <IconChevronRight class="" @click="scrollRight" />
          </div>
        </div>
      </div>
      <!-- footer section -->
      <div class="">
        <div
          class="
            text-xl
            md:text-4xl
            font-titillium font-semibold
            text-center
            my-10
            md:mb-5
          "
        >
          Join us on social media
        </div>
        <div class="flex justify-center gap-20 mb-10">
          <IconFacebook
            class="hover:scale-150 transition-transform ease-out duration-500"
          />
          <IconInstagram
            class="hover:scale-150 transition-transform ease-out duration-500"
          />
          <IconLinkedin
            class="hover:scale-150 transition-transform ease-out duration-500"
          />
        </div>
      </div>
    </div>
  </HomeSectionLayout>
</template>
<script setup>
import { useGraph } from "@/composables/useGraph";
let pointer = ref(0);
const { data, error } = useGraph(`query{
  testimonials{
    data{
      attributes{
        copy
        name
        }}}}
        `);
const scrollLeft = () => {
  if (pointer.value > 0) {
    pointer.value--;
  }
};
const scrollRight = () => {
  if (pointer.value < data.value.data.testimonials.data.length - 1) {
    pointer.value++;
  }
};
</script>