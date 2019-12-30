<template>
    <div class='wrapper'>
        <div class='flex justify-center' v-bind:style="{ minHeight: minHeight + 'px'}">
            <Search></Search>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import Search from '../components/Search'

export default {
    components: {
        Search
    },
    computed: {
        minHeight(){
            return window.innerHeight - 60
        }
    }
}
</script>
