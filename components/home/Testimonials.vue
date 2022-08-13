<template>
  <div
    class="
      bg-green-avo
      md:h-screen
      grid 
      grid-rows-[min-content,auto,min-content]
     
      md:p-20
      p-10
    "
  >
    <!-- header section -->
    <div class="flex flex-col justify-center">
      <div class="text-5xl font-titillium font-semibold mb-5">
        Every holiday has a highlight
      </div>
      <div class="text-2xl font-medium mr-20">
        What our travellers say about their experiences with our expert travel
        consultants:
      </div>
    </div>
    <!-- body section -->
    <div class="relative flex justify-center items-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-none">
      <div class="absolute w-full lg:px-20">
        <div
          class="
            w-[200px]
            h-[200px]
            md:w-[410px]
            md:h-[410px] 

            bg-lime-300
            opacity-50
            rounded-3xl
          "
        ></div>
      </div>

      <div class="relative text-xl sm:text-4xl md:text-5xl  italic font-light flex justify-center px-10 lg:w-[60vw]">
        "We had a fantastic time and made lifetime memories. J Ubud is a must as
        the hotel was the best I've stayed at. Once again, thanks for your
        terrific assistance."
      </div>
    </div>
    <!-- footer section -->
    <div class="">
      <div class="text-xl md:text-5xl font-titillium font-semibold text-center mb-5">
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
</template>