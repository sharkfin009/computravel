<template>
  <div
    class="
      relative
      bg-slate-50
      flex flex-col
      items-center
      p-10
      md:px-14justify-evenly
    "
  >
    <div class="flex">
      <h3 class="text-2xl font-bold font-titillium text-center w-full pb-10">
        These are the packages I am interested in:
      </h3>
    </div>
    <div class="flex justify-center gap-10">
      <div class="" v-for="(card, index) in myPackages" :key="index">
        <Card
          class="w-full"
          :package="card.attributes"
          :trashCan="true"
          :moreLikeThis="true"
        />
      </div>
    </div>

    <div class="flex flex-col items-center py-5 justify-center">
      <CompuButton
        class="bg-lime-500"
        v-if="enquiryState.listDirtyState && enquiryState.enquirySent"
        @click="updateList()"
        >Send your updated list to us</CompuButton
      >
      <div v-if="enquireButtonLogic">
        <CompuButton class="bg-lime-500" @click="enquire"
          >submit your enquiry</CompuButton
        >
        <div class="py-5 text-xs text-center">
          You may edit your favorites later
        </div>
      </div>
    </div>
  </div>

  <transition name="fade" v-if="enquiryState.showUpdateModal">
    <ConfirmModal>
      <h3 class="text-xl md:text-6xl font-bold">
        Thankyou for your update to your list!
      </h3>
      <p>One of our travel experts will be in touch soon.</p>
      <div>
        Your enquiry reference is
        <span class="text-lime-500"> {{ enquiryState.enquiryRef }} </span>
      </div>
    </ConfirmModal>
  </transition>
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
let showEnquireNow = ref(false);
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
const remove = (index) => {
  myPackages.value.splice(index, 1);
  localStorage.setItem("my-packages", JSON.stringify(myPackages.value));
  enquiryState.listDirtyState = true;
};
const enquireButtonLogic = computed(() => {
  return !enquiryState.showEnquireFormMyPackages && !enquiryState.enquirySent;
});
const graphql = useStrapiGraphQL();

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
  graphql(query).then((response) => {
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

const enquire = () => {
  enquiryState.showEnquireNow = true;
  navigateTo({
    path: "/",
  });
};
</script>
