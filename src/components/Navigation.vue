<template>
    <div class="nav">
        <div class='wrapper'>
            <ul class='nav-ul'>
                <router-link to="/" tag='li'>Home</router-link>
                <li>
                    <form v-on:submit.prevent="searchSummoner">
                        <input class='search-bar' v-model="summoner" type="text" placeholder="Search Summoner" autocomplete="off" spellcheck="false">
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
            summoner: ''
        }
    },
    methods: {
        searchSummoner(){
            router.push('/summoner/' + this.summoner)
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
    .search-bar {
        border: 1px solid #ffffff;
        padding: 5px;
        background-color: #ffffff;
        color: #606060;
        outline: none;
    }
    ::placeholder {
        color: #757575;
        opacity: 1;
    }
</style>
