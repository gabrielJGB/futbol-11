import { StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const Card = () => {

    return (
        <View style={s.card}>
            <View style={s.header}>
                <View style={[s.box, { width: 250 }]}></View>
            </View>
            {
                [1, 2].map(i => (
                    <View key={i} style={s.game}>
                        <View style={s.left}>
                            <View style={[s.box, { width: 180 }]}></View>
                            <View style={[s.box, { width: 140 }]}></View>
                        </View>
                        <View style={s.right}>
                            <View style={[s.box, { width: 60 }]}></View>
                        </View>
                    </View>
                ))
            }


        </View>
    )
}

const LoadingCards = () => {

    return (
        <View style={s.cardsContainer}>
            {
                [1, 2, 3, 4, 5].map(i => (
                    <Card key={i} />
                ))
            }
        </View>
    )
}

export default LoadingCards

const s = StyleSheet.create({
    cardsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginVertical: 10,
        paddingVertical: 7
    },
    header: {
        paddingHorizontal:10,
        paddingVertical:3,
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        backgroundColor: Colors.card,
        borderRadius: 8,

        paddingVertical: 10
    },
    game: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopColor: Colors.highlight,
        borderTopWidth: 1,
        marginTop: 10,
        paddingTop: 26,
        paddingBottom:20,
        paddingHorizontal:10,
        // width:"90%",
        // padding:9,
        gap: 10

    },
    box: {
        backgroundColor: Colors.card100,
        width: 200,
        height: 22,

    },
    left: {
        display: "flex",
        flexDirection: "column",
        gap: 7,
        width: "70%",
        borderRightColor: Colors.border,
        borderRightWidth: 1,
    },
    right: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "30%"
    }

})