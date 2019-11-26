<template>
    <div class='wrapper'>
        <div class="flex">
            <div class="queues">
                <Queue v-for='league in summonerLeague' :league='league'></Queue>
            </div>
            <div class="column">
                <MatchesStats :summonerMatches='summonerMatches'></MatchesStats>
                <match class='clickable' v-for='match in summonerMatches.matches' v-bind:match='match' v-bind:summonerInfo='summonerInfo' @click.native='specificMatch(match.gameId, match)'></match>
            </div>
        </div>
    </div>
</template>

<script>
import Match from '../components/Match'
import Queue from '../components/Queue'
import MatchesStats from '../components/MatchesStats'

export default {
    components: {
        Match,
        Queue,
        MatchesStats
    },
    props: ['summonerLeague', 'summonerMatches', 'summonerInfo', 'summonerName'],
    data(){
        return {

        }
    },
    methods: {
        specificMatch(matchId, match){
            this.$router.push({ name: 'specificMatch', params: { summonerName: this.summonerName, matchId: matchId, summonerInfo: this.summonerInfo, match: match}})
        }
    }
}
</script>

<style lang="scss" scoped>
    .queues {
        margin-right: 10px;
    }
</style>
