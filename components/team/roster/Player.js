import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors';
import { useRouter } from 'expo-router';

const IMG_SIZE = 20

const getSlug = (flagString) => {

    const regex = /\/([a-z]+)\.png$/i;
    const slug = flagString.match(regex);

    return slug[1]

}


const getUri = (flagString) => {

    const slug = getSlug(flagString)
    const uri = `https://a1.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${slug}.png?w=${IMG_SIZE + 15}&h=${IMG_SIZE + 15}`
    return uri

}




const Player = ({ player }) => {
    const {push} = useRouter()
    

    return (
        <TouchableNativeFeedback onPress={() => push(`player/${player.id}`)}>
            <View style={s.container}>
                <View style={[s.playerInfo, s.left]}>
                    <Text style={s.playerJersey}>{"jersey" in player ? `${player.jersey}` : "-"}</Text>
                    <Image source={{ uri: "flag" in player ? getUri(player.flag.href) : undefined }} width={IMG_SIZE} height={IMG_SIZE} />

                    <Text style={s.playerName}>{player.fullName}</Text>
                </View>

                <View style={[s.playerInfo, s.right]}>
                    <Text style={s.playerAge}>{player.age}</Text>
           
                </View>

            </View>
        </TouchableNativeFeedback>
    )
}

export default Player

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
        paddingVertical: 12,
        backgroundColor: Colors.card,

    },
    playerInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    playerName: {
        color: Colors.text,

    },
    playerJersey: {
        backgroundColor: Colors.background,
        color: Colors.text,
        borderRadius: 5,
        paddingVertical: 1,
        fontWeight: "500",
        width: 30,
        textAlign: "center",
        fontIMG_SIZE: 15
    },
    playerAge: {
        color: Colors.text,
        fontSize: 15
    }
})