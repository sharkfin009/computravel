<template>
  <NuxtLink :to="`/article/${props.article.attributes.slug}`">
    <div
      class="
        w-[320px]
        h-[400px]
        grid grid-rows-2
        overflow-hidden
        shadow
        hover:shadow-none
        rounded-lala
        bg-white
      "
    >
      <nuxt-img
        :src="
          props.article.attributes.featured_image.data[0].attributes.url.replace(
            'https://res.cloudinary.com/sharkfin/image/upload',
            ''
          )
        "
        :alt="
          props.article.attributes.featured_image.data[0].attributes
            .alternativeText
        "
        width="320"
        height="200"
        format="webp"
      />

      <div class="flex flex-col justify-between items-center px-5">
        <div class="w-full text-center text-base text-gray-800">
          {{
            new Date(props.article.attributes.date).toLocaleDateString(
              "eng-GB",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )
          }}
        </div>

        <div class="flex flex-col justify-evenly">
          <div class="w-full font-titillium font-semibold text-xl">
            <h3 class="text-center">
              {{ props.article.attributes.title }}
            </h3>
          </div>
        </div>
        <div class="flex flex-col justify-evenly">
          <div class="w-full font-light text-gray-800 text-sm">
            <div class="text-center" v-html="bodyEllipsis"></div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
  },

  moreLikeThis: {
    type: Boolean,
  },
});

const { $ellipsis } = useNuxtApp();

const bodyEllipsis = computed(() => {
  return $ellipsis(props.article.attributes.body, 150);
});
</script>

