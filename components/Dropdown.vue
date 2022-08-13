<template>
<div class="bg-white w-full rounded-2xl  ring-gray-500 ring-2 overflow-scroll max-h-[400px] z-50">
    <div class="py-2 px-5 hover:bg-gray-400 transition" v-for="(option,index) in list" :key="index"
    @click="emit('selectOption',[inputName,option])">
        {{option}}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    list:{
        type:Array,
        required:true
    },
    inputName:{
        type:String,
        required:true
    }

})

const emit = defineEmits(['selectOption'])
</script>
