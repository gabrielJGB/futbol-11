import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import { useRouter } from 'expo-router'
import Colors from '../../constants/Colors'
import { useStateContext } from '../../context/StateContext'
import { getLogo } from '../../utils/match'
import { Picker } from '@react-native-picker/picker'

const TeamHeader = () => {

    const { back } = useRouter()
    const {
        team,
        leagues,
        selectedLeague,
        setSelectedLeague,
        selectedSeason,
        setSelectedSeason
    } = useStateContext()
    
    if(!team)
        return <ActivityIndicator size={20} color='white' />

    return (
        <View style={s.mainContainer}>

            <View style={s.backView}>
                <IconButton icon="arrow-left" iconColor='white' size={22} onPress={() => back()} />
                <View style={s.teamName}>
                    {getLogo(team, 22)}
                    <Text style={s.screenTitle}> {team.displayName} </Text>
                </View>
            </View>

            <View style={s.container} >

                <Picker
                    style={s.competitionPicker}
                    selectionColor="white"
                    placeholder='Seleccionar competición'
                    mode='dialog'
                    prompt={`Temporada ${selectedSeason}/${parseInt(selectedSeason) + 1}`}
                    dropdownIconColor={"white"}
                    selectedValue={selectedLeague}
                    onValueChange={(itemValue, itemIndex) => { setSelectedLeague(itemValue) }

                    }>
                       
                    {
                        leagues?.map((league, i) => (
                            <Picker.Item
                                key={i}
                                color='black'
                                label={`${league.name.replace("Argentine", "").replace("Amistoso","Amistosos")}`}
                                value={league.slug}

                            />
                        ))
                    }
                    <Picker.Item color='black' label="Todos los partidos" value={"all"} />
                </Picker>

                <Picker
                    style={s.seasonPicker}
                    selectedValue={parseInt(selectedSeason)}
                    mode='dialog'
                    selectionColor="white"
                    dropdownIconColor={"white"}
                    prompt={`Seleccionar Temporada`}
                    onValueChange={(itemValue, itemIndex) => { setSelectedSeason(itemValue) }}

                >
                    
                    {
                        Array.from({ length: (new Date().getFullYear()+1) - 2000 }, (_, index) => new Date().getFullYear() - index).map((a, i) => (
                            <Picker.Item key={i} color='black' label={`${a}/${String(a + 1).slice(2)}`} value={a} />
                            

                        ))
                    }

                </Picker>
            </View>
        </View>
    )
}

export default TeamHeader


const s = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        borderBottomWidth:1,
        borderBottomColor:Colors.background
    },
    backView: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVretical: 10,
        backgroundColor: Colors.card
    },
    screenTitle: {
        color: Colors.text,
        fontSize: 21,
        fontWeight: "500"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.card,

    },
    teamName: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    competitionPicker: {
        width: "62%",
        color: "white",

    },
    seasonPicker: {
        width: "38%",
        color: "white",

    },




})