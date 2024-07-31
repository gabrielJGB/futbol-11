import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { useStateContext } from '../../context/StateContext'
import Colors from '../../constants/Colors'
import GameHeaderTeam from './GameHeaderTeam'
import GameHeaderScore from './GameHeaderScore'
import { translateTitle } from '../../utils/match'
import { Button, Icon, IconButton } from 'react-native-paper'
import { useRouter } from 'expo-router'
import GameHeaderDetails from './GameHeaderDetails'



const GameHeader = () => {

    const { game, headerFull, setHeaderFull } = useStateContext()
    const { back, push } = useRouter()
    const IMG_SIZE = 14
    const home = game.header.competitions[0].competitors.find(comp => comp.homeAway === "home")
    const away = game.header.competitions[0].competitors.find(comp => comp.homeAway === "away")
    const status = game.header.competitions[0].status.type
    const date = game.header.competitions[0].date
    const details = game.header.competitions[0].details
    const stage = game.header.season.name.split(", ").length && game.header.season.name.split(", ")[1]
    const season = game.header.season.year
    const league = game.header.league.slug


    
    return (
        <View style={s.mainContainer}>

            <View style={s.backView}>
                <IconButton icon="arrow-left" iconColor='white' size={22} onPress={() => back()} />
                <TouchableNativeFeedback onPress={() => { push(`league/${league}`) }}>
                    <View>
                        <Text style={s.screenTitle}>
                            {game.header.league.name.replace("Argentine", "")}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                
            </View>

            <View
                style={s.container}
            >

                {
                    stage && headerFull &&
                    <Text style={s.leagueName}>{translateTitle(stage).toUpperCase()}</Text>
                }

                <View style={[s.main, { paddingBottom: (details ? 0 : 5), alignItems: (headerFull ? "flex-start" : "center") }]}>

                    <GameHeaderTeam
                        headerFull={headerFull}
                        season={season}
                        league={league}
                        team={home.team}
                    />

                    <GameHeaderScore
                        headerFull={headerFull}
                        homeWinner={home.winner}
                        awayWinner={away.winner}
                        score={{ home: home.score, away: away.score }}
                        shootout={"shootoutScore" in home ? { home: home.shootoutScore, away: away.shootoutScore } : false}
                        status={status}
                        date={date}
                    />

                    <GameHeaderTeam
                        headerFull={headerFull}
                        team={away.team}
                        league={league}
                        season={season}
                    />

                </View>

                {
                    details && headerFull &&
                    <GameHeaderDetails
                        details={details}
                        homeId={home.id}
                        awayId={away.id}
                    />
                }

                <TouchableNativeFeedback style={{}} onPress={() => setHeaderFull(!headerFull)}>
                    <View style={s.button}>
                        <Icon source={`chevron-${headerFull ? "up" : "down"}`} color="white" size={20} />
                    </View>
                </TouchableNativeFeedback>

            </View>
        </View>
    )
}

export default GameHeader

const s = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column"
    },
    backView: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVretical: 10,
        backgroundColor: Colors.card
    },
    screenTitle: {
        // backgroundColor:Colors.highlight,
        borderColor: Colors.card100,
        borderBottomWidth:1,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        color: Colors.text,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        // textDecorationLine: "underline",
        paddingRight: 7
    },
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.card,


    },
    leagueName: {
        fontWeight: "500",
        textAlign: "center",
        fontSize: 11,
        color: Colors.text100
    },
    main: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 10
    },
    button: {

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: Colors.background

    }


})