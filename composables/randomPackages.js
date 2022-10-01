export const useRandomPackages = () => {
  const packages = ref(null);
  const error = ref(null);

  const config = useRuntimeConfig();
  let query = `
            query{packages(
       
                pagination:{page:1,pageSize:3}
                ){
                data{
                    attributes{
                      title
                      slug
                   description
                   region
                   destination
                   price
                   valid_to
                   supplier_ref
                   
                   image_url_md
                   star_rating
                   from
                  }
                }
              }}
            `;

  fetch(config.strapiUrl + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      packages.value = res.data.packages.data.sort(() => Math.random() - 0.5);
      console.log(res);
    })
    .catch((error) => (error.value = error));
  return {
    packages,
    error,
  };
};
