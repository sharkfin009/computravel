import { defineStore } from "pinia";

export const useStore = defineStore("search", {
  state: () => ({
    activeInput: ref(""),
    results: [],
    findQuery: ref(""),
    destinationType: ref(""),
    loadingState: false,
    randomResults: ref([]),
    firstLoad: ref(true),
    //filters:
    region: "",
    country: "",
    province: "",
    city: "",
    category: "All",
    from_date: "",
    to_date: "",
    price_min: ref(0),
    price_max: ref(100000),
    sort_by: "Price low to high",
  }),
  actions: {
    fireQuery() {
      this.firstLoad = false;
      this.randomResults = [];
      this.results = [];
      this.loadingState = true;
      // set up filter for region / destination:
      let destinationMap = {
        region: `region:{ eq:"${this.findQuery}"}`,
        country: `destination:{ eq:"${this.findQuery}"}`,
        province: `destination:{ eq:"${this.findQuery}"}`,
        city: `city:{name:{eq:"${this.findQuery}"}}`,
      };
      let destinationFilterString = "";
      if (this.findQuery !== "") {
        destinationFilterString = destinationMap[this.destinationType];
      }

      const { $graphql } = useNuxtApp();
      let noDestinationFilter = false;
      let noRegionFilter = false;

      let DatesFilter = true;
      if (this.to_date == "" && this.from_date == "") {
        DatesFilter = false;
      }
      let hashMap = new Map([
        ["Price high to low", "price:desc"],
        ["Price low to high", "price:asc"],
      ]);

      let sortString = hashMap.get(this.sort_by);
      let dateFilterString = DatesFilter
        ? ` from:{ between:["${this.from_date}","${this.to_date}"]}`
        : "";

      let priceFilterString = ` price:{between:[${this.price_min},${this.price_max}]}`;
      let categoryFilterString =
        this.category !== "All" && this.category !== null
          ? ` category:{name:{eq:"${this.category}"}}`
          : "";
      let query = `
            query{packages(
              sort: "${sortString}",
              filters: {${destinationFilterString}  ${priceFilterString}  ${categoryFilterString} ${dateFilterString}},
            pagination:{page:1,pageSize:16}
            ){
                data{
                  attributes{
                      title
                      slug
                      supplier_ref
                   description
                   region
                   destination
                   price
                   valid_to
                   images{
                    data{
                      attributes{
                        url
                        alternativeText
                      }
                    }
                   } 
                   star_rating
                   category{
                    data{
                      attributes{
                        name
                      }
                    }
                   }
                   from
                  }
                }
              }}
            `;
      $graphql(query)
        .then((response) => {
          this.results = response.data.packages.data;
          this.loadingState = false;
          let temp = this[this.destinationType];
          this.region = "";
          this.country = "";
          this.province = "";
          this.city = "";
          this[this.destinationType] = temp;
        })

        .catch((error) => {
          console.log(error);
        });
    },
    randomQuery() {
      const { $graphql } = useNuxtApp();
      this.loadingState = true;
      let query = `
      query{packages(
      pagination:{page:1,pageSize:32}
      ){
          data{
            attributes{
                title
                slug
                supplier_ref
             description
             region
             destination
             price
             valid_to
             images{
              data{
                attributes{
                  url
                  alternativeText
                }
              }
             } 
             star_rating
             category{
              data{
                attributes{
                  name
                }
              }
             }
             from
            }
          }
        }}
            `;
      $graphql(query)
        .then((response) => {
          function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
            return array;
          }
          this.randomResults = shuffle(response.data.packages.data);

          this.loadingState = false;
          this.noResults = true;
        })
        .catch((error) => {
          data.value = error;
        });
    },
  },
});
