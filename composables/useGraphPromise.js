export const useGraphPromise = (query) => {
  const config = useRuntimeConfig();
  return fetch(config.strapiUrl + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((response) => response.json())
    .then((res) => res)
    .catch((error) => (error.value = error));
};
