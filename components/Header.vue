<template>
  <div
    class="sticky top-0 w-full z-50 flex flex-col pointer-events-none"
    :class="{ 'bg-slate-50': route.path !== '/' }"
  >
    <div
      class="
        relative
        flex
        h-[66px]
        md:h-[90px]
        w-full
        justify-between
        py-3
        lg:px-5
        px-5
      "
    >
      <!-- desktop logo -->
      <NuxtLink class="text-primary pointer-events-auto" to="/">
        <div
          class="
            bg-opacity-90 bg-green-avo
            rounded-full
            shadow
            w-[150px]
            md:w-[220px]
            justify-center
            h-full
            flex
            items-center
          "
        >
          <IconComputravelLogo class="h-[30px] md:h-[40px]" />
        </div>
      </NuxtLink>

      <div class="hidden md:flex items-center pointer-events-autp">
        <SearchBar
          v-if="route.path !== '/'"
          class="w-[250px]"
          :parent="'header'"
        />
      </div>

      <div class="flex pointer-events-auto">
        <!--  enq now button: -->
        <div class="hidden lg:flex" v-if="route.path == '/'">
          <NuxtLink t>
            <CompuButton
              class="
                !text-center
                inset-0
                bg-opacity-90 bg-green-avo
                !h-full
                text-gray-600
                mr-5
              "
              @click="scrollTo('faves')"
              >holiday packages</CompuButton
            >
          </NuxtLink>
          <NuxtLink>
            <CompuButton
              class="
                !text-center
                inset-0
                bg-opacity-90 bg-green-avo
                !h-full
                text-gray-600
                mr-5
              "
              @click="scrollTo('flights')"
              >flights</CompuButton
            >
          </NuxtLink>
          <NuxtLink>
            <CompuButton
              class="
                !text-center
                inset-0
                bg-opacity-90 bg-green-avo
                !h-full
                text-gray-600
                mr-5
              "
              @click="scrollTo('dests')"
              >destinations</CompuButton
            >
          </NuxtLink>
        </div>
        <div class="relative">
          <TooltipLeft v-if="firstVisit && /packages/.test($route.path)">
            When you're ready to send your enquiry, click here
          </TooltipLeft>
          <NuxtLink to="/enquire-form" v-if="!hasPackages()">
            <CompuButton class="!text-center inset-0 bg-lime-500 !h-full mr-5"
              >enquire now</CompuButton
            >
          </NuxtLink>
          <NuxtLink
            to="/my-packages"
            v-if="hasPackages() && $route.path !== '/my-packages'"
          >
            <CompuButton class="inset-0 bg-lime-500 !h-full mr-5"
              >view my favorites</CompuButton
            >
          </NuxtLink>
        </div>

        <!-- hamburger -->
        <div
          @click.stop="showMenu"
          class="
            flex
            justify-center
            items-center
            bg-green-avo
            rounded-full
            bg-opacity-80
            shadow
            flex
            w-[45px]
            md:w-[69px]
            cursor-pointer
            z-10
            hover:bg-lime-100
            transition
            duration-300
          "
          :class="{
            'opacity-0': globalStore.showMenu == true,
          }"
        >
          <i class="text-stone-600 text-xl fa-solid fa-bars" />
        </div>
      </div>
    </div>
    <!-- mobile search bar -->
    <div
      v-if="route.path !== '/'"
      class="block md:hidden w-full flex justify-evenly items-center pt-1 pb-4"
    >
      <SearchBar class="w-[80%]" :parent="'header'" />
    </div>

    <!-- MODALs -->

    <transition name="fade">
      <ConfirmModal
        :showRef="true"
        type="enquiry"
        v-if="enquiry.showConfirmation"
      >
        <template #header> Thank you for your enquiry! </template>
        <template #body>
          One of our travel experts will be in touch soon.</template
        >
      </ConfirmModal>
    </transition>

    <transition name="fade">
      <ConfirmModal
        :showRef="false"
        type="Subscribe"
        v-if="subscriptionState.showConfirmation"
      >
        <template #header> Thank you for your subscription! </template>
        <template #body> You will receive our next newsletter.</template>
      </ConfirmModal>
    </transition>
    <transition name="fade">
      <Menu v-if="globalStore.showMenu" />
    </transition>

    <SocialShares />
  </div>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();
const route = useRoute();
import { useenquiry } from "@/stores/enquiry";
const enquiry = useenquiry();
import { useSubscription } from "@/stores/subscription";
const subscriptionState = useSubscription();
const showMenu = () => {
  globalStore.showMenu = true;
};
const firstVisit = ref(true);

onMounted(() => {
  if (localStorage.getItem("my-packages")) {
    enquiry.myPackages = JSON.parse(localStorage.getItem("my-packages"));
  }

  firstVisit.value = localStorage.getItem("visitCount") == "1";
});
const hasPackages = () => {
  return localStorage.getItem("my-packages");
};
const enquirySent = () => {
  return localStorage.getItem("enquiry-sent");
};

const scrollTo = (target) => {
  globalStore.homePageScroll = target;
};
</script>