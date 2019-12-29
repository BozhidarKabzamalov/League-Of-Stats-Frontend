<template>
    <div v-if='match' class='wrapper'>
        <div class="flex direction-column">
            <match v-bind:match='match' v-bind:summonerInfo='summonerInfo'></match>
            <div class="match-stats flex space-between">
                <Bans :team='friendlyTeam'></Bans>
                <Objectives :team='friendlyTeam' :friendly='true'></Objectives>
                <div class="gold justify-center">
                    <p>{{ friendlyTeamGold }}</p>
                    <div class="gold-bar flex">
                        <div class="friendly-bar" :style="{ width: friendlyTeamGoldPercentage + '%'}"></div>
                        <div class="enemy-bar" :style="{ width: enemyTeamGoldPercentage + '%'}"></div>
                    </div>
                    <p>{{ enemyTeamGold }}</p>
                </div>
                <Objectives :team='enemyTeam' :friendly='false'></Objectives>
                <Bans :team='enemyTeam'></Bans>
            </div>
            <div class="flex">
                <div class="team">
                    <participant v-for='participant in friendlyParticipants' :participant='participant' :match='match'></participant>
                </div>
                <div class="team">
                    <participant v-for='participant in enemyParticipants' :participant='participant' :match='match'></participant>
                </div>
            </div>
            <div class="flex">
                <Runes type='Primary' :match='this.match'></Runes>
                <Runes type='Sub' :match='this.match'></Runes>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { findParticipant } from '../helpers/helpers.js'
import Match from '../components/Match'
import Participant from '../components/Participant'
import Objectives from '../components/Objectives'
import Bans from '../components/Bans'
import Runes from '../components/Runes'

export default {
    props: ['summonerInfo'],
    components: {
        Match,
        Participant,
        Objectives,
        Bans,
        Runes
    },
    data(){
        return {
            match: null,
            summonerName: this.$route.params.summonerName,
            matchId: this.$route.params.matchId
        }
    },
    methods: {
        getMatch(){
            axios.get("/getMatch/" + this.matchId)
            .then((response) => {

                this.match = {
                    details: response.data.match
                }
                this.match.mainParticipant = this.findParticipant(this.match)

                for (let participant of this.match.details.participants) {
                    participant.identity = this.match.details.participantIdentities.find((value) => value.participantId === participant.participantId)
                }

            })
            .catch(function (error) {
                console.log(error);
            })
        },
        findParticipant
    },
    computed: {
        friendlyTeam(){
            let friendlyTeamId = this.match.mainParticipant.teamId;
            let friendlyTeam = this.match.details.teams.find(value => value.teamId === friendlyTeamId)

            return friendlyTeam
        },
        enemyTeam(){
            let friendlyTeamId = this.match.mainParticipant.teamId;
            let enemyTeamId = friendlyTeamId === 100 ? 200 : 100
            let enemyTeam = this.match.details.teams.find(value => value.teamId === enemyTeamId)

            return enemyTeam
        },
        friendlyParticipants(){
            let friendlyTeamId = this.match.mainParticipant.teamId;
            let friendlyParticipants = this.match.details.participants.filter(value => value.teamId === friendlyTeamId);

            return friendlyParticipants;
        },
        enemyParticipants(){
            let friendlyTeamId = this.match.mainParticipant.teamId;
            let enemyTeamId = friendlyTeamId === 100 ? 200 : 100
            let enemyParticipants = this.match.details.participants.filter(value => value.teamId === enemyTeamId );

            return enemyParticipants;
        },
        friendlyTeamGold(){
            let totalGold = 0;

            for (let participant of this.friendlyParticipants) {
                totalGold += participant.stats.goldEarned
            }

            return totalGold
        },
        enemyTeamGold(){
            let totalGold = 0;

            for (let participant of this.enemyParticipants) {
                totalGold += participant.stats.goldEarned
            }

            return totalGold
        },
        onePercent(){
            return (this.friendlyTeamGold + this.enemyTeamGold) / 100
        },
        friendlyTeamGoldPercentage(){
            return this.friendlyTeamGold/this.onePercent
        },
        enemyTeamGoldPercentage(){
            return this.enemyTeamGold/this.onePercent
        }
    },
    mounted(){
        this.getMatch();
    }
}
</script>

<style lang="scss" scoped>
    .gold p {
        margin-right: 10px;
    }
    .gold p:last-child {
        margin: 0 0 0 10px
    }
    .gold-bar {
        width: 200px;
    }
    .friendly-bar {
        height: 20px;
        background-color: #90c6ea;
    }
    .enemy-bar {
        height: 20px;
        background-color: #e0a39f;
    }
    .team {
        flex: 1;
    }
    .team:first-child {
        margin-right: 5px;
    }
    .team:last-child {
        margin-left: 5px;
    }
    .match-stats {
        padding: 10px;
        background-color: #f2f2f2;
        border: 1px solid #cdd2d2;
        margin-bottom: 10px;
    }
</style>
