<template>
    <div class="justify-center">
        <div class='banned-champion' v-for='ban in team.bans'>
            <img class='responsive-image' v-if='ban.championId != -1' :src="'http://ddragon.leagueoflegends.com/cdn/' + $store.getters.version + '/img/champion/' + $store.getters.findChampion(ban.championId).image.full" alt="">
            <div class='no-ban' v-else></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['team'],
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .banned-champion {
        width: 30px;
        height: 30px;
        margin-right: 5px;
    }
    .banned-champion:nth-child(5n) {
        margin-right: 0px;
    }
    .no-ban {
        background-color: black;
        width: 100%;
        height: 100%;
        opacity: 0.25;
    }
</style>
