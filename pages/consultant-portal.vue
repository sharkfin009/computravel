<template>
  <div class="flex justify-center items-center">
    <div
      class="
        w-[90vw]
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
          flex flex-wrap
          justify-between
          px-10
          w-full
          items-center
          bg-white
          shadow
          rounded-3xl
          mb-5
          py-10
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
        <h3 class="text-2xl font-bold font-titillium">my enquiries</h3>
      </div>
      <div class="w-full rounded-3xl overflow-x-auto text-sm shadow">
        <table class="w-full font-open-sans font-extralight">
          <thead>
            <tr>
              <th class="">date received</th>
              <th class="">customer name</th>
              <th class="">ref</th>
              <th class="">when</th>
              <th class="">view</th>
              <th class="">accept</th>
              <th class="">pass On</th>
            </tr>
          </thead>
          <tbody class="overflow-auto">
            <tr
              v-for="(enquiry, index) in consultantStore.enquiries"
              :key="index"
            >
              <td>{{ enquiry.createdAt }}</td>
              <td>{{ enquiry.full_name }}</td>
              <td>{{ enquiry.ref }}</td>

              <td>{{ enquiry.when }}</td>

              <td class="flex justify-center">
                <NuxtLink
                  v-if="enquiry.accepted"
                  :to="`/consultant-enquiry-view/${enquiry.id}`"
                >
                  <CompuButton class="bg-lime-700">view</CompuButton>
                </NuxtLink>
              </td>
              <td>
                <CompuButton
                  class="bg-lime-700 flex justify-centerer"
                  v-if="!enquiry.accepted"
                  @click="accept(enquiry.id)"
                  >accept</CompuButton
                >
                <div v-if="enquiry.accepted" class="text-center">accepted</div>
              </td>
              <td>
                <CompuButton
                  class="bg-lime-700"
                  @click="confirmPassOn(enquiry.id)"
                  >pass on</CompuButton
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="passOnConfirmMode"
      class="fixed inset-0 flex justify-center items-center"
    >
      <div
        class="
          bg-white
          rounded-3xl
          p-10
          border
          shadow
          flex flex-col
          items-center
        "
      >
        <div class="w-full flex justify-end">
          <IconClose
            class="
              h-7
              text-black
              cursor-pointer
              transform
              transition
              hover:rotate-180
            "
            @click="passOnConfirmMode = false"
          />
        </div>
        <div class="my-10">
          Please confirm that you wish to pass on this enquiry to another
          consultant
        </div>
        <CompuButton class="bg-lime-700" @click="passOn(enquiryId)"
          >pass on</CompuButton
        >
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
const enquiriesReady = ref(false);

const toggleActive = () => {
  consultantStore.toggleActive();
};
const accept = async (enquiryId) => {
  consultantStore.acceptEnquiry(enquiryId);
};
const passOnConfirmMode = ref(false);
const enquiryId = ref(0);
const confirmPassOn = async (id) => {
  enquiryId.value = id;
  passOnConfirmMode.value = true;
};
const passOn = async (enquiryId) => {
  consultantStore.passOnEnquiry(enquiryId);
  passOnConfirmMode.value = false;
};
</script>

<style>
</style>