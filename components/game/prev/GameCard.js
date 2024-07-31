import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import {  useRouter } from 'expo-router'
import TeamCard from './TeamCard'
import { convertTimestamp } from '../../../utils/time'
import Colors from '../../../constants/Colors'




const GameCard = ({ home, away, game, teamHistory, resultColor }) => {



    const date = convertTimestamp(game.gameDate)
    const noShootout = game.homeShootoutScore === "0" && game.homeShootoutScore === "0"
    const isTeamHome = game.atVs === "vs"
    const homeWinner = game.gameResult === "G" && isTeamHome || game.gameResult === "P" && !isTeamHome
    const awayWinner = game.gameResult === "P" && isTeamHome || game.gameResult === "G" && !isTeamHome

    const { push } = useRouter()




    return (

        
        <TouchableNativeFeedback
            onPress={() => {

                push({
                    pathname: "/game/[id]",
                    params: { id: game.id }
                })

            }}
        >

            <View style={s.game}>

                <Text style={s.gameTitle}>{game.leagueName.replace("Argentine","").toUpperCase()}</Text>


                <View style={s.mainContainer}>

                    <View style={s.teamsContainer}>

                        <TeamCard
                            team={home}
                            score={game.homeTeamScore}
                            shootoutScore={noShootout ? false : game.homeShootoutScore}
                            winner={homeWinner}
                            teamHistory={teamHistory}
                            resultColor={resultColor}

                        />
                        <TeamCard
                            team={away}
                            score={game.awayTeamScore}
                            shootoutScore={noShootout ? false : game.awayShootoutScore}
                            winner={awayWinner}
                            teamHistory={teamHistory}
                            resultColor={resultColor}
                        />

                    </View>

                    <View style={s.gameDate}>
                        <Text style={s.gameDateText}>
                            {`${date.day} ${date.month.slice(0, 3)} ${date.year}`}
                        </Text>

                    </View>

                </View>

            </View>

        </TouchableNativeFeedback>
        // </Link>
    )
}

export default GameCard

const s = StyleSheet.create({
    game: {
        padding: 9,

    },
    gameTitle: {
        color: Colors.text100,
        fontSize: 11
    },
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingVertical: 8
    },
    teamsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: "70%",


    },
    gameDate: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "33%"


    },
    gameDateText: {

        color: "white",
        fontWeight: "500",
        textAlign: "center",
        paddingTop: 3,
        paddingBottom: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        fontSize: 12,

    }

})