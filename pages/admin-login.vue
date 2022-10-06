<template>
  <div class="flex justify-center items-center" ref="test">
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
        <h3 class="text-4xl font-bold font-titillium">Admin portal login</h3>
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
        <div v-if="adminUserStore.invalid_submission" class="flex items-center">
          <div class="text-center w-full">
            Unsuccessful login. Your login details may be incorrect. Please try
            again
          </div>
        </div>
        <div class="flex justify-center">
          <CompuButton class="bg-lime-700" @click="login">
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
import { useAdminUserStore } from "@/stores/adminUser";
const adminUserStore = useAdminUserStore();

const login = async function () {
  const allValid = await vl.value.$validate();
  if (allValid) {
    adminUserStore.login(state);
  }
};
const test = ref(null);
onMounted(() => {
  console.log(test.value.outerHTML);
});
</script>

<style>
th,
td {
  border: solid rgb(211, 209, 209) 2px;
}
</style>