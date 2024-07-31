import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { getLogo } from '../../utils/match'

const TeamCard = ({ team, isWinner, isPre }) => {




    return (
        <View

            style={[s.team, {
                borderColor: (isWinner ? "white" : Colors.border),
                borderRightWidth: (isWinner ? 2 : 2)
                // backgroundColor:(isWinner?"#2c3440":"")

            }]}>

            <View style={s.teamInfo}>
                {getLogo(team, 24)}
                <Text numberOfLines={1} style={s.teamText}>
                    {"displayName" in team ? team.displayName : team.team.name}
                </Text>
            </View>

            <View style={s.score}>
                <Text style={s.scoreText}>{isPre ? "" : team.score}</Text>
                <Text style={s.scorePenText}>{team.shootoutScore}</Text>
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
        fontSize: 14,
        width: "76%"
    },
    score: {
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "baseline",
        marginRight: 5
    },
    scoreText: {
        color: Colors.text,
        fontSize: 18
    },
    scorePenText: {
        color: "grey",
        fontSize: 13,

    }
})