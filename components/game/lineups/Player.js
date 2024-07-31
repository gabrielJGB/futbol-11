import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-paper'
import { getPlayImg, getPlayerColor } from '../../../utils/match'
import Colors from '../../../constants/Colors'
import PlayerStats from './PlayerStats'

const Player = ({ player }) => {

    const [statsVisible, setStatsVisible] = useState(false)
    const IMG_SIZE = 12

    return (
        <View>
            <TouchableNativeFeedback
                onPress={() => setStatsVisible(!statsVisible)}
            >
                <View style={s.playerContainer}>
                    <View style={s.playerData}>

                        <Text style={s.playerJersey}>
                            {player.jersey || "-"}
                        </Text>

                        <Text style={[s.playerPosition, { backgroundColor: (getPlayerColor(player.position)) }]}>
                            {player.position?.abbreviation || "SUP"}
                        </Text>

                        <Text style={s.playerName}>
                            {player.athlete.fullName}
                        </Text>

                        {
                            "plays" in player &&
                            player.plays.map((play, i) => (
                                <View key={i} style={s.play}>

                                    {
                                        play.substitution ?
                                            <>
                                                {
                                                    player.subbedOut ?
                                                        <Icon source={"chevron-left"} size={22} color='red' />
                                                        :
                                                        <Icon source={"chevron-right"} size={22} color='lime' />

                                                }
                                            </>
                                            :

                                            <Image source={getPlayImg(play)} style={{ width: IMG_SIZE, height: IMG_SIZE }} />

                                    }

                                    <Text style={s.playClock}>{play.clock.displayValue}</Text>

                                </View>
                            ))

                        }

                    </View>
                    <Icon source={`chevron-${statsVisible ? "up" : "down"}`} size={20} color="white" />
                </View>
            </TouchableNativeFeedback>

            <PlayerStats player={player} statsVisible={statsVisible} />


        </View>
    )
}

export default Player

const s = StyleSheet.create({
    playerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 6,
        backgroundColor: Colors.card
    },
    playerData: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "95%",
        alignItems: "center",
        gap: 7,
        paddingVertical: 7
    },
    playerJersey: {
        backgroundColor: Colors.background,
        color: Colors.text,
        borderRadius: 5,
        paddingVertical: 1,
        fontWeight: "500",
        width: 30,
        textAlign: "center",
        fontSize: 15
    },
    playerPosition: {
        fontWeight: "600",
        fontSize: 12,
        color: "black",
        textAlign: "center",
        width: 30,
        borderRadius: 3
    },
    playerName: {
        color: Colors.text
    },
    play: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 3
    },
    playClock: {

        color: Colors.text100,
        fontSize: 11
    },
    icon: {

    }
})