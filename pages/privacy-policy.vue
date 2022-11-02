<template>
  <div v-if="data">
    <div
      class="policies p-2 md:p-20"
      v-html="data.data.privacyPolicy.data.attributes.content"
    />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});

const { data, error } = useGraph(`
query{privacyPolicy{
  data{attributes{
    content
  }}
}}
`);
</script>

<style scoped>
</style>