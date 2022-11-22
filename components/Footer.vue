<template>
  <div
    class="
      md:pt-20
      grid grid-rows-[auto,auto,auto]
      gap-3
      bg-slate-800
      text-white
      px-10
      md:px-14
      pt-24
      pb-12
    "
  >
    <div class="sm:grid sm:grid-cols-2 gap-3">
      <div class="flex flex-col justify-center gap-10 lg:pr-20">
        <h3 class="font-titillium text-5xl">about computravel</h3>
        <p class="max-w-[400px]">
          Computravel serves as an online South African travel agent, boasting
          highly professional experts with years in the tourism and hospitality
          industries.
        </p>
      </div>
      <a href="/asata" target="blank">
        <div class="flex justify-center items-center">
          <nuxt-img
            width="250"
            height="250"
            src="/v1669035232/computravel/asata-logo-full-500-sq-transp_vz31jh.png"
            alt="ASATA logo"
            format="webp"
          />
        </div>
      </a>
    </div>
    <!-- 3rd row -->
    <div class="grid sm:grid sm:grid-cols-2 gap-3">
      <div class="">
        <h3 class="font-titillium text-5xl pb-5">contact us</h3>
        <div class="grid lg:grid lg:grid-cols-2 gap-3">
          <div class="">
            <p>T: +27 (021) 762-0511</p>
          </div>

          <div>
            <a
              to=""
              class="cursor-pointer"
              href="mailto:info@computravel.co.za"
              target="blank"
              >info@computravel.co.za</a
            ><br />
            <a
              to=""
              class="cursor-pointer"
              href="mailto:enquiry@computravel.co.za"
              target="blank"
              >enquiry@computravel.co.za</a
            >
          </div>

          <div class="flex justify-start items-center">
            <NuxtLink to="/enquire-form">
              <CompuButton
                v-if="enquiry.enquirySent == false"
                class="bg-lime-500"
                target="blank"
                >enquire now</CompuButton
              >
            </NuxtLink>
            <NuxtLink to="/contact">
              <CompuButton
                v-if="enquiry.enquirySent == true"
                class="bg-lime-500"
                target="blank"
                >contact us</CompuButton
              >
            </NuxtLink>
          </div>
          <div class="flex justify-start items-center">
            <a href="https://www.facebook.com/Computravel/" target="blank">
              <i class="fa-brands fa-facebook fa-2x cursor-pointer mr-5"
            /></a>
            <a href="https://twitter.com/computravel" target="blank">
              <i class="fa-brands fa-twitter fa-2x cursor-pointer mr-5" />
            </a>
            <a
              href="https://www.instagram.com/computravel/?hl=en"
              target="blank"
            >
              <i class="fa-brands fa-instagram fa-2x cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
      <div class="grid lg:grid lg:grid-cols-2 gap-3">
        <div class="">
          <div class="h-[60px] flex items-center">
            <h4 class="font-bold mb-5">legal</h4>
          </div>
          <ul class="list-none text-base">
            <NuxtLink to="/covid-19" target="blank">
              <li>sacoronavirus.co.za</li>
            </NuxtLink>
            <NuxtLink to="/terms-and-conditions" target="blank">
              <li>Terms And Conditions</li>
            </NuxtLink>
            <NuxtLink to="/disclaimer" target="blank">
              <li>Disclaimer</li>
            </NuxtLink>
            <NuxtLink to="/fraud-prevention-policy" target="blank">
              <li>Fraud Prevention Policy</li>
            </NuxtLink>
            <!-- <NuxtLink to="section-51-PAIA-manual">
              <li>Section 51 PAIA Manual</li>
            </NuxtLink> -->
          </ul>
        </div>
        <div class="">
          <div class="h-[60px] flex items-center">
            <h4 class="font-bold mb-5">data, privacy and more</h4>
          </div>
          <ul class="list-none text-base">
            <NuxtLink to="/privacy-policy" target="blank">
              <li>Privacy Policy</li>
            </NuxtLink>
            <NuxtLink to="cookie-policy" target="blank">
              <li>Cookie Policy</li>
            </NuxtLink>
            <!-- <NuxtLink to="careers">
              <li>Careers</li>
            </NuxtLink> -->
            <NuxtLink to="faqs" target="blank">
              <li>FAQs</li>
            </NuxtLink>
            <NuxtLink to="/travel-tips" target="blank">
              <li>Travel Tips</li>
            </NuxtLink>
          </ul>
        </div>
        <div class=""></div>
      </div>
    </div>
    <div class="bg-slate-800 flex justify-center p-5">
      <div class="text-center text-sm">
        Website custom coded by Ben Amato from <i>iSimon</i>, design by
        <i>hippl</i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();

import { useSocialSharing } from "@/composables/socialSharing";

const { share } = useSocialSharing();
</script>