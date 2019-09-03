<template>
    <div class='wrapper'>
        <div v-if='summonerInfo' class='summoner-container'>

            <div class='summoner-information-container'>
                <div class="summoner-icon-container">
                    <p class='summoner-level'>{{ this.summonerInfo.summonerLevel }}</p>
                    <img class='summoner-icon' v-if='summonerInfo' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/profileicon/' + this.summonerInfo.profileIconId + '.png'" alt="">
                </div>
                <div class="summoner-name-container">
                    <p class='summoner-name'>{{ this.summonerInfo.name }}</p>
                </div>
                <div class="justify-center">
                    <div class='update clickable' v-on:click='user("update")'>Update</div>
                    <Spinner v-if='loading'></Spinner>
                </div>
            </div>

            <div class="flex">

                <div class="column">
                    <div class="queue-types-container" v-if='this.summonerLeague'>
                        <div class="queue-type" v-for='league in this.summonerLeague'>
                            <div class='ranked-emblem'>
                                <img class='responsive-image' :src="'../emblems/' + league.tier + '.png'" alt="">
                            </div>
                            <div>
                                <p>{{ queueType(league.queueType) }}</p>
                                <p>
                                    <span class='league-tier'>{{ capitalize(league.tier) }}</span>
                                    <span>{{league.rank}}</span>
                                </p>
                                <p class='league-stats'>
                                    <span>{{ league.leaguePoints }} LP</span>
                                    <span>{{ league.wins }}W</span>
                                    <span>{{ league.losses }}L</span>
                                    <span>{{ winrate(league.wins, league.losses) }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <div class='match' v-for='match in summonerMatches.matches' v-bind:class="gameIsWon(match) ? 'win' : 'loss'">
                        <div class='participant clickable' @click='specificMatch(match.gameId, match)'>
                            <div class='game-duration'>
                                <p v-if='gameIsWon(match)'>Victory</p>
                                <p v-else>Defeat</p>
                                <p>{{ matchLength(match.details.gameDuration) }}</p>
                            </div>
                            <div class='matchmaking-queue'>
                                <p>Ranked Solo</p>
                            </div>
                            <div>
                                <img class='champion-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/champion/' + $store.getters.findChampion(match.champion).image.full" alt="">
                            </div>
                            <div class='champion-name'>
                                <p>{{ $store.getters.findChampion(match.champion).name }}</p>
                            </div>
                            <div class='summoner-spells'>
                                <img class='summoner-spell-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/spell/' + $store.getters.findSummonerSpell(match.mainParticipant.spell1Id).image.full" alt="">
                                <img class='summoner-spell-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/spell/' + $store.getters.findSummonerSpell(match.mainParticipant.spell2Id).image.full" alt="">
                            </div>
                            <div class="summoner-runes">
                                <img class='summoner-rune-icon' :src="'https://ddragon.leagueoflegends.com/cdn/img/' + $store.getters.findSummonerRune(match.mainParticipant.stats.perk0).icon" alt="">
                                <img class='summoner-rune-icon' :src="'https://ddragon.leagueoflegends.com/cdn/img/' + $store.getters.findSummonerRune(match.mainParticipant.stats.perkSubStyle).icon" alt="">
                            </div>
                            <div class="KDA">
                                <div class="stats">
                                    <p>{{ match.mainParticipant.stats.kills }}/</p>
                                    <p>{{ match.mainParticipant.stats.deaths }}/</p>
                                    <p>{{ match.mainParticipant.stats.assists }}</p>
                                </div>
                                <p>{{ calculateKDA(match) }} KDA</p>
                            </div>
                            <div class="cs">
                                <p>{{ match.mainParticipant.stats.totalMinionsKilled }} ({{ calculateMinionsPerMinute(match) }}) CS</p>
                            </div>
                            <div class='items'>
                                <div class='item-icon' v-for="i in 6">
                                    <img v-if='match.mainParticipant.stats["item" + (i - 1)]' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/item/' + match.mainParticipant.stats['item' + (i - 1)] + '.png'" alt="">
                                    <div v-else class="no-item"></div>
                                </div>
                            </div>
                            <div class='last-played'>
                                <p>{{ elapsedTime(match) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import Spinner from '../components/Spinner'
import { findParticipant, gameIsWon, calculateKDA, calculateMinionsPerMinute, matchLength, elapsedTime, queueType, winrate, capitalize } from '../helpers/helpers.js'

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
            axios.get('/' + action + 'Summoner/' + trimmedSummoner)
            .then((response) => {
                this.summonerInfo = response.data.summonerInfo
                this.summonerLeague = response.data.summonerLeague
                this.summonerMatches = response.data.summonerMatches

                for (var match of this.summonerMatches.matches) {
                    match.mainParticipant = this.findParticipant(match, this.summoner)
                }

                this.loading = false;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        specificMatch(matchId, match){
            this.$router.push({ name: 'match', params: { summonerName: this.summoner, matchId: matchId, summonerInfo: this.summonerInfo, match: match}})
        },
        findParticipant,
        gameIsWon,
        calculateKDA,
        calculateMinionsPerMinute,
        matchLength,
        elapsedTime,
        queueType,
        winrate,
        capitalize
    },
    watch:{
        $route (to, from){
            this.summoner = this.$route.params.summonerName
            this.user('get')
        }
    },
    mounted(){
        this.user('get')
    }
}
</script>

<style lang="scss">
.summoner-container {
    display: flex;
    flex-direction: column;
    padding: 10px 0 0 0;
}
.summoner-information-container {
    display: flex;
    margin-bottom: 10px;
    height: 100px;
}
.summoner-icon-container {
    display: flex;
    position: relative;
    margin-right: 20px;
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
.summoner-icon {
    max-width: 100px;
    max-height: 100px;
}
.summoner-name-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
}
.summoner-name {
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
.flex {
    display: flex;
}
.column:last-child {
    flex: 1;
}
.column:first-child {
    margin-right: 10px;
}
.match {
    padding: 10px;
    margin-bottom: 10px;

}
.win {
    background-color: #a3cfec;
}
.loss {
    background-color: #e2b6b3;
}
.participant {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
}
.participant:last-child {
    margin-bottom: 0px;
}
.participant > div {
    margin: 0 15px 0 0;
}
.game-duration {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-basis: 75px;
}
.matchmaking-queue {
    display: flex;
    justify-content: center;
    align-items: center;
}
.champion-icon {
    display: block;
    max-width: 56px;
    border-radius: 50%;
}
.champion-name {
    flex-basis: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.summoner-spells {
    display: flex;
    flex-direction: column;
}
.summoner-spell-icon {
    width: 28px;
}
.summoner-runes {
    display: flex;
    flex-direction: column;
}
.summoner-rune-icon {
    width: 28px;
    background-color: #17172e;
    border-radius: 50%;
}
.KDA {
    flex-basis: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.stats {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 125px;
}
.items {
    display: flex;
    flex-wrap: wrap;
    width: 84px;
}
.item-icon {
    width: 28px;
    height: 28px;
}
.item-icon > img {
    width: 100%;
    height: 100%;
}
.no-item {
    background-color: black;
    width: 100%;
    height: 100%;
    opacity: 0.25;
}
.last-played {
    display: flex;
    justify-content: center;
    align-items: center;
}
.queue-types-container {
    display: flex;
    flex-direction: column;
}
.queue-type {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #f2f2f2;
    border-top: 1px solid #cdd2d2;
    border-right: 1px solid #cdd2d2;
    border-left: 1px solid #cdd2d2;
}
.queue-type:last-child {
    border-bottom: 1px solid #cdd2d2;
}
.ranked-emblem {
    max-width: 50px;
    max-height: 50px;
    margin-right: 10px;
}
.responsive-image {
    width: 100%;
    height: 100%;
}
.league-tier {
    margin-right: 5px;
}
.league-stats > span {
    margin-right: 5px;
}
</style>
