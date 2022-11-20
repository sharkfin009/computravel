<template>
  <div
    class="
      bg-green-avo
      rounded-xl
      p-5
      md:p-10
      flex flex-col
      items-evenly
      justify-evenly
    "
  >
    <div
      class="
        flex flex-col
        grid-rows-3
        md:grid md:grid-cols-2 md:gap-10 md:mb-10
      "
    >
      <Input
        v-if="$v.full_name"
        inputName="full_name"
        label="Full Name"
        type="text"
        :validationObject="$v.full_name"
        errorMessage="full name is required"
        placeholder="full name"
        @setValue="setValue"
      />
      <Input
        v-if="$v.email"
        inputName="email"
        label="Email Address"
        type="text"
        :validationObject="$v.email"
        errorMessage="valid email required"
        placeholder="email"
        @setValue="setValue"
      />
      <Input
        v-if="$v.cell"
        inputName="cell"
        label="Cell Number"
        type="text"
        :validationObject="$v.cell"
        errorMessage="please add valid cell no"
        placeholder="number"
        @setValue="setValue"
      />
      <Input
        v-if="$v.company"
        inputName="company"
        label="Company Name"
        type="text"
        :validationObject="$v.company"
        errorMessage=""
        placeholder=""
        @setValue="setValue"
      />
      <Input
        v-if="$v.group"
        inputName="group"
        label="Group Name"
        type="text"
        :validationObject="$v.group"
        errorMessage=""
        placeholder=""
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
        v-if="$v.when"
        inputName="when"
        label="Approximate date"
        type="date"
        :validationObject="$v.when"
        errorMessage=""
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
        label="Travel Insurance"
        inputName="travel_insurance"
        :options="['yes', 'no']"
        @setValue="setValue"
      />

      <Input
        v-if="$v.budget_per_person"
        inputName="budget_per_person"
        label="Budget per person"
        type="text"
        :validationObject="$v.budget_per_person"
        placeholder="eg R5000 per person"
        @setValue="setValue"
      />
    </div>
    <!-- textareas -->
    <div class="flex flex-col md:gap-5">
      <TextArea
        v-if="$v.room_requirements"
        inputName="room_requirements"
        label="Room Requirements"
        :validationObject="$v.room_requirements"
        errorMessage=""
        placeholder=""
        @setValue="setValue"
      />
      <TextArea
        v-if="$v.meal_plan"
        inputName="meal_plan"
        label="Meal Plan"
        :validationObject="$v.meal_plan"
        errorMessage=""
        placeholder=""
        @setValue="setValue"
      />
      <TextArea
        v-if="$v.conference_requirements"
        inputName="conference_requirements"
        label="Conference Requirements"
        :validationObject="$v.conference_requirements"
        errorMessage="date is required"
        placeholder=""
        @setValue="setValue"
      />

      <TextArea
        v-if="$v.tours"
        inputName="tours"
        label="Tours"
        :validationObject="$v.tours"
        errorMessage="date is required"
        placeholder=""
        @setValue="setValue"
      />
      <TextArea
        v-if="$v.additional_info"
        inputName="additional_info"
        label="Additional Information"
        :validationObject="$v.additional_info"
        placeholder=""
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
    <transition name="fade">
      <ConfirmModal
        type="groupEnquiry"
        :showRef="false"
        v-if="showConfirmation"
      >
        <template #header> Thank you for your group enquiry! </template>
        <template #body>
          One of our travel experts will be in touch soon.</template
        >
      </ConfirmModal>
    </transition>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, email, numeric } from "@vuelidate/validators";
import { useenquiry } from "@/stores/enquiry";
const enquiryState = useenquiry();

const state = reactive({
  full_name: "",
  email: "",
  cell: "",
  company: "",
  group: "",
  destination: "",
  from_where: "",
  when: "",
  no_of_adults: "",
  budget_per_person: "",
  room_requirements: "",
  meal_plan: "",
  conference_requirements: "",
  tours: "",
  additional_info: "",
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
  company: {},
  group: {},
  destination: {},
  from_where: {},
  budget_per_person: {},
  room_requirements: {},
  no_of_adults: {},
  meal_plan: {},
  when: { required },
  conference_requirements: {},
  tours: {},
  additional_info: {},
};
const $v = useVuelidate(rules, state);
console.log($v);
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
const showConfirmation = ref(false);
const showPrompt = ref(false);
const validate = async function () {
  const isFormCorrect = await $v.value.$validate();
  if (!isFormCorrect) {
    showPrompt.value = true;
    return;
  }
  send();
};
const send = () => {
  let enquiryRef = Math.floor(Math.random() * 10000);

  let query = `mutation{
  createGroupEnquiry(
    data:{
      full_name:"${state.full_name}"
          email:"${state.email}"
      cell:"${state.cell}"
      company:"${state.company}"
      group:"${state.group}"
      destination:"${state.destination}"
      when:"${state.when}"
      from_where:"${state.from_where}"
      no_of_adults:"${state.no_of_adults}"
      budget_per_person:"${state.budget_per_person}"
      room_requirements:"${state.room_requirements}"
      meal_plan:"${state.meal_plan}"
      conference_requirements:"${state.conference_requirements}"
      tours:"${state.tours}"
      additional_info:"${state.additional_info}"
    }
  )
  {
    data{
     id
    }
    }
    }`;
  showConfirmation.value = true;
  $graphql(query).then((response) => {});
};
</script>
