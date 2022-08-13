import { defineStore } from "pinia";

export const useStore = defineStore("favourites", {
  state: () => ({
    favourites: [],
    destination_activeTab: 0,
  }),
  getters: {
    // getImages()
  },

  actions: {
    fetchPackages() {
      const graphql = useStrapiGraphQL();

      graphql(`
        query {
          favourites {
            data {
              attributes {
                package {
                  data {
                    attributes {
                      title
                      countries
                      country
                      starts
                      destination
                      price
                      includes
                      excludes
                      duration
                      from
                      to
                      star_rating
                      description
                      terms
                      supplier_ref
                      supplier
                      images
                      valid_to
                    }
                  }
                }
              }
            }
          }
        }
      `)
        .then((response) => {
          this.favourites = response.data.favourites.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
