import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { Button } from 'react-native-paper'
import { getLogo } from '../../../utils/match'
import { useRouter } from 'expo-router'

const IMG_SIZE = 22

const Card = ({ value, title, img }) => {


    return (
        <View style={s.card}>
            <Text style={s.cardTitle}>{title}</Text>
            <View style={s.cardBody}>
                {img && <Image source={{ uri: `${img}?w=${IMG_SIZE}&h=${IMG_SIZE}` }} width={IMG_SIZE} height={IMG_SIZE} />}
                <Text style={s.cardValue}>{value}</Text>
            </View>
        </View>
    )
}

const Information = ({ player }) => {

    const { push } = useRouter()

    

    return (
        
            <View style={s.container}>

                {
                    "age" in player &&
                    <Card title="Edad" value={player.age} img={false} />
                }

                {
                    "displayDOB" in player &&
                    <Card title="Fecha de nac." value={player.displayDOB} img={false} />
                }

                {
                    "citizenship" in player && 
                    <Card title="Nacionalidad" value={player.citizenship} img={ "flag" in player ? player.flag.href : false} />
                }

                {
                    "displayHeight" in player &&
                    <Card title="Altura" value={player.displayHeight} img={false} />
                }

                {
                    "displayWeight" in player &&
                    <Card title="Peso" value={player.displayWeight} img={false} />
                }

                {
                    "status" in player && player.status.type &&
                    <Card title="Estado" value={player.status.type === "active" ? "En actividad" : "Retirado"} img={false} />
                }




            <View style={s.clubButton}>
                <Text style={s.clubTitle}>Equipo</Text>
                <Button
                    style={{ borderRadius: 8, marginHorizontal: 10 }}
                    rippleColor={Colors.card100}
                    buttonColor='black'
                    mode='elevated'
                    onPress={() => push(`team/${player.team.id}?season=${new Date().getFullYear()}`)}
                >
                    <View style={s.button}>
                        {getLogo(player.team, 22)}
                        <Text style={s.team}>{player.team.displayName}</Text>
                    </View>
                </Button>
            </View>

            </View>

            
        


    )
}

export default Information

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection:"row",
        alignItems: "stretch",
        flexWrap: "wrap",
        gap:10,
        marginBottom:20
        
    },
    card: {
        display: "flex",
        minWidth:90,
        flex:1,
        backgroundColor: Colors.card,
        paddingVertical:1,
        borderWidth: 1,
        borderColor: Colors.card100,
        borderRadius: 5

    },
    cardTitle: {
        textAlign:"center",
        fontSize: 11,
        color: Colors.text100
    },
    cardBody: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 3
    },
    cardValue: {
        fontSize: 16,
        fontWeight: "500",
        color: Colors.text
    },
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,

    },
    team: {
        fontSize: 16,
        color: Colors.text
    },
    clubButton: {
        minWidth:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 7,
        backgroundColor: Colors.card,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.card100,
        paddingTop: 3,
        paddingBottom: 8
    },
    clubTitle: {
        fontSize:12,
        textAlign: "center",
        color: Colors.text100
    }

})