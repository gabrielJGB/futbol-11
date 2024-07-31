import { Tabs, useFocusEffect, useGlobalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { StateProvider } from '../../../context/StateContext';
import { fetchGame } from '../../../utils/fetch';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Icon } from 'react-native-paper';
import GameHeader from '../../../components/game/GameHeader';
import { useApp } from '../../../context/AppContext';
import { getSofaId } from '../../../utils/match';


export default function MatchLayout() {

    const [loading, setLoading] = useState(true)
    const [headerFull, setHeaderFull] = useState(true)
    const [game, setGame] = useState(null)
    const [sofaId, setSofaId] = useState(null)
    const [isFinished, setIsFinished] = useState(true)
    const [error, setError] = useState(false)
    const { sofaEvents } = useApp()
    const { id } = useGlobalSearchParams();
    const { back } = useRouter()
    const ICON_SIZE = 26




    const _fetchGame = () => {
        console.log(`Fetching game ${id}... ${new Date()}`)
        fetchGame(id)
            .then(gameData => {
                setGame(gameData)
                setSofaId(getSofaId(gameData.game, sofaEvents))
                setIsFinished(gameData.game.header.competitions[0].status.type.state === "post")

            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))

    }



    useFocusEffect(
        useCallback(() => {
            setSofaId(null)
            _fetchGame()

            if (!isFinished) {
                console.log("Game has not finished")
                _fetchGame()
                _fetchGame()

                const intervalId = setInterval(() => {
                    _fetchGame()

                }, 1000 * 30)
                return () => clearInterval(intervalId)
            }


        }, [isFinished]))




    if (loading)
        return (
            <View style={s.spinner}>
                <ActivityIndicator color='white' size={35} />
            </View>
        )

    if (error)
        return (

            <View style={s.error}>
                <Text style={s.errorText} >Sin datos para este partido</Text>
                <Button
                    buttonColor='black'
                    mode='outlined'
                    textColor='white'
                    icon="arrow-left"
                    style={{ borderRadius: 5 }}
                    onPress={() => back()}
                >Volver al inicio</Button>
            </View>
        )


    return (

        <StateProvider value={{
            ...game,
            headerFull,
            setHeaderFull,
            sofaId
        }}
        >


            <Tabs screenOptions={{
                tabBarActiveTintColor: "lime",
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { height: 63, paddingBottom: 12 },
                header: () => <GameHeader />,
            }}
                backBehavior='none'
            >
                <Tabs.Screen
                    name='info'
                    options={{
                        href: "game/[id]/info",
                        title: 'Resumen',
                        tabBarIcon: ({ color }) => <Icon source="home" size={ICON_SIZE} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='prev'
                    options={{
                        href: "game/[id]/prev",
                        title: 'Previa',
                        tabBarIcon: ({ color }) => <Icon source="history" size={ICON_SIZE} color={color} />,
                    }}
                />

                <Tabs.Screen
                    name='lineups'
                    options={{
                        href: (game.tabs.formaciones ? "game/[id]/lineups" : null),
                        title: 'Formaciones',
                        tabBarIcon: ({ color }) => <Icon source="soccer-field" size={ICON_SIZE} color={color} />,
                    }}
                />


                <Tabs.Screen
                    name='commentary'
                    options={{
                        href: (game.tabs.relato ? "game/[id]/commentary" : null),
                        title: 'Relato',
                        tabBarIcon: ({ color }) => <Icon source="microphone-variant" size={ICON_SIZE} color={color} />,
                    }}
                />


                <Tabs.Screen
                    name='positions'
                    options={{
                        href: (game.tabs.posiciones ? "game/[id]/positions" : null),
                        title: 'Posiciones',
                        tabBarIcon: ({ color }) => <Icon source="table" size={ICON_SIZE} color={color} />,
                    }}
                />


                <Tabs.Screen
                    name='stats'
                    options={{
                        href: (game.tabs.estadisticas ? "game/[id]/stats" : null),
                        title: 'Estadísticas',
                        tabBarIcon: ({ color }) => <Icon source="chart-bar-stacked" size={ICON_SIZE} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name='penalties'
                    options={{
                        href: (game.tabs.penales ? "game/[id]/penalties" : null),
                        title: 'Penales',
                        tabBarIcon: ({ color }) => <Icon source="soccer" size={ICON_SIZE} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name='videos'
                    options={{
                        href: (game.tabs.videos ? "game/[id]/videos" : null),
                        title: 'Videos',
                        tabBarIcon: ({ color }) => <Icon source="video" size={ICON_SIZE} color={color} />,
                    }}
                />
            </Tabs>

        </StateProvider>

    );
}

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