import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Stages from './Stages'
import Buttons from './Buttons'
import { translateTitle } from '../../../utils/match'
import Colors from '../../../constants/Colors'

const LeagueSelector = ({ isOneStage, selectedStage, setSelectedStage, stages, selectedWeek,setSelectedWeek }) => {



    return (
        <View style={s.container}>
            {
                !isOneStage &&
                <Stages stages={stages} setSelectedStage={setSelectedStage} selectedStage={selectedStage} />
            }

            {
                !isOneStage &&
                <Text style={s.stageName}>{translateTitle(selectedStage.name).replace("-","\n")}</Text>
            }

            {
                selectedStage.hasStandings && selectedStage.stageEvents.length > 0 &&
                <Buttons
                    selectedWeek={selectedWeek}
                    setSelectedWeek={setSelectedWeek}
                    array={new Array(selectedStage.stageEvents.length).fill(0)}
                />
            }


        </View>
    )
}

export default LeagueSelector

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginVertical: 7,
        
    },
    stageName: {
        textAlign: "center",
        color: Colors.text,
        fontSize: 25,
        fontWeight: "500"
    }
})