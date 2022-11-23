<template>
  <div class="bg-slate-50 px-5 md:px-20 pb-10 md:pb-20 text-base">
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
          rounded-lala
          bg-white
          shadow
        "
      >
        <a
          href="tel:270217620511"
          class="flex flex-col items-center justify-center mb-5"
        >
          <IconPhone class="mb-5" />
          <div>Tel: +27021762-0511</div>
        </a>
        <a
          href="tel:27680424843"
          class="flex flex-col items-center justify-center"
        >
          <IconWhatsappBlack class="w-10 mb-5" />
          <div>Tel: +27680424843</div>
        </a>
      </div>
      <div
        class="
          flex flex-col
          items-center
          justify-center
          p-20
          rounded-lala
          bg-white
          shadow
        "
      >
        <IconMapMarker class="w-8 mb-5" />
        <div class="text-center">
          <p>
            59 Waterloo Road, <br />Cnr. Waterloo Road and Wolfe Street,<br />
            Wynberg, 7800.
          </p>
        </div>
      </div>
      <div
        class="
          flex flex-col
          items-center
          justify-center
          p-20
          rounded-lala
          bg-white
          shadow
        "
      >
        <div class="text-center">
          <a
            href="mailto:info@computravel.co.za"
            target="blank"
            class="flex flex-col items-center justify-center"
          >
            <IconEnvelope class="w-8 mb-5" />
            info@computravel.co.za
          </a>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-center">
      <div class="md:w-[70vw]">
        <SectionHeading
          heading="get in touch with us directly"
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
            w-none
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
            errorMessage="please enter a message"
            placeholder=""
            @setValue="setValue"
          />

          <div class="flex flex-col items-center justify-center">
            <CompuButton @mousedown="validate" class="bg-lime-500 my-10"
              >submit</CompuButton
            >
            <div v-if="showPrompt" class="font-medium text-xl text-red-700">
              Please fill in all required fields
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <ConfirmModal type="Contact" :showRef="false" v-if="showConfirmation">
        <template #header> Thank you for your message! </template>
        <template #body>
          One of our travel experts will be in touch soon.</template
        >
      </ConfirmModal>
    </transition>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
import useVuelidate from "@vuelidate/core";
import { required, email, alpha, numeric } from "@vuelidate/validators";
import { useenquiry } from "@/stores/enquiry";
const enquiryState = useenquiry();

const state = reactive({
  full_name: "",
  email: "",
  cell: "",
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
    numeric,
  },

  message: { required },
};
const vl = useVuelidate(rules, state);

const setValue = (inputName, value) => {
  state[inputName] = value;
};

const { $graphql } = useNuxtApp();
const response = ref("");
const packages = ref([]);
let ids = [];
const titles = ref([]);
const list = ref([]);

const config = useRuntimeConfig();
const showConfirmation = ref(false);
const showPrompt = ref(false);
const validate = async function () {
  const isFormCorrect = await vl.value.$validate();
  if (!isFormCorrect) {
    showPrompt.value = true;
    return;
  }
  send();
};
const send = () => {
  let enquiryRef = Math.floor(Math.random() * 10000);

  return fetch(config.strapiUrl + "/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        full_name: state.full_name,
        email: state.email,
        cell: state.cell,
        company: state.company,
        message: state.message,
      },
    }),
  })
    .then((response) => response)
    .then((data) => {
      // console.log(data);
      if (data.ok) {
        showConfirmation.value = true;
      }
    });
  enquiryState.showConfirmation = true;
};
</script>