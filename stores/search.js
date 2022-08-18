import { defineStore } from "pinia";

export const useStore = defineStore("search", {
  state: () => ({
    findQuery: ref(""),
    activeInput: ref(""),
    results: [],
    region: "",
    destination: ref(''),
    destinationType:ref('subdestination'),
    from_date: "",
    to_date: "",
    price_min: ref(0),
    price_max: ref(100000),
    category: "All",
    sort_by: "price:asc",
    loadingState: false,
    fallbackResults: ref([]),
    firstLoad: ref(true)
  }),
  actions: {
    fireQuery() {
      this.fallbackResults = []
      this.results = [];
      this.loadingState = true;
      const graphql = useStrapiGraphQL();
      let noDestinationFilter = false;
      let noRegionFilter = false;
      let destinationFilterString
      if (this.destination== '') {
        destinationFilterString = '';
      } else {
        destinationFilterString = `${this.destinationType}:{ eq:"${this.destination}"}`
      }

      let DatesFilter = true;
      if (this.to_date == "" && this.from_date == "") {
        DatesFilter = false;
      }
      
      let dateFilterString = DatesFilter
        ? ` from:{ between:["${this.from_date}","${this.to_date}"]}`
        : "";
      
      let priceFilterString = ` price:{between:[${this.price_min},${this.price_max}]}`;
      let categoryFilterString =
        this.category !== "All" ? ` category:{eq:"${this.category}"}` : "";
      let query = `
            query{packages(
              sort: "${this.sort_by}",
              filters: {${destinationFilterString}  ${priceFilterString}  ${categoryFilterString} ${dateFilterString}},
            pagination:{page:1,pageSize:16}
            ){
                data{
                  attributes{
                      title
                      slug
                      supplier_ref
                   description
                   subdestination
                   destination
                   price
                   valid_to
                   image_url_md
                   star_rating
                   category
                   from
                  }
                }
              }}
            `;
      graphql(query)
        .then((response) => {
          this.results = response.data.packages.data;
          this.loadingState = false;
        })
        .catch((error) => {
          data.value = error;
        });
    },
    fireDefaultQuery() {
      this.findQuery = "";
      const graphql = useStrapiGraphQL();
      this.loadingState = true;
      let query = `
            query{packages(
              sort:"title"
                pagination:{page:1,pageSize:30}
                ){
                data{
                    attributes{
                      title
                   description
                   subdestination
                   destination
                   price
                   valid_to
                   supplier_ref
                   supplier
                   image_url_md
                   star_rating
                   from
                  }
                }
              }}
            `;
      graphql(query)
        .then((response) => {
          function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
            return array
          }
          this.fallbackResults = shuffle(response.data.packages.data);
          
          this.loadingState = false;
          this.noResults = true;
        })
        .catch((error) => {
          data.value = error;
        });
    },
  },
  
});
