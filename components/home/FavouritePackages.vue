<template>
  <HomeSectionLayout bgColor="bg-green-avo">
    <div>
      <!-- top row -->
      <SectionHeading
        heading="holiday packages"
        subheading="our favourite"
        :inverted="true"
        class=""
      />
      <!-- desktop cards: -->
      <div class="hidden md:grid w-full grid-cols-[80px,auto,80px]">
        <div class="flex items-center justify-center">
          <IconChevronLeft
            class="cursor-pointer hover:scale-110"
            @click="scrollLeft"
          />
        </div>

        <div class="overflow-x-auto lg:snap-x lg:snap-mandatory" ref="cardRow">
          <div ref="" class="card-grid flex pb-8">
            <div
              v-for="(fave, index) in faves.data.favourites.data.map(
                (item) => item.attributes.package.data.attributes
              )"
              :key="index"
              class="snap-center"
            >
              <Card class="" :package="fave" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <IconChevronRight
            class="cursor-pointer hover:scale-110"
            @click="scrollRight"
          />
        </div>
      </div>

      <!-- mobile cards: -->
      <div class="flex justify-center md:hidden relative md:pt-10">
        <div class="relative w-[320px] h-[400px]">
          <card
            v-for="(fave, index) in faves.data.favourites.data.map(
              (item) => item.attributes.package.data.attributes
            )"
            :key="index"
            :package="fave"
            class="absolute inset-0 transition-opacity opacity-0 duration-1000"
            :class="{ '!opacity-100': index == browsePointer }"
          ></card>
        </div>
      </div>

      <div class="flex justify-center items-center h-full py-5">
        <NuxtLink to="/search">
          <CompuButton
            class="bg-black hidden lg:flex mx-10 md:mx-20 shadow-2xl mb-5"
          >
            view more holidays
          </CompuButton>
        </NuxtLink>
        <div class="flex lg:hidden w-full justify-evenly">
          <IconChevronLeft class="cursor-pointer" @click="browseLeft" />
          <IconChevronRight class="cursor-pointer" @click="browseRight" />
        </div>
      </div>
    </div>
  </HomeSectionLayout>
</template>

<script setup>
definePageMeta({
  layout: "section",
});
const graphql = useStrapiGraphQL();

const faves = await graphql(`
  query {
    favourites {
      data {
        attributes {
          package {
            data {
              attributes {
                slug
                title
                region
                destination
                price
                includes
                excludes
                duration
                from
                to
                star_rating
                description
                terms
                supplier_ref
                images {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
                }
                category {
                  data {
                    attributes {
                      name
                    }
                  }
                }

                valid_to
              }
            }
          }
        }
      }
    }
  }
`);
console.log(faves);

const cardRow = ref(null);

cardRow.scrollBehavior = "smooth";
var scrollAmount = 0;

const scrollRight = () => {
  cardRow.value.scrollTo({
    top: 0,
    left: Math.max((scrollAmount += 500), 1000),
    behavior: "smooth",
  });
};

const scrollLeft = () => {
  cardRow.value.scrollTo({
    top: 0,
    left: Math.max((scrollAmount -= 500), 0),
    behavior: "smooth",
  });
};
const browsePointer = ref(0);
setInterval(() => {
  if (browsePointer.value < faves.data.favourites.data.length - 1) {
    browsePointer.value++;
  } else {
    browsePointer.value = 0;
  }
}, 5000);
const browseLeft = () => {
  if (browsePointer.value > 0) {
    browsePointer.value--;
  } else browsePointer.value = faves.data.favourites.data.length - 1;
};
const browseRight = () => {
  if (browsePointer.value < faves.data.favourites.data.length - 1) {
    browsePointer.value++;
  } else browsePointer.value = 0;
};
</script>

<style>
.card-grid > * + * {
  margin-left: 2rem;
}
</style>