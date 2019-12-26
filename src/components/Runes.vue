<template>
    <div class="runes">
        <div v-for='runes in perks().slots' class="flex space-between">
            <div v-for='rune in runes.runes' class="perk">
                <img class='summoner-rune-icon inactive' v-bind:class='{ active: isPerkActive(match, rune) }' :src="'https://ddragon.leagueoflegends.com/cdn/img/' + rune.icon"  alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type', 'match'],
    data(){
        return {

        }
    },
    methods: {
        perks(type){
            let perksTree = this.$store.state.summonerRunes.find(value => value.id === this.match.mainParticipant.stats['perk' + this.type + 'Style']);

            return perksTree
        },
        isPerkActive(match, rune){
            if ( rune.id == match.mainParticipant.stats.perk0 || rune.id == match.mainParticipant.stats.perk1 || rune.id == match.mainParticipant.stats.perk2 || rune.id == match.mainParticipant.stats.perk3 || rune.id == match.mainParticipant.stats.perk4 || rune.id == match.mainParticipant.stats.perk5 ) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .runes {
        margin-right: 10px;
        background-color: #f2f2f2;
        border: 1px solid #cdd2d2;
        padding: 20px;
        margin-bottom: 10px;
    }
    .perk {
        margin-right: 20px;
    }
    .perk:last-child {
        margin-right: 0px;
    }
    .summoner-rune-icon {
        height: 40px;
        background-color: #17172e;
        border-radius: 50%;
    }
    .inactive {
        filter: grayscale(100%);
        opacity: 0.5;
    }
    .active {
        filter: none;
        opacity: 1;
    }
</style>
