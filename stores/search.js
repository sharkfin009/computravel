import { defineStore } from "pinia";

export const useStore = defineStore("search", {
  state: () => ({
    activeInput: ref(""),
    results: [],
    region: "",
    destinationQuery: ref(""),
    destinationType: ref("destination"),
    from_date: "",
    to_date: "",
    price_min: ref(0),
    price_max: ref(100000),
    category: "All",
    sort_by: "Price low to high",
    loadingState: false,
    randomResults: ref([]),
    firstLoad: ref(true),
  }),
  actions: {
    fireQuery() {
      this.randomResults = [];
      this.results = [];
      this.loadingState = true;
      let destinationMap = {
        region: `region:{ eq:"${this.destinationQuery}"}`,
        destination: `destination:{ eq:"${this.destinationQuery}"}`,
        city: `city:{name:{eq:"${this.destinationQuery}"}}`,
      };
      const { $graphql } = useNuxtApp();
      let noDestinationFilter = false;
      let noRegionFilter = false;
      let destinationFilterString;
      if (this.destinationQuery == "") {
        destinationFilterString = "";
      } else {
        destinationFilterString = destinationMap[this.destinationType];
      }

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
          ? ` category:{eq:"${this.category}"}`
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
                   uploaded_images{
                    data{
                      attributes{
                        url
                      }
                    }
                   } 
                   image_urls 
                   star_rating
                   category
                   from
                  }
                }
              }}
            `;
      $graphql(query)
        .then((response) => {
          this.results = response.data.packages.data;
          console.log(this.results);
          this.loadingState = false;
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
             uploaded_images{
              data{
                attributes{
                  url
                }
              }
             } 
             image_urls
             star_rating
             category
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
