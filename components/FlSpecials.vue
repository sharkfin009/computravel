<template>
  <HomeSectionLayout bgColor="">
    <div class="text-black flex flex-col justify-around">
      <div>
        <SectionHeading
          heading="latest flight specials"
          subheading="fly somewhere new"
          :inverted="true"
        />
        <div class="w-full flex justify-center mb-10">
          <div
            class="
              lg:min-w-[800px]
              overflow-auto
              text-sm
              lg:text-base
              shadow-xl
              rounded-3xl
              overflow-hidden
            "
          >
            <FlightsTable />
          </div>
        </div>
      </div>
    </div>
    <NuxtLink to="/flight-bookings">
      <div class="flex justify-center">
        <CompuButton class="bg-black"> view all flights </CompuButton>
      </div>
    </NuxtLink>
  </HomeSectionLayout>
</template>

