import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Summoner from './views/Summoner.vue'
import Match from './views/Match.vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/summoner/:summonerName',
        component: Summoner,
        props: true,
        children: [
            { path: '/summoner/:summonerName/match/:matchId', name: 'match', component: Match }
        ]
    }
    ]
})
