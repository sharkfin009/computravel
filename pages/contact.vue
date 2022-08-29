<template>
  <div class="bg-stone-50 px-10 md:px-20 pb-10">
    <SectionHeading
      heading="contact us"
      subheading="we'd love to hear from you"
      :inverted="false"
    />
    <div
      class="
        bg-green-avo
        rounded-xl
        p-10
        flex flex-col
        items-evenly
        justify-evenly
      "
    >
      <div
        class="
          flex flex-col
          md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-10 md:gap-y-10 md:mb-10
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
      </div>
      <TextArea
        v-if="vl.message"
        inputName="message"
        label="Message"
        :validationObject="vl.message"
        errorMessage="date is required"
        placeholder=""
        @setValue="setValue"
      />

      <div class="flex justify-end">
        <BookButton @mousedown="send" class="px-10">send enquiry</BookButton>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useenquiry } from "@/stores/enquiry";
const enquiryState = useenquiry();

const state = reactive({
  full_name: "dude",
  email: "ben.amato@gmail.com",
  cell: "1234",
  company: "",
  message: "",
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
  message: {},
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