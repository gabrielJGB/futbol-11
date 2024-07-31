import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { formatStat } from '../../../utils/match'
import Colors from '../../../constants/Colors'
import { Button, Icon } from 'react-native-paper'
import { useRouter } from 'expo-router'

const PlayerStats = ({ player, statsVisible }) => {

    const { push } = useRouter()


    return (
        <View style={[s.container, { display: (statsVisible ? "flex" : "none") }]}>

            <View >

                {
                    "subbedInFor" in player &&
                    <View style={s.subbed}>
                        <Icon source={"chevron-left"} size={22} color='red' />
                        <Text style={s.subbedJersey}>
                            {player.subbedInFor.jersey}
                        </Text>
                        <Text style={s.subbedName}>
                            {player.subbedInFor.athlete.displayName}
                        </Text>
                    </View>
                }

                {
                    "subbedOutFor" in player &&
                    <View style={s.subbed}>
                        <Icon source={"chevron-right"} size={22} color='lime' />

                        <Text style={s.subbedJersey}>
                            {player.subbedOutFor.jersey}
                        </Text>
                        <Text style={s.subbedName}>
                            {player.subbedOutFor.athlete.displayName}
                        </Text>
                    </View>
                }

                <View style={s.statsBottom}>


                    <View>

                        {
                            "stats" in player &&

                            player.stats.map((stat, i) => {
                                return (
                                    stat.value != 0 &&
                                    stat.shortDisplayName != "Ap" &&
                                    stat.shortDisplayName != "Sub" &&
                                    (player.position?.abbreviation === "G" || stat.shortDisplayName != "GA") &&

                                    <View key={i} style={s.stat}>

                                        <Text style={s.statValue}>{stat.value}</Text>
                                        <Text style={s.statText}>{formatStat(stat)}</Text>

                                    </View>
                                )
                            })
                        }


                    </View>

                    <Button
                        buttonColor="#0c0c0c"
                        textColor='white'
                        labelStyle={{ fontSize: 14 }}
                        mode='elevated'
                        style={{ alignSelf: "flex-end",borderRadius:7}}
                        onPress={() => push(`player/${player.athlete.id}`)}
                    >Ficha Jugador</Button>
                </View>

            </View>
        </View>

    )
}

export default PlayerStats

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        backgroundColor: Colors.card
        // borderTopWidth:1,
        // borderTopColor:Colors.border100

    },
    stat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5
    },
    statValue: {
        color: Colors.text,
        fontWeight: "500",
    },
    statText: {
        color: Colors.text100,
        fontSize: 11
    },
    subbed: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 5,

    },
    subbedJersey: {
        backgroundColor: Colors.background,
        color: Colors.text,
        borderRadius: 5,
        paddingVertical: 1,
        fontWeight: "500",
        width: 20,
        textAlign: "center",
        fontSize: 11
    },
    subbedName: {
        fontSize: 12,
        color: Colors.text,
    },
    statsBottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 4,
        marginBottom: 8,
    }

})