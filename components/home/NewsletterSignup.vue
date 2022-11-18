<template>
  <HomeSectionLayout bgColor="bg-stone-50" v-if="!subscriptionState.subscribed">
    <div class="grid grid-rows-[min-content,auto,min-content] bg-stone-50">
      <!-- header section -->
      <SectionHeading
        heading="join our mailing list"
        subheading="to receive exciting travel deals"
        :inverted="false"
      />
      <!-- body section -->
      <div
        class="
          relative
          flex flex-col
          justify-center
          items-center
          h-[200px]
          sm:h-[400px]
          md:h-[500px]
          lg:h-none
        "
      >
        <form class="bg-green-avo rounded-3xl pb-5 px-5 mb-20">
          <Input
            v-if="vl.full_name"
            inputName="full_name"
            type="text"
            :validationObject="vl.full_name"
            errorMessage="full name is required"
            placeholder="full name"
            @setValue="setValue"
            class="w-[600px] mb-2"
          />
          <Input
            v-if="vl.email"
            inputName="email"
            type="text"
            :validationObject="vl.email"
            errorMessage="valid email is required"
            placeholder="email"
            @setValue="setValue"
          />
        </form>
        <CompuButton @click="send" class="bg-lime-500">sign me up</CompuButton>
      </div>
    </div>
  </HomeSectionLayout>
</template>
<script setup>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  alpha,
  alphaNum,
  numeric,
} from "@vuelidate/validators";
const state = reactive({
  full_name: "",
  email: "",
});
const rules = {
  full_name: {
    required,
  },
  email: {
    required,
    email,
  },
};
const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};

const { $graphql } = useNuxtApp();
import { useSubscription } from "@/stores/subscription";
const subscriptionState = useSubscription();
const send = () => {
  let enquiryRef = Math.floor(Math.random() * 10000);

  let query = `mutation{
  createSubscriber(
    data:{
     name:"${state.full_name}"
          email:"${state.email}"
    }
  )
  {
    data{
     id
    }
    }
    }`;

  subscriptionState.showConfirmation = true;
  $graphql(query).then((response) => {
    response.value = response.data;
    localStorage.setItem("subscribed", true);
    subscribed.value = true;
  });
};
onMounted(() => {
  if (localStorage.getItem("subscribed")) {
    subscriptionState.subscribed = true;
  }
});
</script>
