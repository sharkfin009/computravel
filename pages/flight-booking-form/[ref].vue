<template>
  <div class="px-5 lg:p-10 flex flex-col items-evenly justify-evenly pb-5">
    <div v-if="!bookingSent && data">
      <div class="text-center font-titillium">
        <div class="mb-5 font-bold">Flight Information:</div>
        <div class="mb-5 text-2xl font-bold">
          {{ data.data.flightSpecials.data[0].attributes.name }}
        </div>
      </div>
      <div
        class="
          grid grid-cols-[1fr,2fr]
          md:grid-cols-2
          gap-5
          font-light
          text-xl
          mb-10
        "
      >
        <div class="text-end font-medium">airline:</div>
        <div class="">
          {{ data.data.flightSpecials.data[0].attributes.airline }}
        </div>
        <div class="text-end font-medium">departing Airport:</div>
        <div class="">
          {{ data.data.flightSpecials.data[0].attributes.departing_airport }}
        </div>
        <div class="text-end font-medium">destination Airport:</div>
        <div class="">
          {{ data.data.flightSpecials.data[0].attributes.destination_airport }}
        </div>
        <div class="text-end font-medium">ticket By:</div>
        <div class="">
          {{ data.data.flightSpecials.data[0].attributes.ticket_by }}
        </div>
        <div class="text-end font-medium">duration:</div>
        <div>
          {{ data.data.flightSpecials.data[0].attributes.duration }}
        </div>
        <div class="text-end font-medium">valid from:</div>
        <div>
          {{ data.data.flightSpecials.data[0].attributes.valid_from }}
        </div>
        <div class="text-end font-medium">valid to:</div>
        <div>
          {{ data.data.flightSpecials.data[0].attributes.valid_to }}
        </div>
      </div>

      <div class="flex justify-center w-full">
        <div
          class="w-[700px] bg-green-avo rounded-xl pt-10 pb-10 md:pt-10 px-10"
        >
          <div class="mb-5 w-full flex flex-col gap-5">
            <Input
              v-if="vl.full_name"
              inputName="full_name"
              label="Full Name"
              type="text"
              :validationObject="vl.full_name"
              errorMessage="valid full name is required"
              placeholder="full name"
              @setValue="setValue"
            />
            <Input
              v-if="vl.email"
              inputName="email"
              label="Email Address"
              type="text"
              :validationObject="vl.email"
              errorMessage="valid email is required"
              placeholder="email"
              @setValue="setValue"
            />
            <Input
              v-if="vl.cell"
              inputName="cell"
              label="Cell Number"
              type="text"
              :validationObject="vl.cell"
              errorMessage="valid cell no is required"
              placeholder="number"
              @setValue="setValue"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <CompuButton @mousedown="validate" class="bg-lime-500 my-10"
          >send enquiry</CompuButton
        >
        <div v-if="showPrompt" class="font-medium text-xl text-red-700">
          Please fill in all required fields
        </div>
      </div>

      <div class="flex w-full flex-col items-center py-10">
        <div class="text-center font-titillium">
          <div class="mb-5 font-bold">Fare Rules:</div>
        </div>
        <div
          class="font-light"
          v-html="data.data.flightSpecials.data[0].attributes.fare_rules"
        />
      </div>
    </div>
    <!-- conf modal -->
    <transition name="fade">
      <ConfirmModal v-if="bookingSent">
        <template #header> Thank you for your flight enquiry! </template>
        <template #body>
          One of our travel experts will be in touch soon.</template
        >
      </ConfirmModal>
    </transition>
  </div>
</template>

<script setup>
import { useGraph } from "@/composables/useGraph";

const route = useRoute();
const { data, error } = useGraph(`
query{
  flightSpecials(filters:{reference:{eq:"${route.params.ref}"} }){
    data{
      attributes{
        name
        ticket_by
        duration
        departing_airport
        destination_airport
        valid_from
        valid_to
        price
        airline
        fare_rules
      }
    }
  } 
}
`);
definePageMeta({
  layout: "home",
});
const bookingSent = ref(false);
import useVuelidate from "@vuelidate/core";
import { required, email, numeric } from "@vuelidate/validators";

const state = reactive({
  full_name: "",
  email: "",
  cell: "",
});
const rules = {
  full_name: {
    required,
  },
  email: {
    required,
    email,
  },
  cell: {
    required,
    numeric,
  },
};
const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};

const { $graphql } = useNuxtApp();
const response = ref("");
const packages = ref([]);
const showPrompt = ref(false);
const validate = async function () {
  const isFormCorrect = await vl.value.$validate();
  if (!isFormCorrect) {
    showPrompt.value = true;
    return;
  }
  send();
};
const send = () => {
  let query = `mutation{
  createFlightSpecialEnquiry(
    data:{
      full_name:"${state.full_name}"
      email:"${state.email}"
      cell:"${state.cell}"
      reference:"${route.params.ref}"
    }
  )
  {
    data{
     id
    }
    }
    }`;
  $graphql(query).then((response) => {
    response.value = response.data;
    bookingSent.value = true;
  });
};
</script>