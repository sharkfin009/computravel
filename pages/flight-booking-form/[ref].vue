<template>
  <div class="px-5 lg:p-10 flex flex-col items-evenly justify-evenly pb-5">
    <transition name="fade" v-if="bookingSent">
      <ConfirmModal>
        <h3 class="text-xl md:text-6xl font-bold">
          Thankyou for your flight booking!
        </h3>
        <p>One of our travel experts will be in touch soon.</p>
      </ConfirmModal>
    </transition>
    <div v-if="!bookingSent">
      <div class="text-center font-titillium font-bold text-2xl mb-10">
        <div class="mb-5 font-light">
          reference code: {{ route.params.ref }}
        </div>
        To book your flight, please fill in these details and submit
      </div>
      <div class="flex justify-center w-full">
        <div
          class="w-[1000px] bg-green-avo rounded-xl pt-10 pb-10 md:pt-10 px-10"
        >
          <div class="mb-5 w-full flex flex-col gap-5">
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
        </div>
      </div>
      <div class="mt-10 flex justify-center">
        <CompuButton @mousedown="send" class="bg-lime-500"
          >submit booking</CompuButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
const bookingSent = ref(false);
const route = useRoute();
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const state = reactive({
  full_name: "dude",
  email: "ben.amato@gmail.com",
  cell: "1234",
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
};
const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};

const { $graphql } = useNuxtApp();
const response = ref("");
const packages = ref([]);

const send = () => {
  let query = `mutation{
  createFlightBooking(
    data:{
      Name:"${state.full_name}"
          email:"${state.email}"
      cell:"${state.cell}"
    
      ref:"${route.params.ref}"
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