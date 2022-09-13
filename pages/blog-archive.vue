<template>
  <div>
    <div class="min-h-[50vh] flex flex-col items-center">
      <div class="grid max-w-[1000px]">
        <SectionHeading
          heading="computravel blog"
          subheading="feel inspired"
          :inverted="true"
        />
        <!-- <pre>{{ data }}</pre> -->
        <div v-if="data" class="flex flex-wrap justify-center gap-5">
          <div
            v-for="(item, index) of data.data.blogArticles.data"
            :key="index"
          >
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
            }
        }
    }
    }
    `);

searchStore.randomQuery();
</script>