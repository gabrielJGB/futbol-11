import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { translateStatLabel } from '../../../utils/match'

const Stat = ({ homeStat, awayStat }) => {
    let homeWidth = 0
    let awayWidth = 0
    let homeValue = Math.abs(parseFloat(homeStat.displayValue))
    let awayValue = Math.abs(parseFloat(awayStat.displayValue))
    let total = homeValue + awayValue

    homeWidth = (homeValue * 100) / total
    awayWidth = (awayValue * 100) / total
    homeWidth = homeWidth ? homeWidth : 0
    awayWidth = awayWidth ? awayWidth : 0



    return (
        <>

            {
                homeStat.displayValue != "0" &&
                awayStat.displayValue != "0" &&
                !homeStat.label.includes("%") &&
                !homeStat.label.includes("Effective") &&

                <View className="shadow shadow-black" style={s.container}>
                    <Text style={s.label}>{translateStatLabel(homeStat.label)}</Text>

                    <View style={s.body}>

                        <View style={s.stat}>

                            <Text style={s.statHome}>{parseInt(homeStat.displayValue).toFixed()}</Text>
                            <Text style={[s.statBar, {
                                backgroundColor: "#32ea32",
                                width: (`${homeWidth.toFixed()}%`),
                                borderTopLeftRadius:3,
                                borderBottomLeftRadius:3,
                            }]}></Text>
                        </View>

                        <View style={s.stat}>

                            <Text style={[s.statBar, {
                                backgroundColor: "#1673ff",
                                width: (`${awayWidth.toFixed()}%`),
                                borderTopRightRadius:3,
                                borderBottomRightRadius:3,

                            }]}></Text>
                            <Text style={s.statAway}>{parseInt(awayStat.displayValue).toFixed()}</Text>
                        </View>

                    </View>
                </View>

            }

        </>
    )
}

export default Stat

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 10

    },
    label: {
        color: Colors.text,
        textAlign: "center",
        fontWeight: "500",
        marginBottom: 2,

    },
    body: {
        backgroundColor: Colors.card200,
        borderWidth: 1,
        borderColor: Colors.card,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 2,
        width: "100%",
        paddingHorizontal: 2,
        borderRadius: 5

    },
    stat: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "50%"

    },

    statHome: {
        fontSize: 17,
        color: Colors.text,
        fontWeight: "500",
        paddingLeft: 5
    },
    statAway: {
        fontSize: 17,
        color: Colors.text,
        fontWeight: "500",
        paddingRight: 5
    },
    statBar: {
        color: Colors.text,
        height: 8,
    }


})