<template>
  <div
    class="relative bg-green-avo rounded-xl p-10 flex flex-col justify-evenly"
  >
    <div class="grid grid-cols-3 gap-x-10 gap-y-2 mb-5">
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
  destination: "",
  from_where: "joh",
  when: "2023-12-03",
  no_of_adults: "1",
  no_of_minors: "2",
  no_of_infants: "3",
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
  destination: {},
  from_where: {},

  no_of_adults: {},
  no_of_minors: {},
  no_of_infants: {},

  when: {
    required,
  },
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

const send = () => {
  let list =''
  if(localStorage.getItem('my-packages')){
    let packages = JSON.parse(localStorage.getItem('my-packages'))
    let ids = packages.map(item=>item.id)
    console.log(ids)
    list = "packages: " + JSON.stringify(ids)
  }
     let enquiryRef = Math.floor(Math.random() * 10000)

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
  enquiryState.showEnquireNow = false;
  enquiryState.showEnquireFormMyPackages = false;
  enquiryState.showConfirmation = true;
  graphql(query).then((response) => {
    response.value = response.data;
    enquiryState.enquiryId = response.data.createEnquiry.data.id
    localStorage.setItem("enquiryId", response.data.createEnquiry.data.id)
    enquiryState.enquiryRef = enquiryRef
    localStorage.setItem("enquiryRef" , enquiryRef)
    localStorage.setItem("enquirySent", true);
    enquiryState.enquirySent = true
  
    enquiryState.listDirtyState = false
  });
};
</script>