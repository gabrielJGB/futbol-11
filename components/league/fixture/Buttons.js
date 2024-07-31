import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { Button } from 'react-native-paper'

const Buttons = ({ array,selectedWeek,setSelectedWeek }) => {


    return (
        <View style={s.container}>
            {
                array.map((e, i) => (

                    <Button
                        key={i}
                        style={s.button}
                        mode="outlined"
                        rippleColor={Colors.highlight}
                        buttonColor={selectedWeek === i ? Colors.highlight:Colors.card}
                        textColor='white'
                        labelStyle={{ marginVertical: 10, marginHorizontal: 0 }}
                        onPress={() => setSelectedWeek(i)}
                    >{i + 1}</Button>
                ))
            }

            <Text style={s.week}>Semana {selectedWeek+1}</Text>
            

        </View>
    )
}

export default Buttons


const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        flexWrap: "wrap",
    },
    button: {
        borderRadius: 5,
        padding: 0,
        textAlignVertical: "center",
        borderColor: Colors.card100
    },
    week:{
        marginTop:10,
        width:"100%",
        textAlign:"center",
        color:Colors.text,
        fontSize:18,
        fontWeight:"500"
    }
})