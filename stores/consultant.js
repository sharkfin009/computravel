import { defineStore } from "pinia";


export const useConsultantStore = defineStore("consultant", {
  state: () => ({
    id: ref(""),
    email: ref(""),
    user_name: ref(""),
    logged_in: ref(false),
    active: ref(true),
    token: ref(""),
    enquiries: ref([]),
    consultantSessionKey: ref(""),
    currentEnquiry:ref()
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
        });
    },

    logIn(state) {
      // hit login endpoint:
      console.log(state);
      const config = useRuntimeConfig();
      let success = "";
      return fetch(config.strapiUrl + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
        body: JSON.stringify({
          data: {
            email: state.email,
            password: state.password,
          },
        }),
      })
        .then((response) => response.json())
        .then((response) => {

          if (response.result == "success") {
          
            //  populate consultant into store
            (this.id = response.id),
              (this.email = response.email),
              (this.user_name = response.user_name);
            this.active = response.active;
            this.logged_in = true;
            let monthOfSeconds = 60 * 60 * 24 * 30;
            document.cookie =
              "computravel_consultant_session=" +
              response.key.toString() +
              "; Max-Age=" +
              monthOfSeconds +
              " ; Secure";

            return true;
          } else {
            return false;
          }
        });
       
    },
    getConsultantSessionKey() {
      // hit  key login endpoint:
      const config = useRuntimeConfig();
      fetch(config.strapiUrl + "/api/get-user/" + this.consultantSessionKey, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.result == "success") {
            //  populate consultant into store
            (this.id = response.id),
              (this.email = response.email),
              (this.user_name = response.user_name);
            this.active = response.active;
            this.logged_in = true;
            return true;
          } else {
            return false;
          }
        });
    },
    getEnquiries() {
      const config = useRuntimeConfig();
      fetch(
        config.strapiUrl + "/api/getmyenquiries/" + this.consultantSessionKey,
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => (this.enquiries = data));
    },
    // vanilla strapi endpoint:
    toggleActive() {
      const config = useRuntimeConfig();
      fetch(config.strapiUrl + "/api/consultants/" + this.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
        body: JSON.stringify({
          data: {
            active: !this.active,
          },
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          this.active = json.data.attributes.active;
        })
        .catch((error) => console.log(error));
    },
    acceptEnquiry(enquiryId){
      const config = useRuntimeConfig()
      fetch(config.strapiUrl + "/api/accept-enquiry/" + enquiryId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,

        },
        body: JSON.stringify({
          data: {
            consultantId: this.id,
            key: this.consultantSessionKey,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.getEnquiries();
        })
        .catch((error) => console.log(error));
    },
    passOnEnquiry(enquiryId){
      const config = useRuntimeConfig()
      fetch(config.strapiUrl + "/api/pass-on-enquiry/" + enquiryId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,

        },
        body: JSON.stringify({
          data: {
            consultantId: this.id,
            key: this.consultantSessionKey,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.getEnquiries();
        })
        .catch((error) => console.log(error));
    }
  },
});
