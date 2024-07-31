import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { getLogo } from '../../utils/match'
import { useRouter } from 'expo-router'

const GameHeaderTeam = ({ team, headerFull, season,league }) => {


    const { push } = useRouter()

    return (
        <TouchableNativeFeedback

            onPress={() =>push(`team/${team.id}?season=${season}&league=${league}`) }
        >
            <View style={s.team}>

                {getLogo(team, 42)}

                {
                    headerFull &&
                    <Text style={s.teamName}>{team.shortDisplayName.replace("ROS","R. Central")}</Text>
                }
            </View>
        </TouchableNativeFeedback>
    )
}

export default GameHeaderTeam

const s = StyleSheet.create({
    team: {
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2
    },
    teamName: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.text
    }
})