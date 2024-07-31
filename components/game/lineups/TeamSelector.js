import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { getLogo } from '../../../utils/match'
import Colors from '../../../constants/Colors'

const TeamSelector = ({ game, selectedIndex, setSelectedIndex }) => {
    return (
        <View style={s.container}>



            {
                game.rosters.map((elem, i) => (

                    <TouchableNativeFeedback
                        key={i}
                        onPress={() => setSelectedIndex(prev => prev == 0 ? 1 : 0)}
                    >
                        <View style={[s.selector, { backgroundColor: (selectedIndex === i ? Colors.card : Colors.background) }]}>

                            {getLogo(elem.team, 20)}
                            <Text style={{ color: selectedIndex === i ? Colors.text : Colors.card100 }}>
                                {elem.team.abbreviation}
                            </Text>

                        </View>
                    </TouchableNativeFeedback>
                ))
            }

        </View>
    )
}

export default TeamSelector

const s = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        gap:0,
        width:"100",
        marginVertical:0
    },
    selector: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 14,
        borderWidth: 1,
        borderColor:Colors.card
    }
})

