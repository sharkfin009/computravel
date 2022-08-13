<template>
  <div class="overflow-y-auto pr-4 box-content h-full w-full rounded-3xl">
    <div class="pt-10 w-full h-full">
      <div class="relative overflow-y-hidden h-[530px] w-full">
        <!-- pics layout -->
        <div
          class="
            absolute
            inset-0
            h-full
            w-full
            overflow-x-auto overflow-y-hidden
            pb-4
            box-content
            pointer-events-none
          "
          ref="scrollBox"
        >
          <!-- case of many pix -->
          <div v-if="images.length > 1" class="flex" ref="scrollContents">
            <div
              class=""
              v-for="(pic, index) in threeImagesArray"
              :key="index"
              style="scroll-snap-align: start"
            >
              <!-- odd 3s -->
              <div
                v-if="index % 2 == 0"
                class="grid grid-cols-[2fr,1fr] gap-5 mb-10 h-[500px] px-10"
                :style="`width:${picScrollWidth}px`"
              >
                <div class="overflow-hidden rounded-xl">
                  <img class="w-full object-cover max-h-full" :src="pic[0]" />
                </div>
                <div class="grid grid-rows-2 gap-5 h-[500px]">
                  <div class="bg-green-400 overflow-hidden rounded-xl">
                    <img
                      class="w-full object-cover max-h-full"
                      :src="pic[1]"
                    />
                  </div>
                  <div class="bg-green-400 overflow-hidden rounded-xl">
                    <img
                      class="w-full object-cover max-h-full"
                      :src="pic[2]"
                    />
                  </div>
                </div>
              </div>
              <!-- even 3s -->
              <div
                v-if="index % 2 !== 0 && index < images.length - 2"
                class="grid grid-cols-[1fr,2fr] gap-5 mb-10 h-[500px] px-10"
                :style="`width:${picScrollWidth}px`"
              >
             
                <div class="grid grid-rows-2 gap-5 h-[500px]">
                  <div class="bg-green-400 overflow-hidden rounded-xl">
                    <img
                      class="w-full object-cover max-h-full"
                      :src="pic[0]"
                    />
                  </div>
                  <div class="bg-green-400 overflow-hidden rounded-xl">
                    <img
                      class="w-full object-cover max-h-full"
                      :src="pic[1]"
                    />
                  </div>
                  
                </div>
                   <div class="overflow-hidden rounded-xl">
                  <img class="w-full object-cover max-h-full" :src="pic[2]" />
                </div>
              </div>
            </div>
          </div>
          <!-- case of one pic -->
          <div v-if="images.length == 1" class="w-full flex justify-center">
            <div class="mb-10 w-[800px] px-10">
              <div class="overflow-hidden rounded-xl">
                <img class="w-full object-cover" :src="images[0]" />
              </div>
            </div>
          </div>
        </div>

        <div
          class="
            absolute
            inset-0
            h-full
            w-full
            flex
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
      </div>
      <!-- content belop pics: -->
      <div class="px-10">
      <!-- tabs header -->
      <TabMenu @selectTab="setActiveTab" :titles="items"></TabMenu>
      <!-- tabs content -->
      <div class="pb-10 text-xl tracking-wide leading-normal h-[80vh]">
        <!-- overview -->
        <div
          v-if="activeTab === 0"
          class="grid grid-cols-2 gap-4 transition ease-in duration-300"
        >
          <div class="rounded-xl bg-white p-12">
            <p v-for="(line, index) in descripLines" :key="index">
              {{ line }}.
            </p>
          </div>
          <div class="rounded-xl bg-white p-12">
            <ul>
              <li>
                <div>Prices from:</div>
                <div>
                  R
                  {{ props.package_data.packages.data[0].attributes.price }} per
                  person sharing
                </div>
              </li>
              <li>
                <div>Trip Reference:</div>
                <div>
                  {{
                    props.package_data.packages.data[0].attributes.supplier_ref
                  }}
                </div>
              </li>
              <li>
                <div>Flights:</div>
                Not Included
              </li>
              <li>
                <div>From:</div>
                {{ props.package_data.packages.data[0].attributes.from }}
              </li>
              <li>
                <div>Duration:</div>
                {{ props.package_data.packages.data[0].attributes.duration }}
                nights
              </li>
              <li>
                <div>Book before:</div>
                {{ props.package_data.packages.data[0].attributes.valid_to }}
              </li>
            </ul>
            <div class="flex flex-col items-center mt-5">
              <div class="text-center font-semibold">Need Visas?</div>
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
          </div>
        </div>

        <!-- inc & exc -->
        <div
          v-if="activeTab === 1"
          class="
            grid
            gap-4
            grid-cols-[2fr,1fr]
            transform
            translate-x-0
            transition
            ease-in
            duration-300
          "
        >
          <div class="rounded-xl bg-white p-12">
            <p v-for="(line, index) in array" :key="index">
              {{ line }}
            </p>
          </div>
          <div class="rounded-xl bg-white p-12">
            {{ props.package_data.packages.data[0].attributes.excludes }}
          </div>
        </div>

        <!-- about destination -->
        <div
          v-if="activeTab === 2"
          class="transform translate-x-0 transition ease-in duration-300"
        >
          <div class="rounded-xl bg-white p-12">
            {{ aboutCopy }}
          </div>
        </div>

        <!-- ts & cs -->
        <div
          v-if="activeTab === 3"
          class="
            -0
            rounded-xl
            bg-white
            p-12
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
  picScrollWidth.value = scrollBox.value.offsetWidth;
  // scrollBox.value.addEventListener("scroll",(e)=>{
  //   let scrollLeft= scrollBox.value.scrollLeft / images.length
  //  let contentsWidth = scrollContents.value.offsetWidth
  //   if (contentsWidth % scrollLeft == 0){
  //     scrollPos.value = contentsWidth / scrollLeft
  //   }
  //   console.log(scrollPos.value)
  // })
});
let aboutCopy =
  props.destination_content.destinationContents.data.length > 0
    ? props.destination_content.destinationContents.data[0].attributes.copy
    : "";
let images =
  props.destination_content.destinationContents.data.length > 0
    ? props.destination_content.destinationContents.data[0].attributes.images.data.map(
        (item) => item.attributes.url
      )
    : [];
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
return array
}

images = shuffle(images)
images.unshift(
  "https://" + props.package_data.packages.data[0].attributes.image_url_lg
);
let threeImagesArray = [];
for (let i = 0; i < images.length - images.length % 3; i++) {
  if (i % 3 == 0 ) {
    threeImagesArray.push([images[i], images[i + 1], images[i + 2]]);
  }
}
let scrollPos = ref(0);
const browseLeft = () => {
  if (scrollPos.value > 0) {
    scrollPos.value--;
    scrollBox.value.scrollTo({
      top: 0,
      left: scrollPos.value * picScrollWidth.value,
      behavior: "smooth",
    });
  }
};

const browseRight = () => {
  if (scrollPos.value < Math.floor(images.length / 3)) {
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

const items = ["Overview", "Inc & Exc", "About This Destination", "Ts & Cs"];
const activeTab = ref(0);
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
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
</style>
