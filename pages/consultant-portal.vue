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
          bg-white
          rounded-3xl
          mb-5
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
        <h3 class="text-2xl font-bold font-titillium">my enquiries</h3>
      </div>
      <div class="w-full rounded-3xl overflow-auto">
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

              <td>
                <CompuButton bg-lime-500 @click="view(index)">view</CompuButton>
              </td>
              <td>
                <CompuButton
                  class="bg-lime-500"
                  v-if="!enquiry.accepted"
                  @click="accept(enquiry.id)"
                  >accept</CompuButton
                >
                <div v-if="enquiry.accepted" class="text-center">accepted</div>
              </td>
              <td>
                <CompuButton
                  class="bg-lime-500"
                  v-if="!enquiry.passed_on"
                  @click="passOn(enquiry.id)"
                  >pass on</CompuButton
                >
                <div v-if="enquiry.passed_on" class="text-center">
                  passed on
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
const enquiriesReady = ref(false);

const toggleActive = () => {
  consultantStore.toggleActive();
};
const accept = async (enquiryId) => {
  consultantStore.acceptEnquiry(enquiryId);
};
const passOn = async (enquiryId) => {
  consultantStore.passOnEnquiry(enquiryId);
};

const view = async (enquiryIndex) => {
  consultantStore.currentEnquiry = enquiryIndex;
  navigateTo({
    path: "consultant-single-enquiry",
  });
};
</script>

<style>
</style>