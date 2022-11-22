<template>
  <div>
    <div class="min-h-[50vh] flex flex-col items-center">
      <div class="flex flex-col">
        <SectionHeading
          heading="computravel blog"
          subheading="feel inspired"
          :inverted="true"
        />
        <!-- <pre>{{ data }}</pre> -->
        <div v-if="data" class="grid lg:grid-cols-3">
          <div v-for="(item, index) of blogs" :key="index">
            <ArticleCard :article="item" />
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
import { useStore } from "@/stores/search";
const searchStore = useStore();
import { useGraph } from "@/composables/useGraph";

const { data, error } = useGraph(`query{
    blogArticles{
        data{
            attributes{
                title
                body 
                date
                slug
                featured_image{
                    data{
                        attributes{
                            url
                            alternativeText
                        }
                    }
                }
                images{
                    data{
                        attributes{
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
const blogs = ref(null);
watch(
  () => data.value,
  () => {
    let array = data.value.data.blogArticles.data;
    blogs.value = array
      .map((item) => {
        item["dateValue"] = new Date(item.attributes.date);
        return item;
      })
      .sort((a, b) => b.dateValue - a.dateValue);
    console.log(blogs.value);
  }
);

searchStore.randomQuery();
</script>