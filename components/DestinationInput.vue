<template>
  <div class="w-full h-full relative">
    <label class="text-lg ">Destination </label>
    <input
      id="findInput"
      name="search"
      type="text"
      v-model="destination.name"
      class="w-full rounded-xl bg-white p-4 relative input-outline shadow-xl hover:shadow-none"
      @keyup="manageKeyUp"
      @focus="showSuggestions = true"
      @blur="showSuggestions = false"
      placeholder="Anywhere"
      ref="findInput"
    />
    <IconClose
      class="
        w-6
        absolute
        right-[10px]
        top-[50%]
        transition
        hover:rotate-180
        cursor-pointer
      "
    @mousedown="destination.name = '';clear()"
    />
    <!-- autosuggest list-->

    <div
      class="
        absolute
        top-[110%]
        inset-x-0
        unroll
        z-30
        shadow-2xl
        bg-gray-100
        rounded-xl
        overflow-auto
        h-min-[350px]
        origin-top
      "
      v-show="showSuggestions && suggestions.length > 0"
    >
      <div class="bg-stone-100 rounded-xl overflow-hidden border">
        <div class="grid">
          <div
            v-for="(item, index) in suggestions"
            :key="index"
            class="
              flex
              items-center
              bg-light-300
              py-2
              px-3
              hover:!bg-green-text hover:text-white
            "
            :class="{ '!bg-lime-100 text-black': index == selectedSuggestion }"
            @mousedown="
              destination = item;
              clear();
            "
          >
            <div class="">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const destination = ref({
  name:"",
  type:""
});
const route = useRoute();
const props = defineProps({
  parent: String,
});
const showSuggestions = ref(false);

const findInput = ref(null);
const wrapperClass = ref("");
import {useStore} from "@/stores/search"
const searchStore = useStore()
onMounted(() => {
  if(searchStore.destination.name !== null){
    destination.value = searchStore.destination
    }
 
  findInput.value.focus();
  if (props.parent == "welcome") {
    wrapperClass.value = "top-[64%]";
  }
  if (props.parent == "header") {
    wrapperClass.value = "top-[120%]";
  }
});
const selectedSuggestion = ref(0);
const suggestions = ref([]);
const hoveredSuggestion = ref(0);
const destinationSuggestions = ref([]);
const subdestinationSuggestions = ref([]);

// clear
const clear = () => {
  showSuggestions.value = false;
  suggestions.value = [];
  selectedSuggestion.value = 0;
};

const manageKeyUp = (e) => {
  // escape:
  if (e.key === "Escape") {
    clear();

    return;
  }

  // down Arrow:
  if (
    e.key === "ArrowDown" &&
    selectedSuggestion.value < suggestions.value.length &&
    selectedSuggestion.value < suggestions.value.length - 1
  ) {
    selectedSuggestion.value++;

    return;
  }
  if (
    e.key === "ArrowDown" &&
    selectedSuggestion.value === suggestions.value.length - 1
  ) {
    selectedSuggestion.value = 0;

    return;
  }
  // up arrow:
  if (e.key === "ArrowUp") {
    if (selectedSuggestion.value >= 0) {
      selectedSuggestion.value--;
    }
    return;
  }
  // enter
  if (e.key === "Enter") {
    // if no selection:
    if (selectedSuggestion.value === -1) {
      return;
    }
    // if suggestion:
    destination.value = suggestions.value[selectedSuggestion.value].name;
    console.log(destination.value);
    clear();

    return;
  }

  // backspace
  if (e.key === "Backspace") {
    showSuggestions.value = false;
    suggestions.value = [];
    selectedSuggestion.value = -1;
    if (destination.value == "") {
      return;
    }
  }

  getDestinationSuggestions();
};

const mouseOver = (index) => {
  hoveredSuggestion.value = index + 1;
};

const mouseLeave = () => {
  hoveredSuggestion.value = null;
};

const { result: subdestinationResult, search: subdestinationSearch } =
  useSearch("subdestinations");
const { result: destinationResult, search: destinationSearch } =
  useSearch("destinations");

const getDestinationSuggestions = async () => {
  await subdestinationSearch({
    query: destination.value.name,
    requestOptions: {
      hitsPerPage: 10,
    },
  }).then((result) => {
    if (result === null || result === undefined) {
      return;
    }
    showSuggestions.value = true;
    subdestinationSuggestions.value = result.hits.map((item) => ({
      name: item.subdestination,
      type: "subdestination",
    }));
  });

  await destinationSearch({
    query: destination.value.name,
    requestOptions: {
      hitsPerPage: 10,
    },
  }).then((result) => {
    if (result === null || result === undefined) {
      return;
    }
    showSuggestions.value = true;

    destinationSuggestions.value = result.hits.map((item) => ({
      name: item.destination,
      type: "destination",
    }));
    suggestions.value = [
      ...destinationSuggestions.value,
      ...subdestinationSuggestions.value,
    ];
  });
};

const emit = defineEmits(["setValue"]);
watch(
  () => destination.value,
  (a, b) => {
    emit("setValue", "destination", destination.value.name);
  }
);



</script>
