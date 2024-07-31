import React, { memo, useState } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, FlatList } from 'react-native'
import colors from '../../constants/Colors'
import GameCard from './GameCard'
import { gamePlaying, getFlag } from '../../utils/match'
import Colors from '../../constants/Colors'
import { Icon } from 'react-native-paper'
import { useStateContext } from '../../context/StateContext'
import { useRouter } from 'expo-router'

const LeagueCard = ({ league }) => {

    const [leagueVisible, setLeagueVisible] = useState(true)
    const { showOnlyPlaying } = useStateContext()
    const { push } = useRouter()



    const LeagueHeader = () => {

        return (
            <TouchableNativeFeedback onPress={() => { setLeagueVisible(prev => !prev) }}>
                <View style={[s.leagueHeader, { borderBottomWidth: leagueVisible ? 1 : 0 }]}>
                    <View style={s.leagueHeaderContent}>
                        {getFlag(league.item, 25)}
                        <Text style={s.headerText}>{league.item.name.toUpperCase()}</Text>
                    </View>

                    <Icon source={`chevron-${leagueVisible ? "up" : "down"}`} color="white" size={18} />
                </View>
            </TouchableNativeFeedback>

        )
    }


    const LeagueFooter = () => {

        return (
            <TouchableNativeFeedback onPress={() => push(`league/${league.item.slug}`)}>
                <View style={s.footer}>
                    <Text style={s.footerText}>Calendario completo</Text>
                    <Icon source="chevron-right" size={17} color='white' />
                </View>
            </TouchableNativeFeedback>

        )
    }


    return (


        <View
            style={[s.container, { display: gamePlaying(league) || !showOnlyPlaying ? "flex" : "none" }]} >

            < LeagueHeader />

            
                
                <FlatList
                    style={{ display: (leagueVisible ? "flex" : "none") }}
                    data={league.item.events}
                    renderItem={(game) => (<GameCard game={game} league={league} status={game.item.fullStatus} />)}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={() => (<LeagueFooter />)}
                    removeClippedSubviews
                    initialNumToRender={7}
                />
            


        </View>


    )
}

export default memo(LeagueCard)



const s = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: Colors.card,
        display: "flex",
        flexDirection: "column",
        marginBottom: 24,
        gap: 0,


    },

    leagueHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 12,
        borderBottomColor: Colors.highlight,

    },
    leagueHeaderContent: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
        alignItems: "center",

    },
    headerText: {
        fontWeight: "bold",
        color: colors.text,
        fontSize: 15

    },

    separator: {
        // borderTopWidth: 1,
        // borderColor: Colors.highlight
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16
    },
    footerText: {
        textAlign: "center",
        color: "white"

    }


})
