import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const Selector = ({ showKeyEvents, setShowKeyEvents }) => {
    return (
        <View style={s.container}>
            <View></View>

            <Button
                buttonColor={showKeyEvents ? "black" : "transparent"}
                textColor={showKeyEvents ? "white" : "grey"}
                mode='outlined'
                onPress={() => setShowKeyEvents(!showKeyEvents)}
            >
                Eventos destacados
            </Button>
        </View>
    )
}

export default Selector

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    }
})