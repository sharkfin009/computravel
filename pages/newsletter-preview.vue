<template>
  <div class="flex justify-center email-bg rounded pt-10" ref="email">
    <div v-if="newsletter" class="max-w-[750px] flex flex-col items-center">
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
        <IconComputravelLogo class="h-[40px] md:h-[60px]" />
        <h2 class="text-4xl font-bold font-titillium text-lime-700">
          {{ newsletter.Title }}
        </h2>
        <div class="rounded-3xl overflow-hidden">
          <img :src="newsletter.Featured_Image.data.attributes.url" />
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
          class="bg-white rounded-3xl p-10 flex flex-col items-center gap-10"
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
            width="400"
            src="https://res.cloudinary.com/sharkfin/image/upload/v1665051291/asata_logo_full_500_sq_transp_c89f6e45bf.png"
          />
        </div>
        <p class="text-center">
          We are accredited members of ASATA whose pivotal role is to ensure and
          promote the highest standards of professionalism and ethics within the
          South African travel industry.
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
</template>
<script setup>
definePageMeta({
  layout: "home",
});
const config = useRuntimeConfig();
import { useAdminUserStore } from "@/stores/adminUser";
const adminUserStore = useAdminUserStore();
let jwt = "";

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

  $graphql(query, jwt)
    .then((response) => {
      newsletter.value = response.data.newsletters.data[0].attributes;
    })
    .then(() => {
      let mailTemplate = document.createElement("tagName");
      mailTemplate.innerHTML = email.value.outerHTML;
      //   append tailwind CDN script tag
      var tailwindCDN = document.createElement("script");
      tailwindCDN.src = "https://cdn.tailwindcss.com";
      mailTemplate.appendChild(tailwindCDN);
      let generalStyle = document.createElement("style");
      generalStyle.appendChild(document.createTextNode(general));
      mailTemplate.appendChild(generalStyle);
      console.log(mailTemplate.outerHTML);
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
const email = ref(null);
let general = `
.fade-in {
  animation: 1s fade-in ease-out
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1
  }

}
  .unroll {
    animation: 0.2s unroll ease-out
  }
  
  @keyframes unroll {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
  
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }
  
 html{
    font-size:14px;
  }

 .font-titillium { 
 font-family: 'Titillium Web', sans-serif;
 }


 .font-open-sans{ 
  font-family: 'Open Sans', sans-serif;
 }



  .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.svg-shadow {
  -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, 0.537));
  filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, 0.505));
  /* Similar syntax to box-shadow */
}

.input-outline {
  outline: 2px #96969c4d solid;
}

em {
  font-weight: 600;
  font-style: normal;
  color: rgb(121, 121, 121) !important;
}

.hide-scroll {
  padding-right: 50px;
  box-sizing: content-box;
  /* So the width will be 100% + 25px */
}

*{
  -webkit-transform: translate2d(0, 0);
-moz-transform: translate2d(0, 0);
-ms-transform: translate2d(0, 0);
-o-transform: translate2d(0, 0);
transform: translate2d(0, 0);
}

.scroll{
  -webkit-overflow-scrolling: touch; /* adds momentum scrolling for iOS*/ 

}
.rounded-lala{
  border-radius: 50px
}
.rounded-lala-b{
border-radius: 0px 0px 50px 50px;
}
.rounded-lala-t{
  border-radius: 50px 50px 0px 0px;
}

/* table styles */
th,
td {
  border: none;
  padding: 8px 16px;
  text-align: center;
}
tr:nth-child(odd) {
  background: white;
}
tr:nth-child(even) {
  background: #E2EBE8;
}
th {
  position: sticky;
  top: 0;
  background-color: rgb(193, 218, 193);
}
table {
  border-collapse: collapse;
  width: 100%;
}

ul{
  list-style-type:disc;
  /* list-style-position: inside; */
}
p{
  margin-bottom:10px;
}
.email-bg{
  background-color: #EBF1EF;
}`;
</script>