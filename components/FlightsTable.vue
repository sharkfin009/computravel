<template>
  <table v-if="data" class="w-full font-open-sans font-extralight">
    <tbody class="overflow-auto">
      <tr
        v-for="(special, index) in data.data.flightSpecials.data"
        :key="index"
      >
        <td class="">
          {{ special.attributes.name }}
        </td>
        <td class="hidden lg:block">
          {{
            new Date(special.attributes.valid_from).toLocaleDateString(
              "eng-GB",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )
          }}
          -
          {{
            new Date(special.attributes.valid_to).toLocaleDateString("eng-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }}
        </td>
        <td>R{{ special.attributes.price }}</td>
        <td class="flex justify-center items-center py-5">
          <NuxtLink
            :to="`/flight-booking-form/${special.attributes.reference}`"
          >
            <CompuButton class="bg-lime-500">
              <span class="inline md:hidden">view </span>
            </CompuButton>
          </NuxtLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useGraph } from "@/composables/useGraph";

const { data, error } = useGraph(`
query{
  flightSpecials{
    data{
      attributes{
        departing_airport
        destination_airport
        valid_from
        valid_to
        price
        reference
        name
      }
    }
  } 
}
`);
</script>