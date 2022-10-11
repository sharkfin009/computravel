<template>
  <div>
    <div
      ref="render"
      class="w-full bg-green-avo flex justify-center"
      v-if="newsletter"
    >
      <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="x-apple-disable-message-reformatting" />
          <title></title>
          <!--[if mso]>
            <noscript>
              <xml> <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings>
              </xml>
            </noscript>
          <![endif]-->
        </head>
        <body class="m-0 p-0 tracking-normal">
          <div role="article" aria-roledescription="email" lang="en">
            <table role="presentation" class="w-full border-none">
              <tr class="bg-green-avo">
                <td align="center" class="p-0">
                  <!--[if mso]>
<table role="presentation" align="center" style="width:600px;">
<tr>
<td>
<![endif]-->
                  <table
                    role="presentation"
                    class="w-[94%] max-w-[600px] border-none p-0 m-y-10 rounded"
                  >
                    <tr class="p-0 my-10">
                      <td class="m-0 p-0">
                        <div class="rounded overflow-hidden p-10 text-center">
                          <img
                            src="https://res.cloudinary.com/sharkfin/image/upload/v1665480712/computravel_main_logo_02757d4e40.png?updated_at=2022-10-11T09:31:54.814Z"
                            alt="Logo"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white">
                      <td class="bg-white">
                        <h2
                          class="
                            text-4xl
                            font-bold font-titillium
                            text-lime-700
                            w-full
                            text-center
                            bg-white
                          "
                        >
                          {{ newsletter.Title }}
                        </h2>
                      </td>
                    </tr>
                  </table>
                  <!--[if mso]>
</td>
</tr>
</table>
<![endif]-->
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
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
        // array.item(index).style = string;
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