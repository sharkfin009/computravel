<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <div class="text-xl mb-20">
      Please send me information about holidays to
      {{ searchStore.destination }} departing between () and () costing under ()
    </div>
    <form autocomplete="off" class="flex flex-col gap-5 text-gray">
      <Input
        v-if="vl.user_name"
        :validationObject="vl.user_name"
        inputName="user_name"
        label="Full Name:"
        placeholder="Enter your full name"
        type="text"
        errorMessage="Please enter your full name"
        @setValue="setValue"
      />
      {{ state.user_name }}

      <Input
        v-if="vl.user_email"
        :validationObject="vl.user_email"
        inputName="user_email"
        label="Email Address:"
        placeholder="enter your email"
        type="text"
        errorMessage="Please enter a valid Email address"
        :showErrors="showErrors"
        @setValue="setValue"
        ref="user_email"
      />
      {{ state.user_email }}

      <CompuButton class="bg-lime-500 mt-5 bg-black" @click="createEnquiry()"
        >Send Enquiry</CompuButton
      >
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import { useStore } from "@/stores/search";
const searchStore = useStore();

import { useGraph } from "@/composables/useGraph";

// set up vuelidate
const state = reactive({
  user_name: "",
  user_email: "",
});

const rules = {
  user_name: {
    required,
  },
  user_email: {
    required,
    email,
  },
};
const vl = useVuelidate(rules, state);
const showErrors = ref(false);
// fire on input event:
const setValue = function (inputName, value) {
  state[inputName] = value;
};

const createEnquiry = function () {
  this.vl.$touch();
  if (this.vl.$invalid) {
    console.log("validation failed");
    return;
  } else {
    const { data, error } = useGraph(`mutation{
  createSearchEnquiry(
    data:{
      search_query:"${searchStore.destination}"
      user_full_name:"${state.user_name}"
      user_email:"${state.user_email}"
      
    }
  ){
    data{
      attributes{
        search_query
      }
    }
  }
}
                        `);
  }
};
</script>