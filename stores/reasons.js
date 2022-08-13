import { defineStore } from "pinia";

export const useStore = defineStore("reasons", {
  state: () => ({
    reason_activeTab: 0,
    reasons: [],
  }),

  actions: {
    getReasons() {
      const graphql = useStrapiGraphQL();
      graphql(`
        query {
          reasons {
            data {
              id
              attributes {
                title
                subtitle
                content
                image_path
              }
            }
          }
        }
      `)
        .then((response) => {
          this.reasons = response.data.reasons.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
