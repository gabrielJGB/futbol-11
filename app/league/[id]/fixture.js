import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import LeagueSelector from '../../../components/league/fixture/LeagueSelector'
import StageGames from '../../../components/league/fixture/StageGames'



const Fixture = () => {

  const { league } = useStateContext()
  const [selectedStage, setSelectedStage] = useState(league.stages.find(stage => stage.slug === league.currentStage.slug))
  const [selectedWeek, setSelectedWeek] = useState(0)

  useEffect(() => getCurrentWeek(), [selectedStage])

  const getCurrentWeek = () => {
    if (selectedStage.hasStandings && selectedStage.stageEvents.length > 0) {

      for (let i = 0; i < selectedStage.stageEvents.length; i++) {

        let x = selectedStage.stageEvents[i].find(elem => elem.status.type.state === "pre")

        if (x != undefined || i == selectedStage.stageEvents.length - 1) {
          setSelectedWeek(i)
          break;
        }
      }
    }
  }

  return (
    <ScrollView>
      <View style={s.container}>
        <LeagueSelector
          isOneStage={league.oneStage}
          stages={league.stages}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />

        <StageGames
          selectedStage={selectedStage}
          selectedWeek={selectedWeek}
        />

      </View>
    </ScrollView>
  )
}

export default Fixture

const s = StyleSheet.create({
  
  container:{
    marginHorizontal:4,
    marginBottom:400
  }
})