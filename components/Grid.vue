<template>
    <div class=" w-full  flex justify-evenly  ">
            <div class="bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition hover:scale-105 h-[500px]"
                v-for="(p,index) in listings" :key="index">
                
                <div class="flex flex-col justify-between w-[400px] ">
                    <div class=" h-[200px] relative"
                        :style="{backgroundImage:'url(' + config.strapiUrl + p.image.url +')',backgroundSize:'cover',backgroundPosition:'center'}">
                        <div class="absolute left-0 bottom-3 text-white rounded bg-gray-600 p-4">
                            {{p.city.name.toUpperCase()   }}</div>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between">
                            <div class="h-[5rem]">
                                <div class="text-2xl pt-0 mt-0"> {{p.Title.toUpperCase()}}</div>
                            </div>
                            <div class="flex items-start text-lime-500 pt-2">
                               
                               <div v-for="(star,index) in getArray(p.star_rating)" :key="index">
                                    <IconStar />
                                    </div>
                           
                            </div>
                        </div>
                        <div class="text-center">Valid: {{p.from}} to {{p.To}}</div>
                        <div class="text-2xl  text-center text-lime-500">{{randsFunction(p.price_cpt)}}</div>
                        <div class="text-gray-500 ">{{excerptFunc(p.description)}}</div>
                        <div class="flex justify-end">
                            <orange-button class="self-end">Read More</orange-button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

 
</template>
<script setup>
  import traitNames from '~/arrays/traitNames.js';
const config = useRuntimeConfig();
  const props = defineProps({
    listings: Array
  })
   const excerptFunc = (string) => {
        string = extractContent(string);
        if (string.length > 100) {
            var excerpt = string.substring(0, 250);
            excerpt = excerpt.substring(0, excerpt.lastIndexOf(' '));
            excerpt += '...';
            return excerpt
        }

    }
    const extractContent = (s) => {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };
    const randsFunction = (price) => {
        return "R" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    }
    const getArray = (stars)=>{
        let array= [];
        for (let i=0;  i<stars;i++){
            array.push(0);
        }
        // console.log(array)
        return array
    }
</script>
<style scoped>
</style>