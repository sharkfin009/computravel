<template>
    <div class=" cursor-pointer p-5 bg-green-avo shadow-xl hover:shadow-none  rounded-full ">
        <div class="flex items-center gap-4 ">
            <IconMagnify class="  mt-2 ml-2 " />
        
            <SearchFindInput  :parent="props.parent" />
                <!-- <QueryButton  @click="go" class="shadow-xl">search</QueryButton> -->


        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    parent : String
})
    import {
        useStore
    } from "@/stores/search"

    const searchStore = useStore()

    const selectInput = (input) => {
        searchStore.activeInput = input
    }
    
    const selectOption = (args) => {
        searchStore[args[0]] = args[1]
        searchStore.fireQuery()
        navigateTo({
            path: '/search'
        })
    }

    const go = () => {
        navigateTo({
            path: '/search'
        })
    }
</script>