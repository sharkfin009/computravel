<template>
  <div class="relative">
    <div class="sticky top-[142px] md:top-[88px] bg-slate-50 mb-5 z-10">
      <PackageHeader class="" :package_data="package_data" />
    </div>
    <div
      class="relative overflow-y-hidden min-h-[250px] md:min-h-[530px] w-full"
    >
      <!-- pics layout -->
      <div
        class="
          absolute
          inset-0
          h-full
          w-full
          overflow-x-hidden overflow-y-hidden
          pb-4
          box-content
          pointer-events-none
        "
      >
        <!-- all screens, one pic: centered with max-width-->

        <div class="flex justify-center pb-6 h-full w-full px-5">
          <div
            v-if="images.length == 1"
            class="rounded-xl overflow-hidden max-w-screen-md"
          >
            <img class="w-full h-full object-cover" :src="images[0]" />
          </div>

          <!-- many pics mobile:-->

          <div
            v-if="images.length > 1"
            class="
              block
              xl:hidden
              relative
              w-full
              h-full
              max-w-screen-md
              bg-blue-100
              rounded-xl
              overflow-hidden
            "
          >
            <div
              v-for="(image, index) of images"
              :key="index"
              class="absolute inset-0 transition-opacity duration-300 opacity-0"
              :class="{ '!opacity-100': index == mobilePicPointer }"
            >
              <img class="w-full h-full object-cover" :src="image" />
            </div>
            <!-- chevrons for mobile -->
            <div
              class="
                absolute
                inset-0
                h-full
                w-full
                flex
                justify-between
                items-end
                pb-5
                px-5
                pointer-events-none
              "
            >
              <div>
                <div
                  class="
                    bg-green-avo
                    rounded-full
                    scale-[80%]
                    pointer-events-auto
                    duration-500
                    hover:bg-opacity-100
                    transition-all
                  "
                  v-if="mobilePicPointer > 0 && images.length > 1"
                >
                  <IconChevronLeft
                    class="
                      text-lime-600
                      transform
                      scale-50
                      cursor-pointer
                      pointer-events-auto
                    "
                    @click="mobileBrowseLeft"
                  />
                </div>
              </div>
              <div>
                <div
                  class="
                    bg-green-avo
                    rounded-full
                    scale-[80%]
                    pointer-events-auto
                    duration-500
                    hover:bg-opacity-100
                    transition-all
                  "
                  v-if="mobilePicPointer < images.length"
                >
                  <IconChevronRight
                    class="
                      text-lime-600
                      transform
                      scale-50
                      cursor-pointer
                      pointer-events-auto
                    "
                    @click="mobileBrowseRight"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- chevrons xl up: -->
      <div
        class="
          absolute
          inset-0
          h-full
          w-full
          hidden
          xl:flex
          justify-between
          items-end
          pb-20
          px-20
          pointer-events-none
        "
      >
        <div>
          <div
            class="
              bg-green-avo
              rounded-full
              p-4
              bg-opacity-50
              pointer-events-auto
              duration-500
              hover:bg-opacity-100
              transition-all
            "
            v-if="scrollPos > 0 && images.length > 1"
          >
            <IconChevronLeft
              class="
                text-lime-600
                transform
                scale-150
                cursor-pointer
                pointer-events-auto
              "
              @click="browseLeft"
            />
          </div>
        </div>
        <div>
          <div
            class="
              bg-green-avo
              rounded-full
              p-4
              bg-opacity-50
              pointer-events-auto
              duration-500
              hover:bg-opacity-100
              transition-all
            "
            v-if="
              scrollPos < Math.floor(images.length / 3) - (images.length % 3)
            "
          >
            <IconChevronRight
              class="
                text-lime-600
                transform
                scale-150
                cursor-pointer
                pointer-events-auto
              "
              @click="browseRight"
            />
          </div>
        </div>
      </div>

      <!--  many pix xl up : magazine layout-->
      <div
        v-if="images.length > 1"
        class="hidden xl:flex pb-10 overflow-x-hidden overflow-y-hidden"
        ref="scrollBox"
      >
        <div
          class=""
          v-for="(pic, index) in threeImagesArray"
          :key="index"
          style="scroll-snap-align: start"
        >
          <!-- odd 3s -->
          <div
            v-if="index % 2 == 0"
            class="grid grid-cols-[2fr,1fr] gap-5 h-[500px] px-10"
            :style="`width:${picScrollWidth}px`"
          >
            <div class="overflow-hidden rounded-xl">
              <img class="w-full object-cover h-full" :src="pic[0]" />
            </div>
            <div class="grid grid-rows-2 gap-5 h-[500px]">
              <div class="overflow-hidden rounded-xl">
                <img class="w-full object-cover h-full" :src="pic[1]" />
              </div>
              <div class="overflow-hidden rounded-xl">
                <img class="w-full object-cover h-full" :src="pic[2]" />
              </div>
            </div>
          </div>
          <!-- even 3s -->
          <div
            v-if="index % 2 !== 0 && index < images.length - 2"
            class="grid grid-cols-[1fr,2fr] gap-5 h-[500px] px-10"
            :style="`width:${picScrollWidth}px`"
          >
            <div class="grid grid-rows-2 gap-5 h-[500px]">
              <div class="overflow-hidden rounded-xl">
                <img class="w-full object-cover h-full" :src="pic[0]" />
              </div>
              <div class="overflow-hidden rounded-xl">
                <img class="w-full object-cover h-full" :src="pic[1]" />
              </div>
            </div>
            <div class="overflow-hidden rounded-xl">
              <img class="w-full object-cover h-full" :src="pic[2]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- content below pics: -->
    <div class="px-5">
      <!-- tabs header -->
      <TabMenu
        @selectTab="setActiveTab"
        class="hidden md:flex mb-5"
        :titles="items"
      ></TabMenu>

      <!-- tabs content -->

      <!-- overview header for mobile only: -->
      <div class="pb-10 tracking-wide leading-normal">
        <div
          class="
            block
            md:hidden
            w-full
            pb-5
            font-semibold
            text-xl
            flex
            justify-center
          "
        >
          overview
        </div>

        <!-- overview -->
        <div
          v-if="belowMd || activeTab === 0"
          class="
            block
            md:grid md:grid-cols-[2fr,1fr]
            gap-4
            transition
            ease-in
            duration-300
          "
        >
          <div class="rounded-xl bg-white p-5 md:p-12">
            <p v-for="(line, index) in descripLines" :key="index">
              {{ line }}.
            </p>
            <PackageHeading> includes:</PackageHeading>
            <div class="rounded-xl bg-white">
              <p v-for="(line, index) in array" :key="index">
                {{ line }}
              </p>
            </div>
            <PackageHeading> excludes:</PackageHeading>
            <div class="rounded-xl bg-white">
              {{ props.package_data.packages.data[0].attributes.excludes }}
            </div>
          </div>

          <div class="rounded-xl bg-white p-5 lg:p-12">
            <PackageHeading class="pt-0"> details:</PackageHeading>
            <ul>
              <li>
                <div>prices from:</div>
                <div>
                  R
                  {{ props.package_data.packages.data[0].attributes.price }}
                  per pps
                </div>
              </li>
              <li>
                <div>trip reference:</div>
                <div>
                  {{
                    props.package_data.packages.data[0].attributes.supplier_ref
                  }}
                </div>
              </li>
              <li>
                <div>flights:</div>
                Not Included
              </li>
              <li>
                <div>from:</div>
                {{ props.package_data.packages.data[0].attributes.from }}
              </li>
              <li>
                <div>duration:</div>
                {{ props.package_data.packages.data[0].attributes.duration }}
                nights
              </li>
              <li>
                <div>book before:</div>
                {{ props.package_data.packages.data[0].attributes.valid_to }}
              </li>
            </ul>
            <div class="flex flex-col items-center mt-5">
              <PackageHeading> need visas?:</PackageHeading>
              <div class="grid grid-cols-[3fr,1fr,3fr,1fr] grid-rows-2 gap-2">
                <span class="text-end">South Africa:</span>
                <div>No</div>
                <span class="text-right">EU:</span>
                <div>No</div>
                <span class="text-right">America:</span>
                <div>No</div>
                <span class="text-right">British:</span>
                <div>No</div>
              </div>
            </div>
            <PackageHeading> terms and conditions:</PackageHeading>
            <div
              class="
                rounded-xl
                bg-white
                transform
                translate-x-0
                transition
                ease-in
                duration-300
              "
            >
              <ul class="list-disc">
                <li v-for="(line, index) in termsLines" :key="index">
                  {{ line }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- about destination -->
        <div
          v-if="belowMd || activeTab === 1"
          class="transform translate-x-0 transition ease-in duration-300"
        >
          <h3
            class="
              block
              md:hidden
              text-xl text-center
              font-semibold font-titillium
              my-5
            "
          >
            about {{ props.destination_content.name }}
          </h3>
          <div
            id="about"
            class="rounded-xl bg-white p-5 md:p-12"
            v-html="aboutCopy"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  package_data: Object,
  destination_content: Object,
});
let picScrollWidth = ref(0);
const scrollBox = ref(null);
const scrollContents = ref(null);
onMounted(() => {
  if (scrollBox.value) {
    picScrollWidth.value = scrollBox.value.offsetWidth;
  }
  // scrollBox.value.addEventListener("scroll",(e)=>{
  //   let scrollLeft= scrollBox.value.scrollLeft / images.length
  //  let contentsWidth = scrollContents.value.offsetWidth
  //   if (contentsWidth % scrollLeft == 0){
  //     scrollPos.value = contentsWidth / scrollLeft
  //   }
  //   console.log(scrollPos.value)
  // })
});
let aboutCopy = props.destination_content ? props.destination_content.copy : "";
let images = props.destination_content.images.length
  ? props.destination_content.images
  : [];
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

