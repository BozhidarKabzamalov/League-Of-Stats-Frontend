<template lang="html">
    <div class='match' v-bind:class="gameIsWon(this.match) ? 'win' : 'loss'">
        <div class='flex participant'>
            <div class='justify-center game-duration direction-column'>
                <p v-if='gameIsWon(this.match)'>Victory</p>
                <p v-else>Defeat</p>
                <p>{{ matchLength(this.match.details.gameDuration) }}</p>
            </div>
            <div class='justify-center match-queue'>
                <p class='queue-name'>{{ this.$store.getters.findQueue(this.match.queue).name }}</p>
            </div>
            <div class='champion-icon justify-center'>
                <img :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/champion/' + $store.getters.findChampion(this.match.mainParticipant.championId).image.full" alt="">
            </div>
            <div class='justify-center champion-name'>
                <p>{{ $store.getters.findChampion(this.match.mainParticipant.championId).name }}</p>
            </div>
            <div class='justify-center summoner-spells'>
                <img class='summoner-spell-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/spell/' + $store.getters.findSummonerSpell(this.match.mainParticipant.spell1Id).image.full" alt="">
                <img class='summoner-spell-icon' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/spell/' + $store.getters.findSummonerSpell(this.match.mainParticipant.spell2Id).image.full" alt="">
            </div>
            <div class="justify-center summoner-runes">
                <img class='summoner-rune-icon' :src="'https://ddragon.leagueoflegends.com/cdn/img/' + $store.getters.findSummonerRune(this.match.mainParticipant.stats.perk0).icon" alt="">
                <img class='summoner-rune-icon absolute-rune' :src="'https://ddragon.leagueoflegends.com/cdn/img/' + $store.getters.findSummonerRune(this.match.mainParticipant.stats.perkSubStyle).icon" alt="">
            </div>
            <div class="KDA justify-center direction-column">
                <div class="justify-center">
                    <p>{{ this.match.mainParticipant.stats.kills }}</p>
                    <p class='slash'>/</p>
                    <p>{{ this.match.mainParticipant.stats.deaths }}</p>
                    <p class='slash'>/</p>
                    <p>{{ this.match.mainParticipant.stats.assists }}</p>
                </div>
                <p>{{ calculateKDA(this.match.mainParticipant) }} KDA</p>
            </div>
            <div class="justify-center cs">
                <p>{{ this.match.mainParticipant.stats.totalMinionsKilled }} ({{ calculateMinionsPerMinute(this.match.mainParticipant, this.match.details.gameDuration) }}) CS</p>
            </div>
            <div class='justify-center items'>
                <div class='item-icon' v-for="i in 7">
                    <img class='responsive-image' v-if='match.mainParticipant.stats["item" + (i - 1)]' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/item/' + match.mainParticipant.stats['item' + (i - 1)] + '.png'" alt="">
                    <div v-else class="no-item responsive-image"></div>
                </div>
            </div>
            <div class='justify-center elapsed-time'>
                <p>{{ elapsedTime(this.match) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { findParticipant, calculateKDA, calculateMinionsPerMinute } from '../helpers/helpers.js'

export default {
    props: ['match', 'summonerInfo'],
    data(){
        return {

        }
    },
    methods: {
        gameIsWon(match) {
            let participantId = match.details.participantIdentities.find(x => x.player.summonerName === this.summonerInfo.name).participantId;
            let hasUserWon = match.details.participants.find(x => x.participantId === participantId).stats.win;

            return hasUserWon
        },
        matchLength(gameDuration) {
            let minutes = Math.floor(gameDuration / 60);
            let seconds = Math.floor(gameDuration % 60);
            if (seconds < 10) {
                return minutes + ':' + '0' + seconds
            }
            return minutes + ':' + seconds
        },
        elapsedTime(match) {
            let today = Date.now()
            let gameTimestamp = match.details.gameCreation
            let gameDuration = match.details.gameDuration
            let timeDifference = (today - gameTimestamp) / 1000 - gameDuration
            let seconds = Math.round(timeDifference)
            let minutes = Math.round(seconds / 60)
            let hours = Math.round(minutes / 60)
            let days = Math.round(hours / 24)

            if (minutes <= 1) {
                return 'A minute ago'
            } else if (minutes <= 60) {
                return minutes + ' minutes ago'
            } else if (hours <= 1) {
                return 'An hour ago'
            } else if (hours <= 24) {
                return hours + ' hours ago'
            } else if (days == 1) {
                return 'A day ago'
            } else {
                return days + ' days ago'
            }
        },
        findParticipant,
        calculateKDA,
        calculateMinionsPerMinute
    }
}
</script>

<style lang="css" scoped>
    .match {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 1.4rem;
    }
    .win {
        background-color: #a3cfec;
        border-left: 10px solid #08a6ff;
    }
    .win:hover {
        background-color: #90c6ea;
    }
    .loss {
        background-color: #e2b6b3;
        border-left: 10px solid #ff7678;
    }
    .loss:hover {
        background-color: #e0a39f;
    }
    .participant {
        padding: 10px;
        justify-content: space-around;
        font-weight: 700;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.75);
    }
    .participant > div {
        margin-right: 10px;
    }
    .game-duration {
        flex-basis: 60px;
    }
    .champion-icon {
        width: 40px;
    }
    .champion-icon img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .summoner-spell-icon {
        height: 30px;
        margin-right: 5px;
    }
    .summoner-spell-icon:last-child {
        margin-right: 0px;
    }
    .summoner-spells {
        width: 65px;
    }
    .summoner-runes {
        position: relative;
        width: 40px;
    }
    .summoner-rune-icon {
        height: 40px;
        background-color: #17172e;
        border-radius: 50%;
    }
    .absolute-rune {
        position: absolute;
        height: 20px;
        right: 0;
        bottom: 0;
    }
    .champion-name, .match-queue, .KDA, .cs, .elapsed-time {
        flex-basis: 100px;
    }
    .queue-name {
        text-align: center;
    }
    .elapsed-time {
        flex-basis: 125px;
    }
    .slash {
        margin-left: 5px;
        margin-right: 5px;
    }
    .items {
        width: 240px;
    }
    .item-icon {
        width: 30px;
        height: 30px;
        margin-right: 5px;
    }
    .item-icon:last-child {
        margin-right: 0px;
    }
    .no-item {
        background-color: black;
        opacity: 0.25;
    }
</style>
