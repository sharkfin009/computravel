<template>

  <pre>{{data}}</pre>
</template>

<script setup>
  definePageMeta({
    layout: "home",
  });

  const graphql = useStrapiGraphQL();
  const data = ref([])
  graphql(`
  query {
    tourPackages{
      data{
        attributes{
          Title
        }
      }
    }
    }`)
    .then((response) => {
      console.log(response.data.tourPackages.data)
      data.value = response.data
    })
    .catch(error => {
      console.error(error)
    })
</script>