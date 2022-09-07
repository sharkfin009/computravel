export const useGraph = (query) => {
  const data = ref(null);
  const error = ref(null);

  const { $graphql } = useNuxtApp();

  $graphql(query)
    .then((response) => {
      data.value = response.data;
    })

    .catch((error) => {
      data.value = error;
    });

  return {
    data,
    error,
  };
};
