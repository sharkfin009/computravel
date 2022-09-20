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
            <table class="w-full font-open-sans font-extralight">
              <tbody class="overflow-auto">
                <tr
                  v-for="(special, index) in data.data.flightSpecials.data"
                  :key="index"
                >
                  <td class="">
                    {{ special.attributes.from }} to {{ special.attributes.to }}
                  </td>
                  <td class="">
                    {{ special.attributes.price }}
                  </td>
                  <td class="flex justify-center items-center py-5">
                    <NuxtLink to="flight-enquire-form">
                      <CompuButton class="bg-lime-500">
                        <span class="hidden md:inline"
                          >book with our experts</span
                        >
                        <span class="inline md:hidden">book </span>
                      </CompuButton>
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <CompuButton class="bg-black"> view all flights </CompuButton>
      </div>
    </div>
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