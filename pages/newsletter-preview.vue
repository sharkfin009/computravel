<template>
  <div>
    <div ref="render" class="w-full bg-blue-100">
      <div class="flex justify-center email-bg rounded pt-10 w-[750px] mx-auto">
        <div v-if="newsletter" class="w-full flex flex-col items-center">
          <div
            class="
              w-full
              bg-white
              rounded-3xl
              p-10
              flex flex-col
              items-center
              gap-10
            "
          >
            <img
              height="93"
              width="300"
              src="https://res.cloudinary.com/sharkfin/image/upload/v1665480712/computravel_main_logo_02757d4e40.png?updated_at=2022-10-11T09:31:54.814Z"
            />
            <h2
              class="
                text-4xl
                font-bold font-titillium
                text-lime-700
                w-full
                text-center
              "
            >
              {{ newsletter.Title }}
            </h2>
            <div class="rounded-3xl overflow-hidden">
              <img
                width="450"
                height="300"
                :src="newsletter.Featured_Image.data.attributes.url"
              />
            </div>
            <h2 class="text-2xl font-bold font-titillium text-lime-700 w-full">
              {{ newsletter.Subtitle }}
            </h2>
            <p v-html="newsletter.Body"></p>
          </div>
          <div class="email-bg w-full p-10 flex flex-col gap-10">
            <h2
              class="
                text-3xl
                font-bold font-titillium
                text-lime-700
                w-full
                text-center
              "
            >
              Latest holiday packages to keep you exploring
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div
                v-for="(pkg, index) in newsletter.packages.data.map(
                  (item) => item.attributes
                )"
                :key="index"
                :package="pkg"
              >
                <!-- {{ pkg }} -->
                <Card :package="pkg" />
              </div>
            </div>
            <div
              class="
                bg-white
                rounded-3xl
                p-10
                flex flex-col
                items-center
                gap-10
              "
            >
              <div class="rounded-3xl overflow-hidden">
                <img :src="newsletter.CTA_Image.data.attributes.url" />
              </div>
              <h3 class="font-semibold">Where will you go next?</h3>
              <p class="text-center px-10">
                Get in touch or follow us on the socials, our travel experts are
                here to help you find your next adventure.
              </p>
              <CompuButton class="bg-lime-500">Enquire Now</CompuButton>
              <div class="flex justify-center gap-20 mb-10">
                <i
                  class="fa-brands fa-facebook fa-3x cursor-pointer"
                  @click="share('facebook')"
                />
                <i
                  class="fa-brands fa-twitter fa-3x cursor-pointer"
                  @click="share('twitter')"
                />
                <i
                  class="fa-brands fa-whatsapp fa-3x cursor-pointer"
                  @click="share('whatsapp')"
                />
              </div>
            </div>
            <div class="p-10" v-html="newsletter.Small_Print" />
            <div class="flex justify-center items-center">
              <img
                width="300"
                height="450"
                src="https://res.cloudinary.com/sharkfin/image/upload/v1665051291/asata_logo_full_500_sq_transp_c89f6e45bf.png"
              />
            </div>
            <p class="text-center">
              We are accredited members of ASATA whose pivotal role is to ensure
              and promote the highest standards of professionalism and ethics
              within the South African travel industry.
            </p>
            <div class="w-full flex justify-between items-end text-sm">
              <div>
                59 Waterloo Road,<br />
                Wynberg,<br />
                Cape Town
              </div>
              <div>Tel: 021 762-0511</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CompuButton @click="send" class="bg-lime-500 my-10">
      {{ buttonContent }}
    </CompuButton>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "home",
});
const config = useRuntimeConfig();
import { useAdminUserStore } from "@/stores/adminUser";
const adminUserStore = useAdminUserStore();
let jwt = "";
let email = ref({});
let render = ref(null);
onMounted(async () => {
  if (
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("computravel_admin="))
  ) {
    console.log(document.cookie);
    jwt = document.cookie.slice(18);
    console.log(jwt);
  }
  const { $inlineCss } = useNuxtApp();

  $graphql(query, jwt)
    .then((response) => {
      newsletter.value = response.data.newsletters.data[0].attributes;
    })
    .then(() => {
      let list = render.value.querySelectorAll("*");
      list.forEach((item, index, array) => {
        let rules = [];
        let styles = window.getComputedStyle(item);
        for (var i = 0; i < styles.length; i++) {
          rules.push(styles[i] + ":" + styles.getPropertyValue(styles[i]));
          //               ^name ^           ^ value ^
        }
        let string = "";
        for (let rule of rules) {
          string += rule + "; ";
        }
        array.item(index).style = string;
      });
      console.log(render.value);
    });
});

const newsletter = ref(null);
let query = `
query{
    newsletters(
        sort:["createdAt:desc"]
    ){
        data{
            attributes{
                Title
                Featured_Image{
                    data{
                        attributes{
                            url
                        }
                    }
                }
                Subtitle
                Body
                packages{
                    data{
                        attributes{
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
                      
                     image_url_md 
                      valid_to
                        }
                    }
                }
                CTA_Image{
                    data{
                        attributes{
                            url
                        }
                    }
                }
                Small_Print

            }
        }
    }
}
`;
const { $graphql } = useNuxtApp();

import { useSocialSharing } from "@/composables/socialSharing";

const { share } = useSocialSharing();
const buttonContent = ref("Send Email");
const send = () => {
  fetch(config.strapiUrl + "/api/send-newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify({
      data: render.value.outerHTML,
    }),
  })
    .then((response) => (buttonContent.value = "Email Sent"))
    .catch(
      (error) =>
        (buttonContent.value =
          "Sorry there was a problem with sending the email. Try pressing again... else 'Better call Ben';)")
    );
};
</script>