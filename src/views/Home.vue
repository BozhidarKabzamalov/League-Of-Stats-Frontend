<template>
    <div class='wrapper'>
        <div class='flex justify-center' v-bind:style="{ minHeight: minHeight + 'px'}">
            <form v-on:submit.prevent="searchSummoner">
                <input class='search-bar' v-model="summoner" type="text" placeholder="Search Summoner (EUW Only), e.g, Wolf" autocomplete="off" spellcheck="false">
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data(){
        return {
            summoner: ''
        }
    },
    methods: {
        searchSummoner(){
            router.push('/summoner/' + this.summoner)
        }
    },
    computed: {
        minHeight(){
            return window.innerHeight - 60
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-bar {
        border: 1px solid #ffffff;
        padding: 15px;
        background-color: #ffffff;
        color: #606060;
        outline: none;
        width: 500px;
        margin-bottom: 60px;
    }
    ::placeholder {
        color: #757575;
        opacity: 1;
    }
</style>
