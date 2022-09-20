<template>
  <HomeSectionLayout v-if="data" bgColor="bg-green-avo">
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

<script setup>
import { useGraph } from "@/composables/useGraph";

const { data, error } = useGraph(`
query{
  flightSpecials{
    data{
      attributes{
        from
        to
        price
        airline
        trip_type
        date
        reference
      }
    }
  }
}
`);
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