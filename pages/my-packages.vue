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
      <div class="flex">
        <h3 class="text-2xl font-bold font-titillium text-center w-full pb-10">
          These are the packages I am interested in:
        </h3>
      </div>
      <div class="flex justify-center flex-wrap gap-10 max-w-[80vw]">
        <div
          class="flex flex-col"
          v-for="(card, index) in myPackages"
          :key="index"
        >
          <Card class="w-full" :package="card.attributes" />
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
    </div>

    <transition name="fade" v-if="enquiryState.showUpdateModal">
      <ConfirmModal>
        <h3 class="text-xl md:text-6xl font-bold">
          Thank you for your update!
        </h3>
        <p class="text-2xl">One of our travel experts will be in touch soon.</p>
        <div>
          Your enquiry reference is
          <span class="text-lime-500"> {{ enquiryState.enquiryRef }} </span>
        </div>
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

let myPackages = ref([]);
onMounted(() => {
  if (localStorage.getItem("enquirySent")) {
    enquiryState.enquirySent = true;
  }

  if (localStorage.getItem("my-packages")) {
    myPackages.value = JSON.parse(localStorage.getItem("my-packages"));
  }
  console.log("myPacks:", myPackages.value);

  if (
    store.package.attributes &&
    !myPackages.value
      .map((item) => item.attributes.supplier_ref)
      .includes(store.package.attributes.supplier_ref)
  ) {
    myPackages.value.push(store.package);
    enquiryState.listDirtyState = true;
  }

  localStorage.setItem("my-packages", JSON.stringify(myPackages.value));
});
const removeFavorite = (index) => {
  myPackages.value.splice(index, 1);
  localStorage.setItem("my-packages", JSON.stringify(myPackages.value));
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
