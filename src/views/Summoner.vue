<template>
    <div class='wrapper' v-bind:style="{ minHeight: minHeight + 'px'}">
        <div v-if='summonerInfo' class='flex direction-column'>

            <div class='summoner flex'>
                <div class="icon-container flex">
                    <p class='summoner-level'>{{ summonerInfo.summonerLevel }}</p>
                    <img class='summoner-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/profileicon/' + summonerInfo.profileIconId + '.png'" alt="">
                </div>
                <div class="summoner-name justify-center">
                    <p>{{ summonerInfo.name }}</p>
                </div>
                <div class="justify-center">
                    <div class='update clickable' v-on:click='user("update")'>Update</div>
                    <Spinner v-if='loading'></Spinner>
                </div>
            </div>

            <router-view :summonerName='summoner' :summonerLeague='summonerLeague' :summonerMatches='summonerMatches' :summonerInfo='summonerInfo'></router-view>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Spinner from '../components/Spinner'
import { findParticipant } from '../helpers/helpers.js'

export default {
    components: {
        Spinner
    },
    data(){
        return {
            summoner: this.$route.params.summonerName,
            summonerInfo: '',
            summonerLeague: '',
            summonerMatches: '',
            loading: false
        }
    },
    methods: {
        user(action){
            this.loading = true;
            let trimmedSummoner = this.summoner.replace(/\s+/g, '');
            axios.get('http://lolapi.kabzamalov.com/api/' + action + 'Summoner/' + trimmedSummoner)
            .then((response) => {
                this.summonerInfo = response.data.summonerInfo
                this.summonerLeague = response.data.summonerLeague
                this.summonerMatches = response.data.summonerMatches

                for (var match of this.summonerMatches.matches) {
                    match.mainParticipant = this.findParticipant(match, this.summoner)
                }

                this.loading = false;
            })
            .catch((error) => {
                console.log(error);
                this.loading = false;
            })
        },
        findParticipant
    },
    watch:{
        $route(to, from){
            this.summoner = this.$route.params.summonerName
            this.user('get')
        }
    },
    computed: {
        minHeight(){
            return window.innerHeight - 60
        }
    },
    mounted(){
        this.user('get')
    }
}
</script>

<style lang="scss" scoped>
    .summoner {
        padding: 10px 0px 10px 0px;
    }
    .icon-container {
        position: relative;
        margin-right: 20px;
    }
    .summoner-icon {
        width: 100px;
        height: 100px;
    }
    .summoner-level {
        position: absolute;
        top:50%;
        left:50%;
        width: 100%;
        transform: translate(-50%, 80%);
        background-color: rgba(0, 0, 0, 0.3);
        color: #f1f1f1;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
    }
    .summoner-name {
        margin-right: 20px;
        font-size: 36px;
        font-weight: 700;
    }
    .update {
        background-color: #08a6ff;
        border-radius: 3px;
        padding: 10px 20px 10px 20px;
        color: #f1f1f1;
        font-weight: 500;
        margin-right: 20px;
    }
</style>
