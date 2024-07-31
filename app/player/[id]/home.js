import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import Information from '../../../components/player/home/Information'
import LastGames from '../../../components/player/home/LastGames'
import NextGame from '../../../components/player/home/NextGame'


const PlayerHome = () => {
  const { player } = useStateContext()




  return (
    <ScrollView>
      <View style={s.container}>

        <Information player={player} />

        {
          "nextGame" in player && "league" in player.nextGame &&
          <NextGame
            game={player.nextGame.league.events}
            leagueName={player.nextGame?.league.name}
          />
        }

        {

          "events" in player && player.events.length > 0 &&
          <LastGames player={player} />

        }
      </View>
    </ScrollView>
  )
}

export default PlayerHome


const s = StyleSheet.create({
  container: {
    marginHorizontal: 7,
    marginTop:7,
    marginBottom:360
  }
})
