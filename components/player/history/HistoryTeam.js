import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { getLogo } from '../../../utils/match'
import { useRouter } from 'expo-router'

const HistoryTeam = ({ team, section }) => {

    const { push } = useRouter()

    return (
        <TouchableNativeFeedback onPress={() => push(`team/${team.id}?season=${new Date().getFullYear()}`)}>
            <View style={s.container}>
                <View style={s.team}>
                    <View style={s.teamInfo}>
                        {getLogo(team, 22)}
                        {
                            section.displayName === "Clubes" && 
                            <Image source={{ uri: `https://a1.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${team.slug.slice(0, 3)}.png?w=18&h=18` }} width={16} height={16} />
                        }
                        <Text style={s.teamName}>{team.displayName}</Text>
                    </View>

                    <Text style={s.seasonCount}>
                        {`${team.seasonCount} TEMPORADA${team.seasonCount === "1" ? "" : "S"}`}
                    </Text>

                </View>

                <View style={s.seasons}>
                    {
                        team.seasons.split(",").map((season, i) => (
                            <Text key={i} style={s.season}>{season.replace("CURRENT", "PRESENTE")}</Text>
                        ))
                    }
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

export default HistoryTeam

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 7,
        paddingVertical: 14,
        width: "100%",
        backgroundColor: Colors.card,
        borderTopWidth: 1,
        borderColor: Colors.card100
    },
    team: {
        display: "flex",
        flexDirection: "column",
        gap: 6
    },
    teamInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    teamName: {
        color: Colors.text
    },
    seasonCount: {
        fontSize: 11,
        fontWeight: "500",
        color: Colors.text100
    },
    seasons: {
        display: "flex",
        flexDirection: "column",
        alignItems:"flex-end",
        gap: 3
    },
    season: {
        color: "#c7c7c7",
        textAlign: "center"
    }

})