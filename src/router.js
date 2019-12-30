import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Summoner from './views/Summoner.vue'
import SpecificMatch from './views/SpecificMatch.vue'
import Matchlist from './views/Matchlist.vue'
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
        path: '/summoner/:region/:summonerName',
        component: Summoner,
        children: [
            { path: '', component: Matchlist, name: 'matchlist' },
            { path: 'match/:matchId', component: SpecificMatch, name: 'specificMatch' }
        ]
    }
    ]
})
