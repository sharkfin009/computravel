<template>
  <div
    class="
      w-screen
      h-screen
      fixed
      inset-0
      flex
      justify-center
      items-center
      bg-green-avo
    "
  >
    <div
      class="
        w-[90vw]
        h-[70vh]
        bg-slate-50
        rounded-3xl
        py-20
        px-5
        flex flex-col
        items-center
      "
    >
      <div
        class="
          flex
          justify-between
          px-10
          w-full
          items-center
          mb-5
          bg-white
          rounded-3xl
          h-[150px]
        "
      >
        <div class="w-[50px]">
          <div
            @click="consultantStore.toggleActive()"
            class="cursor-pointer"
            v-if="consultantStore.active"
          >
            <div class="text-center">active</div>
            <IconToggle class="text-green-700" />
          </div>
          <div
            @click="toggleActive"
            class="cursor-pointer"
            v-if="!consultantStore.active"
          >
            <div class="">inactive</div>
            <IconToggleOff class="text-green-700" />
          </div>
        </div>
        <h3 class="text-2xl text-lime-600 font-bold font-titillium">
          {{ consultantStore.user_name }}
        </h3>
        <h3 class="text-4xl font-bold font-titillium">my consultant portal</h3>
        <h3 class="text-2xl font-bold font-titillium">enquiry details</h3>
      </div>
      <div class="flex flex-col gap-10 w-[70vw]">
        <div class="grid grid-cols-4 gap-5">
          <h3>
            Enquiry ref:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry].ref
              }}
            </div>
          </h3>
          <h3>
            Customer Name:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry]
                  .full_name
              }}
            </div>
          </h3>
          <h3>
            Customer Email:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry].email
              }}
            </div>
          </h3>
          <h3>
            Customer Cell :
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry].cell
              }}
            </div>
          </h3>
          <h3>
            Destination:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry]
                  .destination
              }}
            </div>
          </h3>
          <h3>
            From Where:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry]
                  .from_where
              }}
            </div>
          </h3>
          <h3>
            No of Adults:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry]
                  .no_of_adults
              }}
            </div>
          </h3>
          <h3>
            No of Minors:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry]
                  .no_of_minors
              }}
            </div>
          </h3>
          <h3>
            No of Infants:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiries[consultantStore.currentEnquiry]
                  .no_of_infants
              }}
            </div>
          </h3>
        </div>
        <h3>Notes</h3>

        <NuxtLink to="/consultant-portal" class="flex justify-center">
          <BookButton>all my enquiries</BookButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
import { useConsultantStore } from "@/stores/consultant";
const consultantStore = useConsultantStore();

var consultant_key = 0;

onMounted(async () => {
  await consultantStore.frontGetPortalToken();
  if (
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("computravel_consultant_session="))
  ) {
    consultantStore.consultantSessionKey = document.cookie.slice(31);
    if (consultantStore.id == "") {
      consultantStore.getConsultantSessionKey();
    }

    consultantStore.getEnquiries();
  } else {
    console.log("no cookie");
  }
});

const config = useRuntimeConfig();
</script>

