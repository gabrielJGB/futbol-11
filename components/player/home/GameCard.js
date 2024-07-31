import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import Colors from '../../../constants/Colors'
import { convertTimestamp } from '../../../utils/time'
import { getLogo } from '../../../utils/match'
import { useRouter } from 'expo-router'

const formatLabel = (label, pos) => {
    //{"labels": ["Ap", "G", "A", "TT", "TM", "FC", "FS", "FL", "TA", "TR"], "stat": ["Titular", "0", "0", "0", "0", "0", "1", "0", "0", "0"]}

    if (label === "A" && pos === "Arquero")
        return "Atajadas"


    switch (label) {
        case "Ap":
            return "Aparición"
        case "G":
            return "Goles"
        case "A":
            return "Asistencias"
        case "TT":
            return "Remates totales"
        case "TM":
            return "Remates al arco"
        case "FC":
            return "Faltas cometidas"
        case "FS":
            return "Faltas recibidas"
        case "FL":
            return "Fuera de juego"
        case "TA":
            return "Tarjetas amarillas"
        case "TR":
            return "Tarjetas rojas"
        case "VI":
            return "Valla imbatida"
        case "A":
            return "Atajadas"
        case "GA":
            return "Goles concedidos"
        case "G":
            return "Goles"
        default:
            return ""
    }

}

const getResultColor = (result) => {
    if (result === "G")
        return "#00AD38"
    else if (result === "E")
        return "#E5FF1A"
    else if (result === "P")
        return "#FF1E2F"
}

const Team = ({ team, score, resultColor }) => {


    return (
        <View style={[s.team, { borderColor: resultColor }]}>
            <View style={s.teamLeft}>
                {getLogo(team, 18)}
                <Text numberOfLines={1} style={s.teamName}>{"displayName" in team ? team.displayName : team.abbreviation}</Text>
            </View>
            <Text style={s.score}>{score}</Text>

        </View>
    )
}

const GameCard = ({ game, playerTeam, statistics, position }) => {

    const date = convertTimestamp(game.gameDate)
    const home = game.atVs === "en" ? game.opponent : playerTeam
    const away = game.atVs === "en" ? playerTeam : game.opponent
    const resultColor = getResultColor(game.gameResult)
    const [showStats, setShowStats] = useState(false)
    const { push } = useRouter()

    return (
        <View style={s.container}>
            <TouchableNativeFeedback style={{borderRadius:10}} onPress={() => push(`game/${game.id}`)}>
                <View>
                    <Text style={s.league}>{game.leagueName.replace("Argentine", "").toUpperCase()}</Text>
                    <View style={s.gameBody}>
                        <View style={s.teams}>
                            <Team team={home} score={game.homeTeamScore} resultColor={resultColor} />
                            <Team team={away} score={game.awayTeamScore} resultColor={resultColor} />
                        </View>

                        <Text style={s.date}>{`${date.dayOfWeek.slice(0,3)} ${date.day} ${date.month.slice(0,3)} ${date.year}`}</Text>

                    </View>
                </View>
            </TouchableNativeFeedback>

            <Button

                style={s.button}
                textColor={Colors.text100}
                icon={`chevron-${showStats ? "up" : "down"}`}
                onPress={() => setShowStats(!showStats)}

            >
                <Text style={s.buttonText}>
                    ESTADÍSTICAS DEL JUGADOR
                </Text>

            </Button>
            {
                showStats &&
                <View style={[s.statistics, { display: showStats ? "flex" : "none" }]}>
                    {
                        statistics.labels.map((label, i) => (
                            <View key={i} style={s.stat}>
                                <Text style={s.statName}>{formatLabel(label, position).toUpperCase()}</Text>
                                <Text style={s.statValue}>{statistics.stat[i]}</Text>
                            </View>
                        ))
                    }
                </View>
            }
        </View>
    )
}

export default GameCard

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:Colors.card,
        borderWidth: 1,
        borderColor: Colors.card100,
        borderRadius: 7,

    },
    league: {
        alignSelf: "flex-start",
        fontSize: 11,
        color: Colors.text100,
        marginTop: 5,
        marginHorizontal: 7,
        marginBottom: 5
    },
    gameBody: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 6

    },
    teams: {

        display: "flex",
        flexDirection: "column",
        width: "70%",
    },
    team: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        borderRightWidth: 2,
        borderColor: "white"

    },
    teamLeft: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    teamName: {
        maxWidth:"85%",
        fontSize: 13,
        color: Colors.text,
    },
    score: {
        paddingRight: 7,
        color: Colors.text,
    },
    date: {
        color: Colors.text,
        fontSize: 11,
        fontWeight: "500",
        textAlign: "center",
        width: "30%",
    },
    button: {
        
        borderRadius: 0,
        textAlign: "center",
        width: "100%"
    },
    buttonText: {
        fontSize: 10
    },
    statistics: {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: Colors.background,


    },
    stat: {
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        width: "100%",

        paddingHorizontal: 10,
        paddingVertical: 2,

        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: Colors.card

    },
    statName: {
        fontSize: 10,
        color: Colors.text
    },
    statValue: {
        fontWeight: "500",
        color: Colors.text
    }
})