export const useMenuData = () => {
  const menuData = ref(null);
  const menuError = ref(null);
  const config = useRuntimeConfig();
  let graph = (query) => {
    return fetch(config.strapiUrl + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((data) => data.json())
      .then((data) => data.data);
  };
  let regionQuery = `
  query{regions{
    data{
        attributes{
            name
        }
    }
  }}
  `;
  let countryQuery = `
  query{countries{
    data{
        attributes{
            name
        }
    }
  }}
  `;
  let provinceQuery = `
  query{provinces{
    data{
        attributes{
            name
        }
    }
  }}
  `;
  let cityQuery = `
  query{cities{
    data{
        attributes{
            name
        }
    }
  }}
  `;
  let categoryQuery = `
  query{categories{
    data{
        attributes{
            name
        }
    }
  }}
  `;

  Promise.all([
    graph(regionQuery),
    graph(countryQuery),
    graph(provinceQuery),
    graph(cityQuery),
    graph(categoryQuery),
  ])
    .then((values) => {
      menuData.value = {
        regions: values[0].regions.data.map((item) => item.attributes.name),
        countries: values[1].countries.data.map((item) => item.attributes.name),
        provinces: values[2].provinces.data.map((item) => item.attributes.name),
        cities: values[3].cities.data.map((item) => item.attributes.name),
        categories: values[4].categories.data.map(
          (item) => item.attributes.name
        ),
      };
    })
    .catch((error) => console.log(error));

  return {
    menuData,
    error: menuError,
  };
};
