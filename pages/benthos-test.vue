<template>
  <pre>{{ data[data.length - 1] }}</pre>
</template>
<script setup>
let data = ref({ key: "value" });
onMounted(() => {
  const { $graphql } = useNuxtApp();
  $graphql(`
        query {
          tests {
            data {
              id
              attributes {
                title
                createdAt
              }
            }
          }
        }
      `)
    .then((response) => {
      data.value = response.data.tests.data;
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

