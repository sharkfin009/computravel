<template>
  <div class="fixed inset-0 h-screen w-screen">
    <!-- bg -->
    <nuxt-img
      class="absolute inset-0 h-screen w-screen object-cover"
      :src="
        image.url.replace(
          'https://res.cloudinary.com/sharkfin/image/upload',
          ''
        )
      "
      :alt="image.alternativeText"
    />
    <div class="absolute inset-0 grid grid-rows-[min-content,auto]">
      <!-- desktop logo -->
      <div class="flex items-center p-10">
        <NuxtLink class="text-primary pointer-events-auto" to="/">
          <div
            class="
              bg-opacity-90 bg-green-avo
              rounded-full
              shadow
              w-[150px]
              md:w-[220px]
              justify-center
              flex
              items-center
              p-5
            "
          >
            <IconComputravelLogo class="h-[30px] md:h-[40px]" />
          </div>
        </NuxtLink>
      </div>
      <!-- content -->
      <div
        class="
          flex flex-col
          gap-5
          justify-end
          items-center
          pb-[20vh]
          text-white
        "
      >
        <h2 class="text-6xl">404</h2>
        <h5 class="text-xl">
          Oops! Looks like you've found an unknown destination
        </h5>
        <CompuButton @click="$router.go(-1)" class="bg-green-avo text-lime-500"
          >take me back</CompuButton
        >
        <a class="text-lime-500 underline" href="/">or return to homepage</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const graphql = useStrapiGraphQL();

let image = await graphql(`
  query {
    image404 {
      data {
        attributes {
          image {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
        }
      }
    }
  }
`);

image = image.data.image404.data.attributes.image.data.attributes;
</script>