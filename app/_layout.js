import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@react-navigation/native';
import CustomTheme from '../constants/Colors'
import { Stack } from 'expo-router';
import { StateProvider } from '../context/StateContext';
import { AppProvider } from '../context/AppContext';
import { getSofaData } from '../utils/match';

export default function App() {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showOnlyPlaying, setShowOnlyPlaying] = useState(false)
    const [sofaEvents, setSofaEvents] = useState(false)
    const [leagues, setLeagues] = useState(false)
    const [firstRender, setFirstRender] = useState(true)


    useEffect(() => {

        getSofaData(selectedDate)
            .then(data => setSofaEvents(data))
            .catch(error => { setSofaEvents(false) })


    }, [selectedDate])


    return (


        <AppProvider value={{
            sofaEvents,
            selectedDate,
            firstRender,
            setFirstRender

        }}>
            <StateProvider value={{
                selectedDate, setSelectedDate,
                leagues, setLeagues,
                showOnlyPlaying,
                setShowOnlyPlaying
            }} >
                <ThemeProvider value={{
                    dark: true,
                    colors: { ...CustomTheme }
                }}>
                    <Stack

                        screenOptions={{
                            animation: "slide_from_right",
                            headerShown: false,
                            statusBarColor: CustomTheme.card,
                            statusBarStyle: "light"
                        }}

                    >

                        <Stack.Screen
                            name="index"
                            options={{ title: 'Futbol 11' }}
                        />

                        <Stack.Screen
                            name="game/[id]"
                        />
 
                        <Stack.Screen
                            name="league/[id]"
                        />

                        <Stack.Screen
                            name="player/[id]"
                        />
                        <Stack.Screen
                            name="team/[id]"
                        />
                        
                        <Stack.Screen
                            name="article/[id]"
                        />
                        <Stack.Screen
                            name="video/[id]"
                        />



                    </Stack>

                </ThemeProvider>
            </StateProvider>
        </AppProvider>
    );
}
