import { defineStore } from "pinia";

export const useenquiry = defineStore("enquiry", {
  state: () => ({
    showEnquireNow: ref(false),
    showConfirmation: ref(false),
    showEnquireFormMyPackages: ref(false),
    enquirySent: ref(false),
    listDirtyState: ref(true),
    enquiryRef: ref(''),
    enquiryId: ref(''),
    showUpdateModal: ref(false)

  }),
});
