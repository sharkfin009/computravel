<template>
  <div v-if="data">
    <div
      class="policies p-2 md:p-20"
      v-html="data.data.termsAndConditionsDocument.data.attributes.content"
    />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});

const { data, error } = useGraph(`
query{termsAndConditionsDocument{
  data{attributes{
    content
  }}
}}
`);
</script>

<style scoped>
</style>