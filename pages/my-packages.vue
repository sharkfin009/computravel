<template>
  <div>
    <div
      class="
        relative
        bg-slate-50
        flex flex-col
        items-center
        p-10
        md:px-14
        justify-evenly
      "
    >
      <div class="flex flex-col items-center py-5 justify-center">
        <CompuButton
          class="bg-lime-500"
          v-if="enquiryState.listDirtyState && enquiryState.enquirySent"
          @click="updateList()"
          >Send your updated list to us</CompuButton
        >
        <div v-if="!enquiryState.enquirySent">
          <NuxtLink to="/enquire-form">
            <CompuButton class="bg-lime-500">submit your enquiry</CompuButton>
            <div class="py-5 text-xs text-center">
              You may edit your favorites later
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="flex">
        <h3 class="text-2xl font-bold font-titillium text-center w-full pb-10">
          These are the packages I am interested in:
        </h3>
      </div>
      <div class="flex justify-center flex-wrap gap-10 max-w-[80vw]">
        <div
          class="flex flex-col"
          v-for="(card, index) in enquiryState.myPackages"
          :key="index"
        >
          <Card class="w-full" :package="card" />
          <div class="w-full flex justify-center py-5">
            <i
              class="
                fa-regular fa-trash-can
                pointer-events-auto
                hover:scale-150
                transition
                duration-200
                cursor-pointer
              "
              @click="removeFavorite(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <transition name="fade" v-if="enquiryState.showUpdateModal">
      <ConfirmModal type="addFavorite" :showRef="true">
        <template #header> Thank you for your update </template>
        <template #body
          >One of our travel experts will be in touch soon.</template
        >
      </ConfirmModal>
    </transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
import { useStore } from "@/stores/package";
let store = useStore();
import { useenquiry } from "@/stores/enquiry";
const enquiryState = useenquiry();

onMounted(() => {
  if (localStorage.getItem("enquirySent")) {
    enquiryState.enquirySent = true;
  }

  if (localStorage.getItem("my-packages")) {
    enquiryState.myPackages = JSON.parse(localStorage.getItem("my-packages"));
  }
  console.log(store.package);
  if (
    store.package &&
    !enquiryState.myPackages
      .map((item) => item.supplier_ref)
      .includes(store.package.supplier_ref)
  ) {
    enquiryState.myPackages.push(store.package);
    enquiryState.listDirtyState = true;
  }

  localStorage.setItem("my-packages", JSON.stringify(enquiryState.myPackages));
});
const removeFavorite = (index) => {
  let array = enquiryState.myPackages;
  array.splice(index, 1);
  localStorage.setItem("my-packages", JSON.stringify(array));
  enquiryState.myPackages = array;
  enquiryState.listDirtyState = true;
};

const { $graphql } = useNuxtApp();
const updateList = () => {
  let list = "";
  if (localStorage.getItem("my-packages")) {
    let packages = JSON.parse(localStorage.getItem("my-packages"));
    let ids = packages.map((item) => item.id);
    console.log(ids);
    list = "packages: " + JSON.stringify(ids);
  }
  const query = `
    mutation{
        updateEnquiry(id:${enquiryState.enquiryId}
        data:{
            ${list}
        }){
            data{attributes{
                ref
            }}
        }
    }
        `;
  $graphql(query).then((response) => {
    response.value = response.data;
    enquiryState.listDirtyState = false;
    enquiryState.showUpdateModal = true;
  });
};
function ellipsis(text, length) {
  if (text.length > length) {
    let cutTextChars = text.substring(0, length);
    let lastWord = cutTextChars.split(" ").pop(-1);
    let cutText = cutTextChars.slice(0, cutTextChars.length - lastWord.length);
    return cutText + "...";
  } else return text;
}
</script>
