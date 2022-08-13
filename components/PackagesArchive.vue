<template>
    <div class="flex-col ">
        <p class="text-center mt-5">Top Rated</p>
        <p class="text-4xl text-center bold mt-5">
            HOLIDAY PACKAGES
        </p>
        <div class=" w-full flex justify-center gap-x-20 gap-y-5 m-5">
            <div class="bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition hover:scale-105 "
                v-for="(p,index) in packages" :key="index">
                <div class="flex flex-col justify-between w-[400px] ">
                    <div class=" h-[200px] relative"
                        :style="{backgroundImage:'url(' + config.strapiUrl + p.attributes.image.data.attributes.url +')',backgroundSize:'cover',backgroundPosition:'center'}">
                        <div class="absolute left-0 bottom-3 text-white rounded bg-gray-600 p-4">
                            {{p.attributes.city.data.attributes.name.toUpperCase()   }}</div>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between">
                            <div class="h-[5rem]">
                                <div class="text-2xl pt-0 mt-0"> {{p.attributes.Title.toUpperCase()}}</div>
                            </div>
                            <div class="flex items-start text-lime-500 pt-2">
                               
                               <div v-for="(star,index) in getArray(p.attributes.star_rating)" :key="index">
                                    <IconStar />
                                    </div>
                           
                            </div>
                        </div>
                        <div class="text-center">Valid: {{p.attributes.from}} to {{p.attributes.To}}</div>
                        <div class="text-2xl  text-center text-lime-500">{{randsFunction(p.attributes.price_cpt)}}</div>
                        <div class="text-gray-500 ">{{excerptFunc(p.attributes.description)}}</div>
                        <div class="flex justify-end">
                            <orange-button class="self-end">Read More</orange-button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const config = useRuntimeConfig()
    const route = useRoute();
    const graphql = useStrapiGraphQL();
    const packages = ref([]);
    const data = ref([])
    graphql(`
  query {
    tourPackages{
      data{
        attributes{
          Title
          image{
              data{
                  attributes{
                      url
                  }
              }
          }
            star_rating
            Duration
            from
            To
            price_cpt
            description
            city{
                data{
                    attributes{
                        name
                    }
                }
            }


        }
      }
    }
    }`)
        .then((response) => {
            console.log(response.data.tourPackages.data)
            packages.value = response.data.tourPackages.data
        })
        .catch(error => {
            console.error(error)
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