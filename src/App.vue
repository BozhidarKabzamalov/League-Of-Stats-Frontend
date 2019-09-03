<template>
    <div>
        <navigation/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Navigation from './components/Navigation.vue';

    export default {
        components: {
            Navigation
        },
        mounted(){
            this.$store.dispatch('getVersion')
            this.$store.dispatch('getChampions')
            this.$store.dispatch('getSummonerSpells')
            this.$store.dispatch('getSummonerRunes')
        }
    }
</script>

<style lang="scss">
    *, *:after, *:before {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-decoration: none;
        list-style-type: none;
    }
    html {
        font-size: 16px;
    }
    body {
        background-color: #f2f2f2;
        background-color: #eaeaea;
        font-family: 'Roboto', 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
        height: 100%;
        width: 100%;
        line-height: 1.8rem;
    }
    .wrapper {
        width: 70%;
        margin: 0 auto;
    }
    .clickable {
        cursor: pointer;
    }
    .justify-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
