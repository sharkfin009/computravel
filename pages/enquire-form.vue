<template>
  <div class="bg-slate-50">
    <div class="py-10 flex gap-5 flex-wrap items-center">
      <div v-if="packages.length">Bookings I am interested in:</div>
      <div
        class="
          bg-green-avo
          p-2
          px-4
          rounded-full
          text-lime-900
          font-medium
          shadow
          w-full
          flex
          justify-between
          items-center
        "
        v-for="(item, index) in packages.map((item) => item.attributes.title)"
        :key="index"
      >
        <div>{{ item }}</div>
        <IconClose
          class="w-6 transition hover:rotate-180 cursor-pointer"
          @mousedown="removeFavorite"
        />
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-full md:w-[70vw]">
        <SectionHeading
          heading="Tell us about your travel needs"
          subheading="We will get right back to you"
          :inverted="false"
        />
        <div
          class="
            bg-green-avo
            rounded-xl
            p-5
            lg:p-10
            flex flex-col
            items-evenly
            justify-evenly
          "
        >
          <div
            class="
              flex flex-col
              gap-8
              lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-20
              mb-5
            "
          >
            <Input
              v-if="vl.full_name"
              inputName="full_name"
              label="Full Name"
              type="text"
              :validationObject="vl.full_name"
              errorMessage="full name is required"
              placeholder="full name"
              @setValue="setValue"
            />
            <Input
              v-if="vl.email"
              inputName="email"
              label="Email Address"
              type="text"
              :validationObject="vl.email"
              errorMessage="email is required"
              placeholder="email"
              @setValue="setValue"
            />
            <Input
              v-if="vl.cell"
              inputName="cell"
              label="Cell Number"
              type="text"
              :validationObject="vl.cell"
              errorMessage="cell no is required"
              placeholder="number"
              @setValue="setValue"
            />

            <DestinationInput @setValue="setValue" parent="enquiryForm" />

            <CTSelect
              class="col-span-full"
              label="Departing From"
              inputName="from_where"
              :options="airports"
              placeholder="anywhere"
              @setValue="setValue"
            />

            <Input
              v-if="vl.when"
              inputName="when"
              label="approximate departure date"
              type="date"
              :validationObject="vl.when"
              errorMessage="date is required"
              placeholder="anytime"
              @setValue="setValue"
            />
            <CTSelect
              label="No of Adults (12 +)"
              inputName="no_of_adults"
              :options="['1', '2', '3', '4', '5', '6', 'large group']"
              @setValue="setValue"
            />

            <CTSelect
              label="No of Minors (2 - 11)"
              inputName="no_of_minors"
              :options="['1', '2', '3', '4', '5', '6', 'large group']"
              @setValue="setValue"
            />
            <CTSelect
              label="No of infants (< 2)"
              inputName="no_of_infants"
              :options="['1', '2', '3', '4', '5', '6']"
              @setValue="setValue"
            />
          </div>

          <div class="flex flex-col items-center justify-center">
            <CompuButton @mousedown="validate" class="bg-lime-500 my-10"
              >send enquiry</CompuButton
            >
            <div v-if="showPrompt" class="font-medium text-xl text-red-700">
              Please fill in all required fields
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  alpha,
  alphaNum,
  numeric,
} from "@vuelidate/validators";
import { useenquiry } from "@/stores/enquiry";
const enquiryState = useenquiry();

const state = reactive({
  full_name: "",
  email: "",
  cell: "",
  destination: "",
  from_where: "",
  when: "",
  no_of_adults: "",
  no_of_minors: "",
  no_of_infants: "",
});
const rules = {
  full_name: {
    required,
    alpha,
  },
  email: {
    required,
    email,
  },
  cell: {
    required,
    numeric,
  },
  destination: {
    alphaNum,
  },
  from_where: { alphaNum },

  no_of_adults: { numeric },
  no_of_minors: { numeric },
  no_of_infants: { numeric },

  when: {},
};
const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};

const airports = [
  "Johannesburg (O.R. Tambo International)",
  "Johannesburg (Lanseria International)",
  "Cape Town (Cape Town International)",
  "Durban (King Shaka International)",
  "Windhoek (Hosea Kutako International)",
  "Lusaka (Lusaka International Airport)",
  "Harare (Robert Gabriel Mugabe International Airport)",
  "Other",
];

const { $graphql } = useNuxtApp();
const response = ref("");
const packages = ref([]);
let ids = [];
const titles = ref([]);
let list = "";
onMounted(() => {
  if (localStorage.getItem("my-packages")) {
    packages.value = JSON.parse(localStorage.getItem("my-packages"));
    ids = packages.value.map((item) => item.id);
    console.log(packages);
    titles.value = ref(packages.value.map((item) => item.attributes.title));
    list = "packages: " + JSON.stringify(ids);
  }
});

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
  let enquiryRef = Math.floor(Math.random() * 10000);

  let query = `mutation{
  createEnquiry(
    data:{
      full_name:"${state.full_name}"
          email:"${state.email}"
      cell:"${state.cell}"
      destination:"${state.destination}"
      when:"${state.when}"
      from_where:"${state.from_where}"
      no_of_adults:"${state.no_of_adults}"
      no_of_minors:"${state.no_of_minors}"
      no_of_infants:"${state.no_of_infants}"
      ref:"${enquiryRef}"
      ${list}
    }
  )
  {
    data{
     id
    }
    }
    }`;
  enquiryState.showConfirmation = true;
  $graphql(query).then((response) => {
    response.value = response.data;
    enquiryState.enquiryId = response.data.createEnquiry.data.id;
    localStorage.setItem("enquiryId", response.data.createEnquiry.data.id);
    enquiryState.enquiryRef = enquiryRef;
    localStorage.setItem("enquiryRef", enquiryRef);
    localStorage.setItem("enquirySent", true);
    enquiryState.enquirySent = true;

    enquiryState.listDirtyState = false;
  });
};

const removeFavorite = (index) => {
  packages.value.splice(index, 1);
  localStorage.setItem("my-packages", JSON.stringify(packages.value));
  enquiryState.listDirtyState = true;
};
</script>