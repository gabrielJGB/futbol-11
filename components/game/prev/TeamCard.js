import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { getLogo } from '../../../utils/match'

const TeamCard = ({ team, score, shootoutScore, winner, teamHistory,resultColor }) => {

    
    const getBorder = () => {

        if (teamHistory) {
            return resultColor
        } else {
            if (winner)
                return "white"
            else
                return Colors.border

        }

    }


    return (
        <View

            style={[s.team, { borderColor: (getBorder()) }]}>

            <View style={s.teamInfo}>
                {getLogo(team, 22)}

                <Text numberOfLines={1} style={s.teamText}>
                    { team.displayName}
                </Text>

            </View>

            <View style={s.score}>
                <Text style={s.scoreText}>{score}</Text>
                {
                    shootoutScore &&
                    <Text style={s.scorePenText}>{shootoutScore}</Text>
                }
            </View>

        </View>
    )
}

export default TeamCard

const s = StyleSheet.create({
    team: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 3,
        borderRightWidth: 2,


    },
    teamInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    teamText: {
        color: Colors.text,
        fontSize: 13,
        width: "76%"
    },
    score: {
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "baseline",
        marginRight: 10
    },
    scoreText: {
        color: Colors.text,
        fontSize: 17
    },
    scorePenText: {
        color: "grey",
        fontSize: 13,

    }
})