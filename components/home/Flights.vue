<template>
  <div
    class="
      bg-green-avo
      text-black
      flex flex-col
      justify-around
      px-10
      md:px-[80px]
      pt-20
      md:pt-40 
      pb-10
      md:pb-20
    "
  >
    <div>
      <h3 class="text-4xl font-medium">fly somewhere new & exciting</h3>
      <h2 class="text-5xl font-titillium font-semibold mb-20">
        latest flight specials
      </h2>
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
          <table class="w-full font-open-sans font-extralight">
            <tbody class="overflow-auto">
              <tr v-for="(special, index) in specials" :key="index">
                <td class="">{{ special.flight_route }}</td>
                <td class="">
                  {{ special.price_from }}
                </td>
                <td class="flex justify-center">
                  <BookButton class="!px-5 !py-3">
                    book <span class="hidden sm:inline">with our expert</span>
                  </BookButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <BlackButton class=""> view all flights </BlackButton>
    </div>
  </div>
</template>

<script setup>
const specials = [
  {
    flight_route: "Johannesburg to Istanbul",
    airline: "Turkish Airlines",
    trip_type: "Return",
    price_from: "R5429",
  },
  {
    flight_route: "Johannesburg to Dubai",
    airline: "Qatar Airlines",
    trip_type: "Return",
    price_from: "R5419",
  },
  {
    flight_route: "Cape Town to London",
    airline: "KLM Airlines",
    trip_type: "Return",
    price_from: "R8239",
  },
  {
    flight_route: "Johannesburg to London",
    airline: "KLM Airlines",
    trip_type: "Return",
    price_from: "R7739",
  },
  {
    flight_route: "Johannesburg to Amsterdam",
    airline: "Qatar Airlines",
    trip_type: "Return",
    price_from: "R6899",
  },

];
</script>