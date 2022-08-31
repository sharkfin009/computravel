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
        md:grid
        md:grid-cols-3
        md:grid-rows-4
        md:gap-x-10
        md:gap-y-10
        md:mb-10
        md:h-[500px]
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
      <Input
        v-if="vl.company"
        inputName="company"
        label="Company Name"
        type="text"
        :validationObject="vl.company"
        errorMessage="company name is required"
        placeholder="number"
        @setValue="setValue"
      />
      <Input
        v-if="vl.group"
        inputName="group"
        label="Group Name"
        type="text"
        :validationObject="vl.group"
        errorMessage="group name is required"
        placeholder="number"
        @setValue="setValue"
      />

      <DestinationInput @setValue="setValue" />

      <CTSelect
        label="Departing From"
        inputName="from_where"
        :options="airports"
        placeholder="anywhere"
        @setValue="setValue"
      />

      <Input
        v-if="vl.when"
        inputName="when"
        label="Approximate date"
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
        label="Travel Insurance"
        inputName="travel_insurance"
        :options="['yes', 'no']"
        @setValue="setValue"
      />

      <Input
        v-if="vl.budget_per_person"
        inputName="budget_per_person"
        label="Budget per person"
        type="text"
        :validationObject="vl.budget_per_person"
        placeholder="eg R5000 per person"
        @setValue="setValue"
      />
    </div>
    <!-- textareas -->
    <div class="flex flex-col md:gap-5">
      <TextArea
        v-if="vl.room_requirements"
        inputName="room_requirements"
        label="Room Requirements"
        :validationObject="vl.room_requirements"
        errorMessage="date is required"
        placeholder=""
        @setValue="setValue"
      />
      <TextArea
        v-if="vl.meal_plan"
        inputName="meal_plan"
        label="Meal Plan"
        :validationObject="vl.meal_plan"
        errorMessage="date is required"
        placeholder=""
        @setValue="setValue"
      />
      <TextArea
        v-if="vl.conference_requirements"
        inputName="conferemce_requirements"
        label="Conference Requirements"
        :validationObject="vl.conference_requirements"
        errorMessage="date is required"
        placeholder=""
        @setValue="setValue"
      />

      <TextArea
        v-if="vl.tours"
        inputName="tours"
        label="Tours"
        :validationObject="vl.tours"
        errorMessage="date is required"
        placeholder=""
        @setValue="setValue"
      />
      <TextArea
        v-if="vl.additional_info"
        inputName="additional_info"
        label="Additional Information"
        :validationObject="vl.additional_info"
        placeholder=""
        @setValue="setValue"
      />
    </div>

    <div class="flex justify-end">
      <BookButton @mousedown="send" class="px-10">send enquiry</BookButton>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useenquiry } from "@/stores/enquiry";
const enquiryState = useenquiry();

const state = reactive({
  full_name: "dude",
  email: "ben.amato@gmail.com",
  cell: "1234",
  company: "",
  group: "",
  destination: "",
  from_where: "joh",
  when: "2023-12-03",
  no_of_adults: "1",
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
  },
  company: {},
  group: {},
  destination: {},
  from_where: {},
  budget_per_person: {},
  room_requirements: {},
  no_of_adults: {},
  meal_plan: {},
  when: {
    required,
  },
  conference_requirements: {},
  tours: {},
  additional_info: {},
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
];

const graphql = useStrapiGraphQL();
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
  enquiryState.showEnquireNow = false;
  enquiryState.showConfirmation = true;
  graphql(query).then((response) => {
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
</script>