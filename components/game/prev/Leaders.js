import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { Divider } from 'react-native-paper'
import { getLogo } from '../../../utils/match'

const Leaders = ({ leaders }) => {


    return (
        <View style={s.container}>
            <Text style={s.title} >GOLEADORES</Text>
            <Divider style={s.divider} />

            <View style={s.leadersContainer}>

                {

                    leaders?.map((elem, i) => (
                        <View key={i} style={s.teamLeaders} >

                            <View style={s.teamHeader}>
                                {getLogo(elem.team, 20)}
                                {/* <Text className={`  `}>{elem.team.displayName}</Text> */}
                            </View>




                            {
                                elem.leaders[0].leaders?.map((leader, i) => (

                                    <TouchableNativeFeedback key={i} onPress={() => { }}>
                                        <View style={s.leader} >

                                            {/* <View className={` flex flex-row items-center `}> */}
                                            {/* <Text className={``}>{i + 1}.{" "}</Text> */}
                                            <Text style={s.leaderName}>
                                                {leader.athlete.fullName.toUpperCase()}
                                            </Text>
                                            {/* </View> */}

                                            <View style={s.leaderData}>

                                                <View style={s.leaderStat}>
                                                    <Text style={s.leaderStatValue}>
                                                        {leader.displayValue.split(", ")[1].split(": ")[1]}
                                                    </Text>
                                                    <Text style={s.leaderStatName}>Goles</Text>
                                                </View>

                                                <View style={s.leaderStat}>
                                                    <Text style={s.leaderStatValue}>
                                                        {leader.displayValue.split(", ")[0].split(": ")[1]}
                                                    </Text>
                                                    <Text style={s.leaderStatName}>Partidos</Text>
                                                </View>

                                                <View style={s.leaderStat}>
                                                    <Text style={s.leaderStatValue}>
                                                        {(leader.displayValue.split(", ")[1].split(": ")[1] / leader.displayValue.split(", ")[0].split(": ")[1]).toFixed(2)}
                                                    </Text>
                                                    <Text style={s.leaderStatName}>Prom</Text>
                                                </View>
                                            </View>

                                            {/* <Divider className={`bg-[${theme.colors.border}] h-[1px] w-[100%] mx-auto`} /> */}

                                        </View>
                                    </TouchableNativeFeedback>
                                ))
                            }



                        </View>
                    ))

                }

            </View>

        </View>
    )
}

export default Leaders

const s = StyleSheet.create({
    title: {
        paddingVertical: 5,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "500",
        color: Colors.text
    },
    container: {
        backgroundColor: Colors.card,
        borderRadius: 7,

    },
    divider: {
        backgroundColor: Colors.border
    },
    leadersContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",


    },
    teamLeaders: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 12,
        width: "50%",
        paddingBottom: 10,
        borderRadius: 12


    },
    teamHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
        marginTop: 5,
        paddingVertical: 3,


    },
    leader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 10,
        alignItems: "center",
        borderRadius: 0,
        padding: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.highlight,
        backgroundColor: Colors.card100,

    },
    leaderName: {
        textAlign: "left",
        fontWeight: "500",
        fontSize: 12,
        color: Colors.text
    },
    leaderData: {
        display: "flex",
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between"
    },
    leaderStat: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    leaderStatName: {
        color: Colors.text100,
        fontSize: 11
    },
    leaderStatValue: {
        color: Colors.text,
        fontWeight: "500"
    }
})


