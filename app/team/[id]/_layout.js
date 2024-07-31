import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useGlobalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, Button, Icon } from 'react-native-paper';
import { StateProvider } from '../../../context/StateContext';
import { fetchTeam, fetchTeamRoster } from '../../../utils/fetch';
import TeamHeader from '../../../components/team/TeamHeader';

const TeamLayout = () => {


    const { id, season, league } = useGlobalSearchParams();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [selectedLeague, setSelectedLeague] = useState(league)
    const [selectedSeason, setSelectedSeason] = useState(season)
    const [team, setTeam] = useState(false)
    const { back } = useRouter()
    const ICON_SIZE = 26


    const _fetchTeam = () => {


        setLoading(true)
        fetchTeam(id, selectedSeason)
            .then(team => {
                setSelectedLeague(league || team.leagues[0].slug);
                setTeam(team)
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }




    useEffect(() => {

        console.log(`Fetching team ${id}, ${selectedSeason},${selectedLeague} ...`)
        _fetchTeam()

    }, [selectedSeason])




    if (loading)
        return (
            <View style={s.spinner}>
                <ActivityIndicator color='white' size={35} />
            </View>
        )


    if (error)
        return (

            <View style={s.error}>
                <Text style={s.errorText} >Sin datos</Text>
                <Button
                    buttonColor='black'
                    mode='outlined'
                    textColor='white'
                    icon="arrow-left"
                    style={{ borderRadius: 5 }}
                    onPress={() => back()}
                >Volver</Button>
            </View>
        )

    return (


        <StateProvider value={{
            ...team,
            id,
            selectedLeague, setSelectedLeague,
            selectedSeason, setSelectedSeason,

        }}>
            <Tabs
                screenOptions={{

                    tabBarActiveTintColor: "lime",
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: { height: 63, paddingBottom: 12 },

                    header: () => <TeamHeader />,
                }}

                backBehavior='none'
            >
                <Tabs.Screen
                    name='fixture'
                    options={{
                        href: "team/[id]/fixture",
                        title: 'Fixture',
                        tabBarIcon: ({ color }) => <Icon source="calendar-text" size={ICON_SIZE} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='roster'
                    options={{
                        href: "team/[id]/roster",
                        title: 'Plantel',
                        lazy: true,
                        tabBarIcon: ({ color }) => <Icon source="human-queue" size={ICON_SIZE} color={color} />,

                    }}
                />

                <Tabs.Screen
                    name='news'
                    options={{
                        href: "news" in team ? "team/[id]/news" : null,
                        title: 'Noticias',
                        tabBarIcon: ({ color }) => <Icon source="newspaper-variant" size={ICON_SIZE} color={color} />,

                    }}
                />


            </Tabs>
        </StateProvider>
    )
}

export default TeamLayout

const s = StyleSheet.create({
    spinner: {
        marginTop: 40
    },
    error: {
        display: "flex",
        flexDirection: "column",
        gap: 40,
        justifyContent: "center",
        marginHorizontal: 90
    },
    errorText: {
        marginTop: 250,
        textAlign: "center",
        color: "white"
    }
})