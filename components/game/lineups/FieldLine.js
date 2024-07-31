import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../../constants/Colors'

import FieldPlayer from './FieldPlayer'

const WIDTH = Dimensions.get("screen").width
const HEIGHT = 450
const IMG_SIZE = 10



const FieldLine = ({ line, lineIndex, isHome, playersInLine, color, isThisBoca }) => {
    // props: players, line, lines, homeColor, awayColor, k

    let x = parseInt((lineIndex * WIDTH) / playersInLine) - 10


    return (
        <View style={[s.line, {
            left: isHome ? x : "unset",
            right: isHome ? "unset" : x,
            height: HEIGHT,
            flexDirection: isHome ? "column" : "column-reverse"
        }]}>

            {
                line.map((player, i) => (
                    <FieldPlayer

                        key={i}
                        position={player.position}
                        name={"lastName" in player.athlete ? player.athlete.lastName : player.athlete.displayName}
                        athlete={player.athlete}
                        jersey={player.jersey}
                        isHome={isHome}
                        plays={"plays" in player ? player.plays : false}
                        color={color}
                        subbedOutFor={"subbedOutFor" in player ? player.subbedOutFor : false}
                        isThisBoca={isThisBoca}
                    />
                ))

            }
        </View>
    )
}
export default FieldLine

const s = StyleSheet.create({
    field: {

        height: HEIGHT,
        borderRadius: 16,


    },

    line: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly"
    },

    play: {




    },

    playClock: {
        color: Colors.text100,
        fontSize: 11
    }
})