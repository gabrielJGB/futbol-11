import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { no_score, score } from '../../../assets'
import { LinearGradient } from 'expo-linear-gradient'


const Shot = ({ shot, i }) => {

    const IMG_SIZE = 18

    return (

        <LinearGradient
            // Button Linear Gradient
            style={{borderRadius:5}}
            colors={[i % 2 === 0 ?Colors.card:Colors.background, i % 2 === 0 ?Colors.background:Colors.card]}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.7, y: 0 }}
            >


            <View style={[styles.row, {
                flexDirection: (i % 2 === 0 ? "row" : "row-reverse"),
            }]}>
                <Text style={styles.shotNumber}>{shot.shotNumber}</Text>
                <Image source={shot.didScore ? score : no_score} style={{ width: IMG_SIZE, height: IMG_SIZE }} />
                <Text style={styles.player}>{shot.player}</Text>
            </View>
        </LinearGradient>
    )
}

export default Shot

const styles = StyleSheet.create({
    row: {
        display: "flex",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 7,
        gap: 5,
        // backgroundColor: Colors.card,
        // borderWidth: 1,
        // borderColor: Colors.card100,
        


    },
    player: {
        fontSize: 13,
        color: Colors.text
    },
    shotNumber: {
        fontWeight: "500",
        color: Colors.text100
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})