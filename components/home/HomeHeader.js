import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import colors from '../../constants/Colors'
import { formatDateObject, isSameDay } from '../../utils/time'
import { Button, IconButton } from 'react-native-paper'
import Colors from '../../constants/Colors'
import { useStateContext } from '../../context/StateContext'
import { useFocusEffect, useRouter } from 'expo-router'
import { gamePlaying } from '../../utils/match'


const HomeHeader = ({ selectedDate, setSelectedDate }) => {

    const { push } = useRouter()
    const previousDate = new Date(selectedDate.getTime() - 86400000)
    const nextDate = new Date(selectedDate.getTime() + 86400000)
    const { showOnlyPlaying, setShowOnlyPlaying, leagues } = useStateContext()
    const [showLiveButton, setShowLiveButton] = useState(false)


    useFocusEffect(useCallback(() => {

        if (leagues) 
            setShowLiveButton(gamePlaying(leagues))
        

    }, [leagues]))



    return (
        <View style={s.container}>
            <View style={s.header}>
                <IconButton
                    icon="magnify"
                    iconColor='white'
                    style={{ marginVertical: 0, marginRight: 20, marginLeft: 0, padding: 0 }}
                    size={25}
                    onPress={() => push("search")}
                />
                <Text style={s.headerTitle}>FÚTBOL 11</Text>

                {
                    showLiveButton ?
                        <Button
                            mode="outlined" labelStyle={{ marginVertical: 5, marginHorizontal: 0 }}

                            textColor='white'
                            rippleColor="red"
                            style={[s.liveButton, showOnlyPlaying ? s.on : s.off]}
                            onPress={() => setShowOnlyPlaying(!showOnlyPlaying)}
                        >En vivo</Button>
                        :
                        <View style={{ width: 54 }}></View>
                }

            </View>
            <View style={s.buttons}>

                <Pressable android_ripple={{ color: "#5e7edb", }} onPress={() => setSelectedDate(previousDate)}>
                    <View style={s.button}>
                        <Text style={s.buttonText}>

                            {formatDateObject(previousDate)}

                        </Text>
                    </View>
                </Pressable>


                <View style={[s.button, s.centerButton]}>
                    <Text style={s.buttonText}>

                        {formatDateObject(selectedDate)}

                    </Text>
                </View>


                <Pressable android_ripple={{ color: "#5e7edb" }} onPress={() => setSelectedDate(nextDate)}>
                    <View style={s.button}>
                        <Text style={s.buttonText}>

                            {formatDateObject(nextDate)}

                        </Text>
                    </View>
                </Pressable>

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
        width: "100%",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
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
        width: Dimensions.get("window").width / 3,
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