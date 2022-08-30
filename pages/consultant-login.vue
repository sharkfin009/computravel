<template>
  <div
    class="
      w-screen
      h-screen
      fixed
      inset-0
      flex
      justify-center
      items-center
      bg-green-avo
    "
  >
    <div
      class="
        w-[90vw]
        h-[70vh]
        bg-white
        rounded-3xl
        p-20
        flex flex-col
        items-center
      "
    >
      <div class="flex justify-evenly w-full items-baseline mb-5">
        <h3 class="text-4xl font-bold font-titillium">
          consultant portal login
        </h3>
      </div>
      <div class="w-[50%] h-full flex flex-col justify-evenly">
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
          placeholder="user name"
          @setValue="setValue"
        />
        <div class="h-20 flex items-center">
          <div
            class="text-center w-full"
            v-if="!successful_login && state_dirty"
          >
            Unsuccesfull login. Your login details may be incorrect. Please try
            again
          </div>
        </div>
        <CompuButton class="bg-green-500" @click="send">Log In</CompuButton>
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
  email: "ben.amato@gmail.com",
  password: "qwerty1234",
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