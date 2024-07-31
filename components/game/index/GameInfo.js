import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider, Icon } from 'react-native-paper'

import { convertTimestamp } from '../../../utils/time'
import { useStateContext } from '../../../context/StateContext'
import Colors from '../../../constants/Colors'

const Card = ({ title, value, icon }) => {

    value = value === "Ida" ? "Partido de Ida" : value

    return (
        <View style={s.card}>

            <Icon source={icon} color={Colors.text} size={30} />

            <View style={s.right}>
                {
                    title &&
                    <Text style={s.cardTitle} >{title}</Text>
                }
                <Text style={s.cardValue} >{value}</Text>
            </View>
        </View>
    )
}


const GameInfo = () => {

    const { game } = useStateContext()
    const gameDate = convertTimestamp(game.header.competitions[0].date)
    const dateString = `${gameDate.dayOfWeek} ${gameDate.day} de ${gameDate.month} de ${gameDate.year}, ${gameDate.time} hs`

    return (
        <View style={s.container}>

            <Text style={s.title} >INFORMACIÓN DEL PARTIDO</Text>

            <Divider style={s.divider} />

            <Card title="Fecha" value={dateString} icon={"calendar-month"} />

            {
                "venue" in game.gameInfo && "city" in game.gameInfo.venue.address &&

                <Card title="Ciudad" value={`${game.gameInfo.venue.address.city}${"country" in game.gameInfo.venue.address ? ", " + game.gameInfo.venue.address.country : ""}`} icon={"city"} />
            }

            {
                "venue" in game.gameInfo && game.gameInfo.venue &&

                <Card title={"Estadio"} value={game.gameInfo.venue.fullName} icon={"stadium"} />

            }

            {
                "attendance" in game.gameInfo && game.gameInfo.attendance > 0 &&

                <Card title={"Espectadores"} value={game.gameInfo.attendance} icon={"crowd"} />

            }

            {
                "officials" in game.gameInfo &&

                <Card title={"Arbitro"} value={game.gameInfo.officials[0].fullName} icon={"whistle"} />

            }

            {
                "gameNote" in game.header &&

                game.header.gameNote.split(" - ").map((note, i) => (
                    <Card
                        key={i}
                        title={false}
                        value={note.replace("Juego", "Partido")}
                        icon="information"
                    />
                ))

            }

            {
                "groups" in game.header.competitions[0].competitors[0] &&

                <Card
                    title={false}
                    value={game.header.competitions[0].competitors[0].groups.abbreviation}
                    icon="information-outline"
                />


            }



            {
                !"groups" in game.header.competitions[0].competitors[0] &&
                game.header.competitions[0].groups?.abbreviation.includes("Grupo") &&


                <Card
                    title={false}
                    value={game.header.competitions[0].groups.abbreviation}
                    icon="information-outline"
                />

            }


        </View>
    )
}

export default GameInfo

const s = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 7,
        paddingLeft:12,
        
        
    },
    container:{
        backgroundColor:Colors.card,
        borderRadius:7
    },
    title:{
        paddingVertical:5,
        textAlign:"center",
        fontSize:18,
        fontWeight:"500",
        color:Colors.text
    },
    cardTitle:{
        fontSize:12,
        fontWeight:"500",
        color:Colors.text100
    },
    cardValue:{
        
        fontSize:14,
        color:Colors.text
    },
    divider:{
        backgroundColor:Colors.highlight
    },
    right:{
        maxWidth:"85%"
    }

})