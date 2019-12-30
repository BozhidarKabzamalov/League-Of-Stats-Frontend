<template>
    <form class='search-form' v-on:submit.prevent="searchSummoner">
        <input class='search-bar' v-model="summoner" type="text" placeholder="Search Summoner, e.g, Wolf" autocomplete="off" spellcheck="false">
        <select v-model='region'>
            <option value="EUW1">Europe West</option>
            <option value="NA1">North America</option>
            <option value="EUN1">Europe Nordic & East</option>
            <option value="KR">Korea</option>
            <option value="JP1">Japan</option>
            <option value="BR1">Brazil</option>
            <option value="RU">Russia</option>
            <option value="OC1">Oceania</option>
            <option value="TR1">Turkey</option>
            <option value="LA1">Latin America North</option>
            <option value="LA2">Latin America South</option>
        </select>
    </form>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data(){
        return {
            summoner: '',
            region: 'EUW1'
        }
    },
    methods: {
        searchSummoner(){
            router.push('/summoner/' + this.region + '/' + this.summoner)
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-form {
        margin-bottom: 60px;
    }
    .search-bar {
        border: 1px solid #ffffff;
        padding: 15px;
        background-color: #ffffff;
        color: #606060;
        outline: none;
        width: 500px;
    }
    ::placeholder {
        color: #757575;
        opacity: 1;
    }
</style>
