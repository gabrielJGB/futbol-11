import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import colors from '../../constants/Colors'
import { formatDateObject, isSameDay } from '../../utils/time'
import { Button } from 'react-native-paper'
import Colors from '../../constants/Colors'
import { useStateContext } from '../../context/StateContext'


const HomeHeader = ({ selectedDate, setSelectedDate }) => {

    const previousDate = new Date(selectedDate.getTime() - 86400000)
    const nextDate = new Date(selectedDate.getTime() + 86400000)
    const { showOnlyPlaying, setShowOnlyPlaying } = useStateContext()

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Text style={s.headerTitle}>Fútbol 11</Text>

                {
                    isSameDay(selectedDate, new Date()) ?
                        <Button
                            mode="outlined" labelStyle={{ marginVertical: 5, marginHorizontal: 0 }}
                            
                            textColor='white'
                            rippleColor="red"
                            style={[s.liveButton, showOnlyPlaying ? s.on : s.off]}
                            onPress={() => setShowOnlyPlaying(!showOnlyPlaying)}
                        >En vivo</Button>
                        :
                        <View></View>
                }

            </View>
            <View style={s.buttons}>

                <TouchableNativeFeedback onPress={() => setSelectedDate(previousDate)}>
                    <View style={s.button}>
                        <Text style={s.buttonText}>

                            {formatDateObject(previousDate)}

                        </Text>
                    </View>
                </TouchableNativeFeedback>


                <View style={[s.button, s.centerButton]}>
                    <Text style={s.buttonText}>

                        {formatDateObject(selectedDate)}

                    </Text>
                </View>


                <TouchableNativeFeedback onPress={() => setSelectedDate(nextDate)}>
                    <View style={s.button}>
                        <Text style={s.buttonText}>

                            {formatDateObject(nextDate)}

                        </Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        </View>
    )
}

export default HomeHeader



const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: colors.card,
        borderBottomColor: colors.background,
        borderBottomWidth: 1,
        marginTop: 0

    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.text
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 13,
        color: colors.text,

    },
    button: {
        width: "33%",
        paddingVertical: 12,
        borderColor: "transparent",
        borderBottomWidth: 2,
    },
    centerButton: {
        borderColor: "lime"
    },
    liveButton: {
        color: "white",
        borderWidth: 1,
        borderRadius: 5,
        fontWeight: "500",
        backgroundColor: "#a30000",
        borderColor: "#c52020",

    },
    on: {
        backgroundColor: "#a30000",
        borderColor: "#c52020",

    },
    off: {
        backgroundColor: "#000000",
        borderColor: Colors.border
    }

})