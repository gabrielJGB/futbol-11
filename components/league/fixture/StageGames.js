import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GameCard from './GameCard'
import Colors from '../../../constants/Colors'
import { convertTimestamp } from '../../../utils/time'


const StageGames = ({ selectedStage, selectedWeek }) => {

  const getGamesArray = () => {


    if (selectedStage.stageEvents.length != 0) {
      if (selectedStage.hasStandings && selectedStage.stageEvents.length > 0) {
        return selectedStage.stageEvents[selectedWeek]
      }
      else if (!selectedStage.hasStandings && selectedStage.stageEvents.length > 0) {
        return selectedStage.stageEvents
      }
    }
    
    return []
  }

  const getNextDates = (date) => {

    const y = new Date(convertTimestamp(date).dateNext)
    const x = convertTimestamp(y)

    return `${x.month} ${x.year}`

  }

  return (
    <ScrollView>

      <View style={s.container}>
        {
          selectedStage.stageEvents.length > 0 ?
            getGamesArray().map((game, i) => (
              <GameCard key={i} game={game} />
            ))

            :
            <View style={s.box}>
              <Text style={s.noGames}>Todavía no se han definido los partidos de esta fase</Text>
              <Text style={s.dates}>{ getNextDates(selectedStage.startDate) }</Text>
            </View>
        }
      </View>





    </ScrollView>
  )
}

export default StageGames

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginHorizontal: 3,
    marginBottom: 200
  },
  noGames:{
    textAlign:"center",
    color:Colors.text
  },
  dates:{
    marginTop:10,
    fontSize:12,
    textAlign:"center",
    color:Colors.text100
  },
  box:{
    marginTop:50
  }
})