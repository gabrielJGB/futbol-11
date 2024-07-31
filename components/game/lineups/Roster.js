import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import Player from './Player'
import { Divider } from 'react-native-paper'

const Roster = ({ roster, logo, show }) => {



    return (
        <View style={{gap:1, display: show ? "flex" : "none", width: Dimensions.get('window').width, paddingHorizontal: 2 }}>

            <View style={s.header}>
                {logo}
                <Text style={s.title}>TITULARES</Text>
            </View>

            {
                roster.filter(elem => elem.starter).map((player, i) => (
                        <Player key={i} player={player} />
                ))
            }

            <View style={s.header}>
                {logo}
                <Text style={[s.title, s.titleSup]}>SUPLENTES</Text>
            </View>
            {
                roster.filter(elem => !elem.starter).map((player, i) => (
                        <Player key={i} player={player} />
                ))
            }


        </View>
    )
}

export default Roster

const s = StyleSheet.create({
    title: {
        color: Colors.text,
        fontWeight: "500",
        textAlign: "center",
        fontSize: 22,
        marginVertical: 5
    },
    titleSup: {


    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 7,
        marginTop: 15
    },
    divider: {
        backgroundColor: Colors.border
    },
    

})