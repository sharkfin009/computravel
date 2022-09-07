import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(function (nuxtApp) {
  const config = useRuntimeConfig();
  const graphql = (queryString) => {
    return new Promise((resolve, reject) => {
      fetch(config.strapiUrl + "/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queryString,
        }),
      })
        .then((response) => response.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  };
  return {
    provide: {
      graphql: graphql,
    },
  };
});
