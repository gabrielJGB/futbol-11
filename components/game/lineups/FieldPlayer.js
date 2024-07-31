import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { Icon } from 'react-native-paper'
import { boot, goal, own_goal, penalty } from '../../../assets'
import { useRouter } from 'expo-router'


const IMG_SIZE = 12

const getPlay = (play) => {
    if (play.penaltyKick && play.didScore)
        return penalty
    else if (play.ownGoal)
        return own_goal
    else if (play.didScore)
        return goal
    else if (play.didAssist)
        return boot
}

const getColor = (plays, subbedOutFor) => {



    if (plays) {
        if (plays.find(play => play.redCard))
            return "#ff1616"
        else if (plays.find(play => play.yellowCard))
            return "yellow"
    }


    return "white"
    // return subbedOutFor ? "#c1c1c1" : "white"
}

const getName = name => {
    const arr = name.split(" ")

    if (arr.length === 2)
        return `${arr[1]}`

    if (arr.length === 3)
        return `${arr[1]} ${arr[2]}`

    return name
}

const FieldPlayer = ({ name, jersey, color, plays, subbedOutFor, position, athlete, isThisBoca }) => {

    // props: position, jersey, name, isHome, x, playersInLine, color, plays, subbedIn, subbedOut 

    const { push } = useRouter()


    return (
        <View style={s.playerContainer}>

            <TouchableNativeFeedback style={{borderRadius:10}} onPress={() => push(`player/${athlete.id}`)}>
                <View style={s.player}>


                    <View style={s.plays}>

                        {
                            plays &&
                            plays.map((play, i) => (

                                <View key={i} style={s.play}>
                                    <Image source={getPlay(play)} style={{ width: IMG_SIZE, height: IMG_SIZE }} />

                                </View>
                            ))
                        }
                    </View>

                    {/* { backgroundColor: `#${color==="ffffff"?"e3e3e3":color}` } */}


                    <View style={[s.playerJersey, { backgroundColor: (isThisBoca ? "#103279" : `#${color === "ffffff" ? "e3e3e3" : color}`) }]}>
                        {
                            isThisBoca &&
                            <View style={{ position: "absolute", top: 0, left: 0 }}>
                                <View style={{ height: 35 / 2.8, width: 34.9, backgroundColor: "#103279", borderTopRightRadius: 10, borderTopLeftRadius: 10 }}></View>
                                <View style={{ height: 35 / 3, width: 34.9, backgroundColor: "#e0a91c" }}></View>
                                <View style={{ height: 35 / 3, width: 34.9, backgroundColor: "#103279", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}></View>
                            </View>
                        }


                        <Text style={[s.playerNumber, { fontSize: (isThisBoca ? 23 : 18), fontWeight: "500" }]}>
                            {jersey}
                        </Text>
                    </View>
                    <Text style={[s.playerName, { color: getColor(plays, subbedOutFor) }]}>
                        {
                            subbedOutFor &&
                            <Icon source={"chevron-left"} size={14} color='red' />
                        }
                        {`${name != "" ? name : athlete.displayName}  `}

                        {/* {`${position.abbreviation}`} */}
                    </Text>


                    {
                        subbedOutFor &&
                        <View style={s.subbed}>
                            {/* <Text style={[s.playerNumber, s.subbedJersey, { backgroundColor: `#${color}` }]}>{subbedOutFor.jersey}</Text> */}
                            <Text style={[s.playerName,]}>
                                <Icon source={"chevron-right"} size={14} color='lime' />
                            </Text>
                            <Text style={[s.playerName, s.subbedName]}>
                                <Text style={[s.subbedJersey]}>{`${subbedOutFor.jersey}`}.</Text>
                                {` ${getName(subbedOutFor.athlete.displayName)}`}
                            </Text>
                        </View>
                    }


                </View>
            </TouchableNativeFeedback>
        </View>

    )
}


export default FieldPlayer

const s = StyleSheet.create({
    playerContainer: {

    },
    player: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        maxWidth: 100,
        minWidth: 95,
        alignSelf: "center",
        borderRadius:10,
        borderWidth: 1,
        borderColor: "transparent"
    },
    playerName: {
        fontWeight: "500",
        fontSize: 14,
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
        textAlign: "center",



    },
    svg: {
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    subbedName: {
        fontSize: 10,

    },
    playerNumber: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "rgba(30, 30, 30, 1)",
        color: "white",

        textAlignVertical: "center",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 18,
        minWidth: 35,
        minHeight: 35,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -0.6, height: -1 },
        textShadowRadius: 4
    },
    playerJersey: {
        borderWidth: 2,
        borderColor: "#1f1f1f",
        borderRadius: 12,
    },
    plays: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3

    },
    subbed: {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        gap: 0
    },
    subbedJersey: {
        fontSize: 9,
    }

})