<template>
  <div class="px-5 md:px-20 bg-slate-50 pb-20">
    <SectionHeading
      heading="travel tips"
      subheading="current"
      :inverted="true"
    />

    <div v-if="data" class="grid lg:grid-cols-2 gap-5">
      <div
        class=""
        v-for="(tip, index) of data.data.travelTips.data"
        :key="index"
      >
        <div
          class="
            bg-white
            rounded-lala
            p-10
            shadow-lg
            flex
            justify-between
            items-center
            cursor-pointer
            text-xl
          "
          key="index"
          @click="
            showMap[tip.attributes.title]
              ? hide(tip.attributes.title)
              : show(tip.attributes.title)
          "
        >
          <div>
            {{ tip.attributes.title }}
          </div>
          <i
            v-if="!showMap[tip.attributes.title]"
            class="
              fa-solid fa-plus
              text-gray-500 text-2xl
              cursor-pointer
              hover:text-green-brand
            "
          />
          <i
            v-if="showMap[tip.attributes.title]"
            class="
              fa-solid fa-minus
              text-gray-500 text-2xl
              cursor-pointer
              hover:text-green-brand
            "
          />
        </div>
        <transition name="fade">
          <div
            v-if="showMap[tip.attributes.title]"
            class="col-span-full bg-white rounded-lala p-10 shadow-lg mt-5"
          >
            <div v-html="tip.attributes.body" class="list-circle text-base" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
const showingState = ref(false);
const showMap = ref({});
const show = (title) => {
  showingState.value = true;
  showMap.value[title] = true;
  console.log(showMap.value);
};
const hide = (title) => {
  showingState.value = false;
  showMap.value[title] = false;
  console.log(showMap.value);
};
const config = useRuntimeConfig();
const { data, pending, error, refresh } = await useFetch(
  config.strapiUrl + "/graphql",
  {
    method: "POST",
    body: {
      query: `
        query{
            travelTips{
                data{
                    attributes{
                        title
                        body
                    }
                }
            }
        }`,
    },
  }
);
</script>