<template lang="html">
    <div class="matches-summary flex">
        <div>
            <p>WIN/LOSS STREAK</p>
            <p class='enlarged-stats'>{{ streak }}</p>
        </div>
        <div>
            <p>WIN RATE</p>
            <p class='enlarged-stats'>{{ matchesWinrate + '%'}}</p>
        </div>
        <div>
            <p>AVERAGE KDA</p>
            <p class='enlarged-stats'>{{ matchesKDA }}</p>
        </div>
        <div>
            <p>CS PER MINUTE</p>
            <p class='enlarged-stats'>{{ matchesCs }}</p>
        </div>
        <div>
            <p>HIGHEST MULTIKILL</p>
            <p class='enlarged-stats'>{{ highestMultikill }}</p>
        </div>
    </div>
</template>

<script>
import { winrate } from '../helpers/helpers.js'

export default {
    props: ['summonerMatches'],
    data(){
        return {

        }
    },
    methods: {
        winrate
    },
    computed: {
        matchesWinrate(){
            let wins = this.summonerMatches.matches.filter(x => x.mainParticipant.stats.win === true).length
            let losses = this.summonerMatches.matches.filter(x => x.mainParticipant.stats.win === false).length
            let winrate = this.winrate(wins, losses)

            return winrate
        },
        matchesKDA(){
            let kills = 0;
            let assists = 0;
            let deaths = 0;

            for (let match of this.summonerMatches.matches) {
                kills += match.mainParticipant.stats.kills
                assists += match.mainParticipant.stats.assists
                deaths += match.mainParticipant.stats.deaths
            }

            let kda = (kills + assists) / deaths
            let finalKda = kda.toFixed(2);

            return finalKda
        },
        matchesCs(){
            let totalMinionsKilled = 0;
            let totalNeutralMinionsKilled = 0;
            let gameDuration = 0;

            for (let match of this.summonerMatches.matches) {
                totalMinionsKilled += match.mainParticipant.stats.totalMinionsKilled
                totalNeutralMinionsKilled += match.mainParticipant.stats.neutralMinionsKilled
                gameDuration += match.details.gameDuration
            }

            let totalMinionsKilledPerMinute = Math.round((totalMinionsKilled + totalNeutralMinionsKilled) / gameDuration * 60 * 10) / 10

            return totalMinionsKilledPerMinute
        },
        highestMultikill(){
            let highestMultikill = 0;
            let multiKills = {
                2: 'Double',
                3: 'Triple',
                4: 'Quadra',
                5: 'Penta'
            }

            for (let match of this.summonerMatches.matches) {
                if (highestMultikill < match.mainParticipant.stats.largestMultiKill) {
                    highestMultikill = match.mainParticipant.stats.largestMultiKill
                }
            }

            return multiKills[highestMultikill]
        },
        streak(){
            let won = this.summonerMatches.matches[0].mainParticipant.stats.win;
            let streak = 0;

            if (won) {
                for (let match of this.summonerMatches.matches) {
                    if (match.mainParticipant.stats.win) {
                        streak++
                    } else {
                        return "+" + streak
                    }
                }
            } else {
                for (let match of this.summonerMatches.matches) {
                    if (!match.mainParticipant.stats.win) {
                        streak++
                    } else {
                        return "-" + streak
                    }
                }
            }
        }
    }
}
</script>

<style lang="css" scoped>
    .matches-summary {
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #f2f2f2;
        border: 1px solid #cdd2d2;
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
    }
    .matches-summary div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .enlarged-stats {
        font-size: 30px;
    }
</style>
