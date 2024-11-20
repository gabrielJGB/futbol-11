import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import WebView from 'react-native-webview';
import Colors from '../../../constants/Colors';



const AttackMomentum = ({ sofaId }) => {


    return (
        <View>
            {
                sofaId &&
                <View style={s.container}>

                    <View style={s.text}>
                        <Text style={s.title}>ATTACK MOMENTUM</Text>
                        <Divider style={s.divider} />
                        <Text style={s.description}>Attack Momentum™ te permite seguir el partido en vivo con un algoritmo que muestra la presión de cada equipo a lo largo del tiempo.</Text>
                    </View>
                    
                    <WebView
                        source={{ uri: `https://widgets.sofascore.com/es-ES/embed/attackMomentum?id=${sofaId}&widgetTheme=dark&v=2` }}
                        style={s.webview}
                    />

                </View>
            }
        </View>
    )
}

export default AttackMomentum

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor:Colors.card,
        borderRadius:7

    },
    text: {
        display: "flex",
        flexDirection: "column",

    },
    title: {
        color: Colors.text,
        fontSize: 18,
        paddingVertical:7,
        textAlign:"center",
        fontWeight:"500"

    },
    description: {
        marginTop:5,
        paddingHorizontal:11,
        paddingVertical:8,
        lineHeight:16,
        color: Colors.text100,
        fontSize: 12
    },
    webview:{
        height:285,
        marginBottom:10,
        marginHorizontal:"auto",
        width:"97%",
        backgroundColor:Colors.card
    },
    divider:{
        backgroundColor:Colors.border
    }
})