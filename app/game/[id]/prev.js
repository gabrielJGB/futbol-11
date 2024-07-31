import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Leaders from '../../../components/game/prev/Leaders'
import HeadToHead from '../../../components/game/prev/HeadToHead'
import PreviousGames from '../../../components/game/prev/PreviousGames'
import { useStateContext } from '../../../context/StateContext'





const Prev = () => {

  const { game } = useStateContext()



  return (
    <ScrollView>
      <View style={s.container}>
    
        {
          
           ("leaders" in game && game.leaders[0].leaders.length > 0) || 
           ("leaders" in game && game.leaders[1].leaders.length > 0) &&
          <Leaders leaders={game.leaders} />
        }

        <HeadToHead
          headToHeadGames={game.headToHeadGames[0].events}
          team={game.headToHeadGames[0].team}
        />

        <PreviousGames
          homeHistory={game.boxscore.form[0]}
          awayHistory={game.boxscore.form[1]}
          
        />




      </View>
    </ScrollView>
  )
}

export default Prev

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 16,
    paddingHorizontal: 4,
    paddingBottom: 100

  }
})