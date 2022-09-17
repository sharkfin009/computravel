export const useGraph = (query) => {
  const data = ref(null);
  const error = ref(null);

  const config = useRuntimeConfig();
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
    .then((res) => (data.value = res))
    .catch((error) => (error.value = error));
  return {
    data,
    error,
  };
};
