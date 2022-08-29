<template>
  <div class="bg-stone-50 px-10 md:px-20 pb-10">
    <SectionHeading
      heading="contact us"
      subheading="we'd love to hear from you"
      :inverted="false"
    />
    <div class="grid lg:grid-cols-3 gap-20 mb-20">
      <div
        class="
          flex flex-col
          items-center
          justify-center
          p-20
          gap-5
          rounded-lala
          bg-white
          shadow
        "
      >
        <fa-icon icon="fas fa-phone " />
        <h4 class="font-semibold">phone</h4>
        <div class="text-center">
          <p>Tel: +27 (021) 762-0511</p>
          <p>After hours: +27 (0)84 674-0246</p>
        </div>
      </div>
      <div
        class="
          flex flex-col
          items-center
          justify-center
          p-20
          gap-5
          rounded-lala
          bg-white
          shadow
        "
      >
        <fa-icon icon="fa fa-map-marker " />
        <h4 class="font-semibold">address</h4>
        <div class="text-center">
          <p>
            59 Waterloo Road, Cnr. Waterloo Road and Wolfe Street, Wynberg,
            7800.
          </p>
        </div>
      </div>
      <div
        class="
          flex flex-col
          items-center
          justify-center
          p-20
          gap-5i
          rounded-lala
          bg-white
          shadow
        "
      >
        <fa-icon icon="fas fa-envelope " />
        <h4 class="font-semibold">email</h4>
        <div class="text-center">
          <p>info@computravel.co.za</p>
        </div>
      </div>
    </div>
    <h3>get in touch with us directly here</h3>
    <div class="md:flex flex-col items-center">
      <div
        class="
          bg-green-avo
          rounded-xl
          p-10
          flex flex-col
          items-evenly
          justify-evenly
          w-none
          md:w-[70vw]
        "
      >
        <div
          class="
            flex flex-col
            md:grid
            md:grid-cols-2
            md:grid-rows-2
            md:gap-x-10
            md:gap-y-10
            md:mb-10
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
            class="col-span-full"
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