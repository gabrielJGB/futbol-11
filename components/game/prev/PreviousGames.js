import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GameCard from './GameCard'
import Colors from '../../../constants/Colors'
import { getLogo } from '../../../utils/match'
import { Divider } from 'react-native-paper'

const PreviousGames = ({ homeHistory, awayHistory }) => {


    const getResultColor = (result) => {
        if (result === "G")
            return "#00AD38"
        else if (result === "E")
            return "#E5FF1A"
        else if (result === "P")
            return "#FF1E2F"
    }

    return (
        <>
            {
                [homeHistory, awayHistory].map((elem, i) => {
                    return elem.events.length > 0 &&
                        <View key={i} style={s.container}>

                            <View style={s.teamHistory}>
                                {getLogo(elem.team, 33)}
                                <Text style={s.title}> ÚLTIMOS PARTIDOS</Text>
                                <View style={s.history}>
                                    {
                                        elem.events.map((event, i) => (
                                            <Text key={i} style={[s.historyText,{ color: getResultColor(event.gameResult) }]}>
                                                {event.gameResult}
                                            </Text>
                                        ))
                                    }
                                </View>
                            </View>



                            {
                                elem.events.map((game, i) => (
                                    <View key={i}>
                                        <Divider style={s.divider} />
                                        <GameCard
                                            home={game.atVs === "vs" ? elem.team : game.opponent}
                                            away={game.atVs === "vs" ? game.opponent : elem.team}
                                            game={game}
                                            teamHistory={true} 
                                            resultColor={getResultColor(game.gameResult)}
                                            />
                                    </View>
                                ))
                            }



                        </View>
                })
            }

        </>
    )
}

export default PreviousGames

const s = StyleSheet.create({
    container: {
        backgroundColor: Colors.card,
        borderRadius: 7
    },
    teamHistory: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 5
    },
    title: {
        paddingVertical: 7,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
        color: Colors.text
    },
    divider: {
        backgroundColor: Colors.highlight
    },
    history: {
        display: "flex",
        flexDirection: "row-reverse",
        gap: 1
    },
    historyText:{
        fontWeight:"500"
    }
})

