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
        background-color: #eaeaea;
        font-family: 'Roboto', 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
        height: 100%;
        width: 100%;
        line-height: 1.8rem;
        color: #181818;
    }
    .wrapper {
        width: 1240px;
        margin: 0 auto;
    }
    .responsive-image {
        width: 100%;
        height: 100%;
    }
    .clickable {
        cursor: pointer;
    }
    .flex {
        display: flex;
    }
    .column {
        flex: 1;
    }
    .direction-column {
        flex-direction: column;
    }
    .direction-row {
        flex-direction: row;
    }
    .justify-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .space-between {
        justify-content: space-between;
    }
</style>
