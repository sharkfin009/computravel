<template>
  <div v-if="data">
    <div
      class="policies p-2 md:p-20"
      v-html="data.data.cookiePolicy.data.attributes.content"
    />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});

const { data, error } = useGraph(`
query{cookiePolicy{
  data{attributes{
    content
  }}
}}
`);
</script>

<style scoped>
</style>