<template>
  <div class="flex justify-center items-center">
    <div
      class="
        bg-green-avo
        rounded-3xl
        mx-5
        px-10
        md:px-10
        py-20
        flex flex-col
        items-center
        w-[1000px]
      "
    >
      <div class="flex justify-evenly w-full items-baseline mb-5">
        <h3 class="text-4xl font-bold font-titillium">
          consultant portal login
        </h3>
      </div>
      <div class="w-full flex gap-5 flex-col justify-evenly">
        <Input
          v-if="vl.email"
          inputName="email"
          label="Email address"
          type="text"
          :validationObject="vl.email"
          errorMessage="email is required"
          placeholder="email"
          @setValue="setValue"
        />
        <Input
          v-if="vl.password"
          inputName="password"
          label="Password"
          type="text"
          :validationObject="vl.password"
          errorMessage="password is required"
          placeholder="password"
          @setValue="setValue"
        />
        <div v-if="!successful_login && state_dirty" class="flex items-center">
          <div class="text-center w-full">
            Unsuccessful login. Your login details may be incorrect. Please try
            again
          </div>
        </div>
        <div class="flex justify-center">
          <CompuButton class="bg-lime-700" @click="send">
            <span> Log In </span>
          </CompuButton>
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
import { required } from "@vuelidate/validators";

const state = reactive({
  email: "",
  password: "",
});

const rules = {
  email: {
    required,
  },
  password: {
    required,
  },
};
const setValue = (inputName, value) => {
  state[inputName] = value;
};
let monthOfSeconds = 60 * 60 * 24 * 30;

const vl = useVuelidate(rules, state);
const config = useRuntimeConfig();
import { useConsultantStore } from "@/stores/consultant";
const consultantStore = useConsultantStore();
const successful_login = ref(true);
const state_dirty = ref(false);
console.log(state);
const send = async () => {
  let token = await consultantStore.frontGetPortalToken();
  console.log(token);
  successful_login.value = await consultantStore.logIn(state);
  state_dirty.value = true;
  if (successful_login.value === true) {
    navigateTo({
      path: "/consultant-portal",
    });
  }
};
</script>

<style>
th,
td {
  border: solid rgb(211, 209, 209) 2px;
}
</style>