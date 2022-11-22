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
        md:mr-10
        mb-10
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
        class="object-cover h-[100%]"
        fit="cover"
      />

      <div class="grid grid-rows-[40px,80px,80px] px-5">
        <div class="flex items-end">
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
        </div>
        <div class="flex flex-col justify-center">
          <h3
            class="
              w-full
              font-titillium font-semibold
              text-xl text-center
              leading-6
            "
          >
            {{ props.article.attributes.title }}
          </h3>
        </div>
        <div class="flex flex-col justify-evenly">
          <div class="w-full text-sm">
            <div class="text-center px-3" v-html="bodyEllipsis"></div>
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
  return $ellipsis(props.article.attributes.body, 120);
});
</script>

