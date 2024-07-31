import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, Button, Icon } from 'react-native-paper'
import { fetchLeague } from '../../../utils/fetch'
import { StateProvider } from '../../../context/StateContext'
import Leagueheader from '../../../components/league/Leagueheader'

const ICON_SIZE = 26

const LeagueLayout = () => {

    const { id } = useLocalSearchParams()
    const [loading, setLoading] = useState(true)
    const [league, setLeague] = useState(false)
    const [error, setError] = useState(false)
    const { back } = useRouter()


    useEffect(() => {
        console.log(`Fetching league ${id}...`)

        fetchLeague(id)
            .then(resp => setLeague({ ...resp, slug: id }))
            .catch(error => setError(error))
            .finally(() => setLoading(false))

    }, [])


    if (loading)
        return (
            <View style={s.spinner}>
                <ActivityIndicator color='white' size={35} />
            </View>
        )


    if (error)
        return (

            <View style={s.error}>
                <Text style={s.errorText} >{!league ? "Sin datos" : `Ha ocurrido un error: ${error.message}`}</Text>
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
            league
        }}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "lime",
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: { height: 63, paddingBottom: 12 },
                    header: () => <Leagueheader />
                }}
                backBehavior='none'
            >

                <Tabs.Screen
                    name='fixture'
                    options={{
                        href: "league/[id]/fixture",
                        title: 'Calendario',
                        tabBarIcon: ({ color }) => <Icon source="calendar" size={ICON_SIZE} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='stats'
                    options={{
                        href: "league/[id]/stats",
                        title: 'Estadísticas',
                        tabBarIcon: ({ color }) => <Icon source="chart-bar-stacked" size={ICON_SIZE} color={color} />,
                    }}
                />



                <Tabs.Screen
                    name='positions'
                    options={{
                        href: "standings" in league ? "league/[id]/positions" : null,
                        title: 'Posiciones',
                        tabBarIcon: ({ color }) => <Icon source="table-large" size={ICON_SIZE} color={color} />,

                    }}
                />

                <Tabs.Screen
                    name='teams'
                    options={{
                        href: "league/[id]/teams",
                        title: 'Equipos',
                        tabBarIcon: ({ color }) => <Icon source="shield" size={ICON_SIZE} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='news'
                    options={{
                        href: "league/[id]/news",
                        title: 'Noticias',
                        tabBarIcon: ({ color }) => <Icon source="newspaper-variant" size={ICON_SIZE} color={color} />,

                    }}
                />


            </Tabs>
        </StateProvider>
    )
}

export default LeagueLayout

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