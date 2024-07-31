import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GameCard from './GameCard'
import Colors from '../../../constants/Colors'

const LastGames = ({ player }) => {



    return (
        <ScrollView>
            <View style={s.container}>
                <Text style={s.title}> ÚLTIMOS PARTIDOS</Text>
                <View style={s.gameContainer}>
                    {
                        "statistics" in player.gameLog &&
                        player.gameLog.statistics[0].events.map((elem, i) => (


                            <GameCard
                                key={i}
                                game={player.gameLog.events[elem.eventId]}
                                playerTeam={player.gameLog.events[elem.eventId].team}
                                position={player.position.displayName}
                                statistics={{
                                    labels: player.gameLog.statistics[0].labels,
                                    stat: player.gameLog.statistics[0].events.find(event => event.eventId === elem.eventId).stats
                                }}
                            />


                        ))
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default LastGames

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        // backgroundColor:Colors.card,

    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: 5
    },
    gameContainer:{
        display: "flex",
        flexDirection: "column",
        gap: 20,
    }
})