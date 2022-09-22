<template>
  <div class="flex justify-center items-center">
    <div
      class="w-full bg-green-avo rounded-3xl p-20 flex flex-col items-center"
    >
      <div
        class="
          flex flex-wrap
          justify-evenly
          px-10
          w-full
          items-center
          mb-5
          bg-white
          rounded-3xl
          py-10
        "
        v-if="consultantStore.enquiry !== undefined"
      >
        <h3 class="text-2xl text-lime-600 font-bold font-titillium">
          {{ consultantStore.user_name }}
        </h3>
        <h3 class="text-2xl font-bold font-titillium">
          Enquiry ref:

          {{ consultantStore.enquiry.ref }}
        </h3>
      </div>
      <div
        v-if="consultantStore.enquiry !== undefined"
        class="flex flex-col gap-10 w-full"
      >
        <div class="grid grid-cols-2 gap-10">
          <h3>
            Customer Name:
            <div class="bg-white rounded p-4">
              {{ consultantStore.enquiry.full_name }}
            </div>
          </h3>
          <h3>
            Customer Email:
            <div class="bg-white rounded p-4">
              {{ consultantStore.enquiry.email }}
            </div>
          </h3>
          <h3>
            Customer Cell :
            <div class="bg-white rounded p-4">
              {{ consultantStore.enquiry.cell }}
            </div>
          </h3>
          <h3>
            Destination:
            <div class="bg-white rounded p-4">
              {{
                consultantStore.enquiry.destination
                  ? consultantStore.enquiry.destination
                  : "not provided"
              }}
            </div>
          </h3>
          <h3>
            From Where:
            <div class="bg-white rounded p-4">
              {{ consultantStore.enquiry.from_where }}
            </div>
          </h3>
          <h3>
            No of Adults:
            <div class="bg-white rounded p-4">
              {{ consultantStore.enquiry.no_of_adults }}
            </div>
          </h3>
          <h3>
            No of Minors:
            <div class="bg-white rounded p-4">
              {{ consultantStore.enquiry.no_of_minors }}
            </div>
          </h3>
          <h3>
            No of Infants:
            <div class="bg-white rounded p-4">
              {{ consultantStore.enquiry.no_of_infants }}
            </div>
          </h3>
        </div>
        <h3>
          Notes:
          <div v-if="!editMode" class="bg-white rounded p-5">
            {{ consultantStore.enquiry.notes }}
          </div>
          <div v-if="editMode" class="w-full">
            <textarea
              v-model="consultantStore.enquiry.notes"
              class="p-5 w-full border border-lime-700 rounded"
              rows="4"
              cols="50"
            />
          </div>
          <div v-if="!editMode" class="flex justify-end">
            <div @click="edit" class="cursor-pointer text-lime-600 font-bold">
              edit
            </div>
          </div>
          <div v-if="editMode" class="flex justify-end">
            <div @click="save" class="cursor-pointer text-lime-600 font-bold">
              save
            </div>
          </div>
        </h3>

        <NuxtLink to="/consultant-portal" class="flex justify-center">
          <CompuButton class="bg-lime-500">view all enquiries</CompuButton>
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
const config = useRuntimeConfig();

const route = useRoute();

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
    consultantStore.getEnquiry(route.params.id);
  } else {
    console.log("no cookie");
  }
});
const editMode = ref(false);
const edit = () => {
  editMode.value = true;
};
const save = (id) => {
  consultantStore.updateEnquiry(route.params.id);
  editMode.value = false;
};
</script>

