import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { IconButton } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { getLogo } from '../../utils/match'
import { useStateContext } from '../../context/StateContext'

const Leagueheader = () => {
    const { back } = useRouter()
    const { league } = useStateContext()
    const IMG_SIZE = 60



    return (
        <View style={s.mainContainer}>

            <IconButton icon="arrow-left" iconColor='white' size={22} onPress={() => back()} />

            <View style={s.header}>
                {
                    "logos" in league && league.logos.length > 0 &&
                    < Image source={{ uri: league.logos.length> 1 ? league.logos[1].href : league.logos[0].href }} width={IMG_SIZE} height={IMG_SIZE} />
                }
                <Text style={s.screenTitle}>
                    {league.name.replace("Argentine", "")}
                    <Text style={s.year}>{"\n"}{league.year}</Text>
                </Text>
            </View>



        </View>
    )
}

export default Leagueheader

const s = StyleSheet.create({

    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingVertical: 5

    },
    mainContainer: {

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.card,
        borderBottomColor: Colors.background,
        borderBottomWidth: 1,
    },
    screenTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: "500"
    },
    year: {
        fontSize: 13,
        fontWeight: "500",
        color: Colors.text100,
        fontStyle:"italic"

    }
})