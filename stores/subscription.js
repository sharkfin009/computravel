import { defineStore } from "pinia";

export const useSubscription = defineStore("enquiry", {
  state: () => ({
    showConfirmation: ref(false),
    subscribed: ref(false),
  }),
});
