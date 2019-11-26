<template lang="html">
    <div class='clickable participant flex' @click='redirectToProfile(participant)'>
        <div class="summoner-name justify-center direction-column">
            <div class="justify-center">
                <img class='champion-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/champion/' + $store.getters.findChampion(participant.championId).image.full" alt="">
                <img class='rank-emblem' src="../../public/emblems/PLATINUM.png" alt="">
            </div>
            <p>{{ participant.identity.player.summonerName }}</p>
        </div>
        <div class='justify-center direction-column'>
            <img class='summoner-spell-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/spell/' + $store.getters.findSummonerSpell(participant.spell1Id).image.full" alt="">
            <img class='summoner-spell-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/spell/' + $store.getters.findSummonerSpell(participant.spell2Id).image.full" alt="">
        </div>
        <div class="justify-center direction-column">
            <img class='summoner-rune-icon' :src="'https://ddragon.leagueoflegends.com/cdn/img/' + $store.getters.findSummonerRune(participant.stats.perk0).icon" alt="">
            <img class='summoner-rune-icon' :src="'https://ddragon.leagueoflegends.com/cdn/img/' + $store.getters.findSummonerRune(participant.stats.perkSubStyle).icon" alt="">
        </div>
        <div class='justify-center direction-column'>
            <p>Gold</p>
            <p>{{ participant.stats.goldEarned }}</p>
        </div>
        <div class='justify-center direction-column'>
            <p>Damage</p>
            <p>{{ participant.stats.totalDamageDealtToChampions }}</p>
        </div>
        <div class="stats justify-center direction-column">
            <div class="justify-center">
                <p>{{ participant.stats.kills }}</p>
                <p class='slash'>/</p>
                <p>{{ participant.stats.deaths }}</p>
                <p class='slash'>/</p>
                <p>{{ participant.stats.assists }}</p>
            </div>
            <p>{{ calculateKDA(participant) }} KDA</p>
            <div class="justify-center">
                <p>{{ participant.stats.totalMinionsKilled }} ({{ calculateMinionsPerMinute(participant, match.details.gameDuration) }}) CS</p>
            </div>
        </div>
        <div class="flex">
            <div class='items justify-center direction-row'>
                <div class='item-icon' v-for="i in 6">
                    <img v-if='participant.stats["item" + (i - 1)]' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/item/' + participant.stats['item' + (i - 1)] + '.png'" alt="">
                    <div v-else class="no-item"></div>
                </div>
            </div>
            <div class='justify-center direction-column'>
                <img class='ward-icon' v-if='participant.stats.item6' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/item/' + participant.stats.item6 + '.png'" alt="">
                <div v-else class="no-item"></div>
                <p class='ward-icon justify-center'>{{ participant.stats.wardsPlaced }}</p>
            </div>
        </div>

    </div>
</template>

<script>
import { calculateKDA, calculateMinionsPerMinute } from '../helpers/helpers.js'

export default {
    props: ['participant', 'match'],
    data(){
        return {

        }
    },
    methods: {
        redirectToProfile(participant){
            let summonerName = participant.identity.player.summonerName
            //this.$router.push({ name: 'matchlist', params: { summonerName }})
            this.$router.push({ path: `/summoner/${summonerName}` })
        },
        calculateKDA,
        calculateMinionsPerMinute
    }
}
</script>

<style lang="css" scoped>
    .participant {
        margin-bottom: 10px;
        font-size: 11px;
        line-height: 18px;
        font-weight: 700;
        background-color: #f2f2f2;
        border: 1px solid #cdd2d2;
        padding: 10px;
        justify-content: space-between;
    }
    .summoner-name {
        flex-basis: 120px;
        line-height: 14px;
    }
    .stats {
        flex-basis: 80px;
    }
    .champion-icon {
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 0 5px 5px 0;
    }
    .summoner-spell-icon {
        height: 25px;
        width: 25px;
    }
    .summoner-spell-icon:first-child {
        margin-bottom: 5px;
    }
    .summoner-rune-icon {
        height: 25px;
        width: 25px;
        background-color: #17172e;
        border-radius: 50%;
    }
    .summoner-rune-icon:first-child {
        margin-bottom: 5px;
    }
    .rank-emblem {
        width: 35px;
        height: 35px;
        margin-bottom: 5px;
    }
    .slash {
        margin-left: 5px;
        margin-right: 5px;
    }
    .items {
        width: 85px;
        flex-wrap: wrap;
        margin-right: 5px;
    }
    .item-icon {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }
    .ward-icon {
        width: 25px;
        height: 25px;
    }
    .ward-icon:first-child {
        margin-bottom: 5px;
    }
    .item-icon:nth-child(-n+3) {
        margin-bottom: 5px;
    }
    .item-icon:nth-child(3n+3) {
        margin-right: 0px;
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
</style>
