<template>
  <div
    class="
      md:pt-24
      grid grid-rows-[auto,auto,auto]
      gap-3
      bg-slate-800
      text-white
      px-10
      pb-12
      md:px-20
      xl:px-40
      pt-24
      xl:pt-0
    "
  >
    <div class="sm:grid sm:grid-cols-2 gap-3">
      <div class="flex flex-col justify-center gap-10 lg:pr-20">
        <h3 class="font-titillium text-5xl">about computravel</h3>
        <p>
          Computravel serves as an online South African travel agent, boasting
          highly professional experts with years in the tourism and hospitality
          industries.
        </p>
      </div>
      <div class="flex justify-center items-center">
        <img width="250" src="/public/asata-logo-full-500-sq-transp.png" />
      </div>
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
            <a class="cursor-pointer" href="mailto:info@computravel.co.za"
              >info@computravel.co.za</a
            ><br />
            <a class="cursor-pointer" href="mailto:enquiry@computravel.co.za"
              >enquiry@computravel.co.za</a
            >
          </div>

          <div class="flex justify-start items-center">
            <CompuButton
              v-if="
                enquiry.showEnquireNow == false && enquiry.enquirySent == false
              "
              @mousedown="enquiry.showEnquireNow = true"
              class="bg-lime-500"
              >enquire now</CompuButton
            >
          </div>
          <div class="flex justify-start gap-5 items-center">
            <IconFacebook
              class="hover:scale-150 transition-transform ease-out duration-500"
            />
            <IconInstagram
              class="hover:scale-150 transition-transform ease-out duration-500"
            />
            <IconLinkedin
              class="hover:scale-150 transition-transform ease-out duration-500"
            />
          </div>
        </div>
      </div>
      <div class="grid lg:grid lg:grid-cols-2 gap-3">
        <div class="">
          <div class="h-[60px] flex items-center">
            <h4 class="font-bold">legal</h4>
          </div>
          <ul class="list-none text-base">
            <li>sacoronavirus.co.za</li>
            <li>Terms And Conditions</li>
            <li>Disclaimer</li>
            <li>Fraud Disclaimer Policy</li>
            <li>Section 51 PAIA Manual</li>
          </ul>
        </div>
        <div class="">
          <div class="h-[60px] flex items-center">
            <h4 class="font-bold">data, privacy and more</h4>
          </div>
          <ul class="list-none text-base">
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Careers</li>
            <li>FAQs</li>
            <li>Travel Tips</li>
          </ul>
        </div>
        <div class=""></div>
      </div>
    </div>
    <div class="bg-slate-800 flex justify-center pt-8 px-5 pb-5">
      <div class="m-0 p-0 text-center text-xs">
        Website custom coded by Ben Amato from <i>iSimon</i>, design by
        <i>hippl</i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
</script>
