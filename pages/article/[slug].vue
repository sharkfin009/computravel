<template>
  <div class="flex justify-center">
    <div class="lg:grid lg:grid-cols-[auto,320px] gap-20 pt-10 max-w-[1300px]">
      <div class="">
        <div v-if="data" class="p-10 bg-green-avo rounded-lala">
          <div class="max-h-[500px] rounded-3xl overflow-hidden mb-5">
            <img
              :src="
                data.data.blogArticles.data[0].attributes.featured_image.data[0]
                  .attributes.url
              "
              class="object-cover"
            />
          </div>
          <h3
            class="
              text-2xl
              font-open-sans
              md:text-xl
              font-extralight
              md:font-light
              my-2
            "
          >
            {{ date }}
          </h3>
          <h2
            class="
              text-4xl
              md:text-5xl
              font-titillium font-medium
              md:font-semibold
              leading-none
              mb-2
            "
          >
            {{ data.data.blogArticles.data[0].attributes.title }}
          </h2>

          <div
            class="mb-10"
            v-html="data.data.blogArticles.data[0].attributes.body"
          />
          <!-- images -->
          <div class="grid lg:grid-cols-2 gap-5">
            <div
              v-for="(item, index) of data.data.blogArticles.data[0].attributes
                .images.data"
              :key="index"
              class="max-h-[500px] rounded-3xl overflow-hidden"
            >
              <img :src="item.attributes.url" class="object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div v-if="packages">
          <Heading class="py-5">Suggested Packages</Heading>
          <div
            class="
              flex flex-wrap
              w-full
              justify-center
              items-center
              gap-10
              pb-10
            "
          >
            <div v-for="(item, index) of packages" :key="index">
              <card :package="item.attributes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
const route = useRoute();
let slug = route.params.slug;

console.log(route.params.slug);

let query = `query{
    blogArticles(filters:{
        slug:{
            eq:"${slug}"
        }
    }){
       data{
        attributes{
            title
            body
            date
            featured_image{
                data{
                    attributes{
                        url
                    }
                }
            }
            images{
                data{
                    attributes{
                        url
                    }
                }
            }
            tags{
                data{
                    attributes{
                        name
                    }
                }
            }
        }
       }
    }
    }`;

const { data, error } = useGraph(query);

const { packages, error: packagesError } = useRandomPackages();

const date = computed(() => {
  if (data) {
    let raw = data.value.data.blogArticles.data[0].attributes.date;
    return new Date(raw).toLocaleDateString("eng-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else return "";
});
</script>