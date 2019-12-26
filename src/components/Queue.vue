<template lang="html">
    <div class="queue-type flex direction-row">
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
                <span>{{ winrate(league.wins, league.losses) + "%" }}</span>
            </p>
        </div>
    </div>
</template>

<script>
import { winrate } from '../helpers/helpers.js'

export default {
    props: ['league'],
    data(){
        return {

        }
    },
    methods: {
        capitalize(word) {
            if (typeof word !== 'string') {
                return ''
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        },
        queueType(queueType) {
            let queueTypes = {
                RANKED_TFT: 'Ranked TFT',
                RANKED_SOLO_5x5: 'Ranked Solo',
                RANKED_FLEX_SR: 'Ranked Flex',
                RANKED_FLEX_TT: 'Ranked Flex'
            }

            return queueTypes[queueType]
        },
        winrate
    }
}
</script>

<style lang="css" scoped>
    .queue-type {
        height: 100px;
        padding: 15px;
        background-color: #f2f2f2;
        border: 1px solid #cdd2d2;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4rem;
        margin-bottom: 10px;
    }
    .ranked-emblem {
        height: 59px;
        width: 52px;
        margin-right: 15px;
    }
    .league-tier {
        margin-right: 5px;
    }
    .league-stats > span {
        margin-right: 5px;
    }
</style>
