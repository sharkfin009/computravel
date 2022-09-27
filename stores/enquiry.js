import { defineStore } from "pinia";

export const useenquiry = defineStore("enquiry", {
  state: () => ({
    showConfirmation: ref(false),
    enquirySent: ref(false),
    listDirtyState: ref(true),
    enquiryRef: ref(""),
    enquiryId: ref(""),
    showUpdateModal: ref(false),
    myPackages: ref([]),
  }),
});
