<template>
    <div class="objectives justify-center">
        <img :src='"../../public/objectives/tower-" + isFriendly + ".png"' alt="">
        <p>{{ team.towerKills }}</p>
        <img :src='"../../public/objectives/dragon-" + isFriendly + ".png"' alt="">
        <p>{{ team.dragonKills }}</p>
        <img :src='"../../public/objectives/baron-" + isFriendly + ".png"' alt="">
        <p>{{ team.baronKills }}</p>
        <img :src='"../../public/objectives/inhibitor-" + isFriendly + ".png"' alt="">
        <p>{{ team.inhibitorKills }}</p>
        <img :src='"../../public/objectives/herald-" + isFriendly + ".png"' alt="">
        <p>{{ team.riftHeraldKills }}</p>
    </div>
</template>

<script>
export default {
    props: ['team', 'friendly'],
    data(){
        return {

        }
    },
    computed: {
        isFriendly(){
            return this.friendly ? '100' : '200'
        }
    }
}
</script>

<style lang="scss" scoped>
    .objectives p {
        margin-right: 15px;
    }
    .objectives img {
        height: 20px;
        width: 20px;
        margin-right: 5px;
    }
</style>
