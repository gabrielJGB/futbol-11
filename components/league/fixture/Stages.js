import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import Colors from '../../../constants/Colors'
import { translateTitle } from '../../../utils/match'

const Stages = ({ stages, selectedStage, setSelectedStage }) => {



    return (
        <View style={s.container}>

            {
                stages.map((stage, i) => (
                    <TouchableNativeFeedback key={i} onPress={() => setSelectedStage(stage)}>
                        <View style={[s.buttonContainer, (selectedStage.slug === stage.slug && Colors.card100 && s.selected)]}>
                            <Text style={s.text}>{translateTitle(stage.name)} </Text>
                        </View>
                    </TouchableNativeFeedback>
                ))
            }
        </View>
    )
}

export default Stages

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        
        gap: 1,
        flexWrap: "wrap"
    },
    buttonContainer: {
        borderRadius: 0,
        paddingHorizontal: 10,
        paddingVertical:11,
        backgroundColor: Colors.card,
        width: "100%"
    },
    text: {
        color: Colors.text
    },
    selected: {
        backgroundColor:Colors.highlight,
    }
})