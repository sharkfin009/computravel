<template>
  <HomeSectionLayout bgColor="bg-stone-50">
    <div
      class="
        grid grid-rows-[min-content,auto,min-content]
        md:p-20
        p-10
        md:px-[80px]
        py-20
        md:py-40
        bg-stone-50
      "
    >
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
            "
          ></div>
        </div>
        <div
          class="
            w-full
            grid grid-cols-[20px,auto,20px]
            md:grid-cols-[50px,auto,50px]
            lg:grid-cols-[300px,auto,300px]
          "
        >
          <div class="flex items-center justify-center">
            <IconChevronLeft
              class="cursor-pointer hover:scale-110"
              @click="scrollLeft"
            />
          </div>
          <div
            class="
              relative
              text-xl
              sm:text-3xl
              italic
              leading-6
              font-light
              flex
              text-center
              px-10
            "
          >
            "We had a fantastic time and made lifetime memories. J Ubud is a
            must as the hotel was the best I've stayed at. Once again, thanks
            for your terrific assistance."
          </div>
          <div class="flex items-center justify-center">
            <IconChevronRight
              class="cursor-pointer hover:scale-110"
              @click="scrollRight"
            />
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
            mb-5
          "
        >
          Join us on social media
        </div>
        <div class="flex justify-center gap-20">
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