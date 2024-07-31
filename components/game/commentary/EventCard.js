import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getEventColor, getEventIcon, getLogo, translateEventText } from '../../../utils/match'
import Colors from '../../../constants/Colors'

const EventCard = ({ text, clock, participants, typeId, typeText, team }) => {



    return (
        <View style={s.container}>
            {
                clock != "" &&
                <View style={s.eventHeader}>

                    <Text style={[{ backgroundColor: getEventColor(typeId) }, s.clock]}>
                        {clock}
                    </Text>

                    {getLogo(team, 20)}

                    <Text style={[{ color: getEventColor(typeId) }, s.title]}>
                        {translateEventText(typeText)}
                    </Text>

                </View>
            }

            {
                text &&
                <Text style={s.text}>{text}</Text>
            }

            {
                participants &&
                <View style={s.participants}>
                    {
                        participants.map((elem, i) => (
                            <View key={i} style={s.participant}>

                                {getEventIcon(typeId, i)}
                                <Text style={s.player}>{elem.athlete.displayName}</Text>

                            </View>
                        ))
                    }
                </View>

            }

        </View>
    )
}

export default EventCard

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        borderRadius: 7,
        padding: 12,
        backgroundColor: Colors.card,
        borderWidth:1,
        borderColor:Colors.card100

    },
    eventHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        
    },
    clock: {
        color: "black",
        fontSize: 16,
        borderRadius: 3,
        paddingHorizontal: 3,
        paddingVertical: 1,
        fontWeight: "500",


    },
    title: {
        fontSize: 16,
        fontWeight: "500",
        
    },
    text: {
        
        color: Colors.text100,
        fontSize: 13,
        lineHeight: 20
    },
    participants: {
        display: "flex",
        flexDirection: "column",
        gap: 10

    },
    participant: {
        backgroundColor: Colors.background,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderRadius: 3,
        paddingVertical: 6,
        paddingHorizontal: 10
    },
    player: {
        fontSize: 13,
        borderRadius: 3,
        color: Colors.text

    }

})