import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, useGlobalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Button, Icon } from 'react-native-paper';
import { fetchPlayer } from '../../../utils/fetch';
import { StateProvider } from '../../../context/StateContext';
import PlayerHeader from '../../../components/player/PlayerHeader';

const ICON_SIZE = 26

const PlayerLayout = () => {
    const { id } = useGlobalSearchParams();
    const [loading, setLoading] = useState(true)
    const [player, setPlayer] = useState(false)
    const [error, setError] = useState(false)
    const { back } = useRouter()



    useEffect(() => {
        console.log(`Fetching player ${id}...`);
        fetchPlayer(id)
            .then(resp => { setPlayer(resp) })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))
    }, [])


    if (loading)
        return (
            <View style={s.spinner}>
                <ActivityIndicator color='white' size={25} />
            </View>
        )

    if (error)
        return (

            <View style={s.error}>
                <Text style={s.errorText} >{!player ? "Sin datos del jugador" : ""}</Text>
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
            player, id
        }}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "lime",
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarStyle: { height: 63, paddingBottom: 12 },
                    header: () => <PlayerHeader />
                }}
                backBehavior='none'
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        href: "player/[id]/home",
                        title: 'Información',
                        tabBarIcon: ({ color }) => <Icon source="account" size={ICON_SIZE} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='stats'
                    options={{
                        href: "splits" in player.statistics ? "player/[id]/stats" : null,
                        title: 'Estadísticas',
                        tabBarIcon: ({ color }) => <Icon source="chart-bar-stacked" size={ICON_SIZE} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='history'
                    options={{
                        href: player.teamHistory ? "player/[id]/history" : null,
                        title: 'Trayectoria',
                        tabBarIcon: ({ color }) => <Icon source="history" size={ICON_SIZE} color={color} />,
                    }}
                />



                <Tabs.Screen
                    name='videos'
                    options={{
                        href: player.videos?.length > 0 ? "player/[id]/videos" : null,
                        title: 'Videos',
                        tabBarIcon: ({ color }) => <Icon source="video" size={ICON_SIZE} color={color} />,
                    }}
                />



                <Tabs.Screen
                    name='news'
                    options={{
                        href: "news" in player ? "player/[id]/news" : null,
                        title: 'Noticias',
                        tabBarIcon: ({ color }) => <Icon source="newspaper-variant" size={ICON_SIZE} color={color} />,
                    }}
                />

            </Tabs>
        </StateProvider>
    )
}

export default PlayerLayout

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