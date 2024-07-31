import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import Colors from '../../constants/Colors'
import { useStateContext } from '../../context/StateContext'

const PlayerHeader = () => {
    const { player } = useStateContext()
    const { back } = useRouter()

    return (
        <View style={s.container}>

            <IconButton icon="arrow-left" iconColor='white' size={22} onPress={() => back()} />
            
            <View style={s.header}>
                <Text style={s.jersey}>{"displayJersey" in player?player.displayJersey?.replace("#",""):"-"}</Text>
                <View style={s.player}>
                    <Text style={s.name}>{player.displayName}</Text>
                    <Text style={s.position}>{player.position?.displayName.replace("Atacante","Delantero").toUpperCase()}</Text>
                </View>
            </View>



        </View>
    )
}

export default PlayerHeader

const s = StyleSheet.create({

    container: {

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.card,
        borderBottomColor: Colors.background,
        borderBottomWidth: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap:6,
        paddingTop: 2,
        paddingBottom: 6,
        
    },

    jersey: {
        minWidth:40,
        height:40,
        textAlign:"center",
        verticalAlign:"middle",
        textAlignVertical:"center",
        borderRadius:10,
        color: Colors.text,
        paddingHorizontal:3,
        fontSize: 24,
        alignSelf:"center",
        // backgroundColor:Colors.card100,
        backgroundColor:"#121212",
        borderWidth:2,
        borderColor:Colors.border100,
        fontWeight: "500",

    },
    player: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
        gap: 2,
        
        width:"85%"


    },
    name: {
        
        color: Colors.text,
        fontSize: 22,
        fontWeight: "500"
    },
    position: {
        color: Colors.text100,
        fontSize: 12,
        fontWeight: "500",

    }

})