<template>
    <div class="nav">
        <div class='wrapper'>
            <ul class='nav-ul'>
                <router-link to="/" tag='li'>Home</router-link>
                <li>
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
                        <input class='search-bar' v-model="summoner" type="text" placeholder="Search Summoner" autocomplete="off" spellcheck="false">
                        <div class="search-icon-container clickable" v-on:click='searchSummoner'>
                            <img class='search-icon' src="@/assets/img/search.svg" alt="">
                        </div>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
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
            this.summoner = ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav {
        background-color: #252934;
    }
    .nav-ul {
        display: flex;
    }
    .nav li {
        padding: 16px 30px 16px 0;
        color: #ffffff;
        cursor: pointer;
    }
    .search-form {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-bar, .search-select {
        border: 1px solid #ffffff;
        padding: 4px 15px;
        background-color: #ffffff;
        color: #606060;
        outline: none;
    }
    ::placeholder {
        color: #757575;
        opacity: 1;
    }
    .search-bar {
        height: 27px;
    }
    .search-icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 27px;
        width: 27px;
        background-color: #ffffff;
    }
    .search-icon {
        display: inline-block;
        height: 18px;
        width: 18px;
    }
</style>
