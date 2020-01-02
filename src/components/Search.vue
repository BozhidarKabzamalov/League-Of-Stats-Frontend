<template>
    <form class='search-form' v-on:submit.prevent="searchSummoner">
        <select class='search-select' v-model='region'>
            <option value="EUW1">EUW</option>
            <option value="NA1">NA</option>
            <option value="EUN1">EUN</option>
            <option value="KR">KR</option>
            <option value="JP1">JP</option>
            <option value="BR1">BR</option>
            <option value="RU">RU</option>
            <option value="OC1">OCE</option>
            <option value="TR1">TR</option>
            <option value="LA1">LAN</option>
            <option value="LA2">LAS</option>
        </select>
        <input class='search-bar' v-model="summoner" type="text" placeholder="Search Summoner, e.g, Wolf" autocomplete="off" spellcheck="false">
        <div class="search-icon-container clickable" v-on:click='searchSummoner'>
            <img class='search-icon' src="@/assets/img/search.svg" alt="">
        </div>
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
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 60px;
    }
    .search-bar, .search-select {
        border: 1px solid #ffffff;
        padding: 15px;
        background-color: #ffffff;
        color: #606060;
        outline: none;
    }
    ::placeholder {
        color: #757575;
        opacity: 1;
    }
    .search-bar {
        height: 49px;
        width: 500px;
    }
    .search-select {
        margin-left: 10px;
    }
    .search-icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 49px;
        width: 49px;
        background-color: #ffffff;
    }
    .search-icon {
        display: inline-block;
        height: 25px;
        width: 25px;
    }
</style>
