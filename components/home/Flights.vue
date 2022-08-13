<template>
  <div class="bg-gray-300 text-black flex flex-col justify-around p-10 lg:p-20">
    <div>
      <h3 class="text-3xl font-medium">fly somewhere new & exciting</h3>
      <h2 class="text-5xl font-titillium font-semibold mb-20">
        latest flight specials
      </h2>
      <div class="w-full overflow-auto text-sm lg:text-base">
        <table
          class="
            w-full
            font-open-sans font-extralight
            rounded-3xl
            overflow-hidden
          "
        >
          <tbody class="overflow-auto">
            <tr v-for="(special, index) in specials" :key="index">
              <td class="">{{ special.flight_route }}</td>
              <td class="hidden xl:table-cell">{{ special.airline }}</td>
              <td class="hidden xl:table-cell">{{ special.trip_type }}</td>
              <td class="">
                {{ special.price_from }}
              </td>
              <td class="flex justify-center">
                <BookButton class=" ">
                  book <span class="hidden sm:inline">with our expert</span>
                </BookButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rounded-xl overflow-hidden mb-20"></div>
    </div>
    <div class="flex justify-center">
      <BlackButton class="mx-20"> view flights </BlackButton>
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
  {
    flight_route: "Johannesburg to New York",
    airline: "Virgin Atlantic",
    trip_type: "Return",
    price_from: "R9399",
  },
  {
    flight_route: "Johannesburg to Hong Kong",
    airline: "Emirates Airlines",
    trip_type: "Return",
    price_from: "R9679",
  },
];
</script>