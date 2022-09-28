import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    showMenu: ref(false),
    token: ref(""),
  }),
  actions: {
    frontGetPortalToken() {
      const config = useRuntimeConfig();
      return fetch(config.strapiUrl + "/api/auth/local", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          identifier: "ben.amato@gmail.com",
          password: config.strapiUser,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.token = data.jwt;
          return data.jwt;
        });
    },
  },
});
