export function findParticipant(match) {
    let participantId = match.details.participantIdentities.find(x => x.player.summonerName === this.summonerInfo.name).participantId;
    let participant = match.details.participants.find(x => x.participantId === participantId)

    return participant
}
export function winrate(wins, losses) {
    let games = wins + losses
    return Math.round(wins * 100 / games)
}
export function calculateKDA(participant) {
    let participantKills = participant.stats.kills
    let participantAssists = participant.stats.assists
    let participantDeaths = participant.stats.deaths

    if (participantDeaths === 0) {
        return 'Perfect'
    }

    let kda = (participantKills + participantAssists) / participantDeaths

    let finalNumber = kda.toFixed(2);

    return finalNumber
}
export function calculateMinionsPerMinute(participant, matchDuration) {
    let totalMinionsKilled = participant.stats.totalMinionsKilled
    let totalNeutralMinionsKilled = participant.stats.neutralMinionsKilled
    let totalMinionsKilledPerMinute = Math.round((totalMinionsKilled + totalNeutralMinionsKilled) / matchDuration * 60 * 10) / 10

    return totalMinionsKilledPerMinute
}
