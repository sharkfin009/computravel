<template>
  <div class="flex justify-center">
    <div class="lg:grid lg:grid-cols-[auto,320px] gap-20 pt-10 max-w-[1300px]">
      <div class="">
        <div v-if="data" class="p-10 bg-green-avo rounded-lala">
          <div class="max-h-[500px] rounded-3xl overflow-hidden">
            <img
              :src="
                data.data.blogArticles.data[0].attributes.featured_image.data[0]
                  .attributes.url
              "
              class="object-cover"
            />
          </div>
          <SectionHeading
            :heading="data.data.blogArticles.data[0].attributes.title"
            :subheading="date"
            :inverted="true"
          />
          <div v-html="data.data.blogArticles.data[0].attributes.body" />
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
            publishedAt
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
    let raw = data.value.data.blogArticles.data[0].attributes.publishedAt;
    return new Date(raw).toLocaleDateString("eng-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else return "";
});
</script>