images = shuffle(images);
images.unshift(
  "https://" + props.package_data.packages.data[0].attributes.image_url_lg
);
let threeImagesArray = [];
for (let i = 0; i < images.length - (images.length % 3); i++) {
  if (i % 3 == 0) {
    threeImagesArray.push([images[i], images[i + 1], images[i + 2]]);
  }
}
let scrollPos = ref(0);
const browseLeft = () => {
  if (scrollBox.value && scrollPos.value > 0) {
    scrollPos.value--;
    scrollBox.value.scrollTo({
      top: 0,
      left: scrollPos.value * picScrollWidth.value,
      behavior: "smooth",
    });
  }
};

const browseRight = () => {
  if (scrollBox.value && scrollPos.value < Math.floor(images.length / 3)) {
    scrollPos.value++;
    scrollBox.value.scrollTo({
      top: 0,
      left: scrollPos.value * picScrollWidth.value,
      behavior: "smooth",
    });
  }
};

let array = props.package_data.packages.data[0].attributes.includes.split("\n");
let descripLines = array[0].split(". ");
let termsLines =
  props.package_data.packages.data[0].attributes.terms.split("\n");
let description = array[0];
array.shift();

const items = ["overview", "about " + props.destination_content.name];
if (aboutCopy == "") {
  items.splice(2, 1);
}

const activeTab = ref(0);
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
const mobilePicPointer = ref(0);
const mobileBrowseLeft = () => {
  if (mobilePicPointer.value > 0) {
    mobilePicPointer.value--;
  }
};
const mobileBrowseRight = () => {
  if (mobilePicPointer.value < images.length) {
    mobilePicPointer.value++;
  }
};
const belowMd = computed(() => {
  return window.matchMedia("(max-width: 768px)").matches;
});
</script>

<style scoped>
li div:nth-child(1) {
  width: 50%;
  text-align: right;
  font-weight: 800;
  padding-right: 10px;
}

li div:nth-child(2) {
  text-align: left;
}

li {
  display: flex;
}

span {
  font-weight: 800;
}

a {
  text-decoration: underline !important;
}
</style>
