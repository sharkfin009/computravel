import { defineStore } from "pinia";

export const useAdminUserStore = defineStore("adminUser", {
  state: () => ({
    id: ref(""),
    email: ref(""),
    user_name: ref(""),
    logged_in: ref(false),
    invalid_submission: ref(false),
  }),
  actions: {
    login(state) {
      const config = useRuntimeConfig();
      console.log(state);

      fetch(config.strapiUrl + "/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: state.email,
          password: state.password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.user !== undefined) {
            this.id = json.id;
            this.email = json.user.email;
            this.logged_in = true;
          }
          document.cookie = `computravel_admin=${json.jwt}; max-age=${
            60 * 60 * 24 * 365000
          }; Path=/`;
          navigateTo({
            path: "/newsletter-preview",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
