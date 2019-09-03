import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        version: null,
        champions: null,
        summonerRunes: null,
        summonerSpells: null
    },
    mutations: {
        version(state, data){
            state.version = data.version
        },
        champions(state, data){
            state.champions = data.champions
        },
        summonerRunes(state, data){
            state.summonerRunes = data.summonerRunes
        },
        summonerSpells(state, data){
            state.summonerSpells = data.summonerSpells
        }
    },
    actions: {
        getVersion({commit}){
            axios.get("http://ddragon.leagueoflegends.com/api/versions.json")
            .then((response) => {
                commit('version', {
                    version: response.data[0]
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        getChampions({commit, state}){
            axios.get("https://ddragon.leagueoflegends.com/cdn/9.14.1/data/en_US/champion.json")
            .then((response) => {
                commit('champions', {
                    champions: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        getSummonerSpells({commit, state}){
            axios.get("http://ddragon.leagueoflegends.com/cdn/9.14.1/data/en_US/summoner.json")
            .then((response) => {
                commit('summonerSpells', {
                    summonerSpells: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        getSummonerRunes({commit, state}){
            axios.get("https://ddragon.leagueoflegends.com/cdn/9.14.1/data/en_US/runesReforged.json")
            .then((response) => {
                commit('summonerRunes', {
                    summonerRunes: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    },
    getters: {
        version: (state) => {
            return state.version;
        },
        findChampion: (state) => (id) => {
            let championId = id.toString();
            let champion = Object.entries(state.champions).find(([key,value]) => value.key === championId);

            return champion[1]
        },
        findSummonerSpell: (state) => (id) => {
            let summonerSpellId = id.toString();
            let summonerSpell = Object.entries(state.summonerSpells).find(([key,value]) => value.key === summonerSpellId);

            return summonerSpell[1]
        },
        findSummonerRune: (state) => (id) => {
            let flattedRunes = state.summonerRunes.reduce((acc, rune) =>
                         acc.concat([rune], rune.slots.reduce((a, r) => a.concat(r.runes), [])), []);
            let rune = flattedRunes.find(rune => rune.id == id);
            
            return rune
        }
    }
})
