<template>
  <SearchSelect
    v-if="options"
    :label="label"
    :type="type"
    :options="
      options.data[optionsQuery].data.map((item) => item.attributes.name)
    "
    placeholder="All"
  />
</template>
<script setup>
const props = defineProps({
  label: String,
  optionsQuery: String,
  type: String,
});
let query = `
  query{${props.optionsQuery}{
    data{
        attributes{
            name
        }
    }
  }}
  `;
const { data: options, error } = useGraph(query);
</script>