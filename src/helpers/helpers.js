export function findParticipant(match, summonerName) {
    let participantId = match.details.participantIdentities.find(x => x.player.summonerName === summonerName).participantId;
    let participant = match.details.participants.find(x => x.participantId === participantId)
    return participant
}
export function gameIsWon(match) {
    let participantId = match.details.participantIdentities.find(x => x.player.summonerName === this.summonerInfo.name).participantId;
    let hasUserWon = match.details.participants.find(x => x.participantId === participantId).stats.win;

    return hasUserWon
}
export function calculateKDA(match) {
    let participantKills = match.mainParticipant.stats.kills
    let participantAssists = match.mainParticipant.stats.assists
    let participantDeaths = match.mainParticipant.stats.deaths

    if (participantDeaths === 0) {
        return 'Perfect'
    }

    let kda = (participantKills + participantAssists) / participantDeaths

    let finalNumber = kda.toFixed(2);

    return finalNumber
}
export function calculateMinionsPerMinute(match) {
    let totalMinionsKilled = match.mainParticipant.stats.totalMinionsKilled
    let totalNeutralMinionsKilled = match.mainParticipant.stats.neutralMinionsKilled
    let gameDuration = match.details.gameDuration
    let totalMinionsKilledPerMinute = Math.round((totalMinionsKilled + totalNeutralMinionsKilled) / gameDuration * 60 * 10) / 10

    return totalMinionsKilledPerMinute
}
export function matchLength(gameDuration) {
    let minutes = Math.floor(gameDuration / 60);
    let seconds = Math.floor(gameDuration % 60);
    if (seconds < 10) {
        return minutes + ':' + '0' + seconds
    }
    return minutes + ':' + seconds
}
export function elapsedTime(match) {
    let today = Date.now()
    let gameTimestamp = match.timestamp
    let gameDuration = match.details.gameDuration
    let timeDifference = (today - gameTimestamp) / 1000 - gameDuration
    let seconds = Math.round(timeDifference)
    let minutes = Math.round(seconds / 60)
    let hours = Math.round(minutes / 60)
    let days = Math.round(hours / 24)

    if (minutes <= 1) {
        return 'A minute ago'
    } else if (minutes <= 60) {
        return minutes + ' minutes ago'
    } else if (hours <= 1) {
        return 'An hour ago'
    } else if (hours <= 24) {
        return hours + ' hours ago'
    } else if (days == 1) {
        return 'A day ago'
    } else {
        return days + ' days ago'
    }
}
export function queueType(queueType) {
    let queueTypes = {
        RANKED_TFT: 'Ranked TFT',
        RANKED_SOLO_5x5: 'Ranked Solo',
        RANKED_FLEX_SR: 'Ranked Flex'
    }

    return queueTypes[queueType]
}
export function winrate(wins, losses) {
    let games = wins + losses
    return Math.round(wins * 100 / games) + '%'
}
export function capitalize(word) {
    if (typeof word !== 'string') {
        return ''
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
export function lastMatchesKda(matches) {
    let kills = 0
    let assists = 0
    let deaths = 0

    for (let match of matches) {
        kills += match.mainParticipant.stats.kills
        assists += match.mainParticipant.stats.assists
        deaths += match.mainParticipant.stats.deaths
    }

    let kda = (kills + assists) / deaths
    let finalKda = kda.toFixed(2);
    console.log(finalKda)
    return finalKda
}
export function lastMatchesMinionsPerMinute(matches) {
    let totalMinionsKilled = 0
    let totalNeutralMinionsKilled = 0
    let gameDuration = 0

    for (let match of matches) {
        totalMinionsKilled += match.mainParticipant.stats.totalMinionsKilled
        totalNeutralMinionsKilled += match.mainParticipant.stats.neutralMinionsKilled
        gameDuration += match.details.gameDuration
    }

    let totalMinionsKilledPerMinute = Math.round((totalMinionsKilled + totalNeutralMinionsKilled) / gameDuration * 60 * 10) / 10
    console.log(totalMinionsKilledPerMinute)
    return totalMinionsKilledPerMinute
}
