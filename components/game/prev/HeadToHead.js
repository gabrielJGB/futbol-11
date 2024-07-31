import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Divider, Icon } from 'react-native-paper'
import Colors from '../../../constants/Colors'
import GameCard from './GameCard'
import { useRouter } from 'expo-router'

const HeadToHead = ({ headToHeadGames, team }) => {



  return (
    <View style={s.container}>
      <Text style={s.title}>ENFRENTAMIENTOS PREVIOS</Text>
      {
        headToHeadGames.length > 0 ?

          headToHeadGames.map((game, i) => (
            <View key={i}>
              <Divider style={s.divider} />

              <GameCard
                home={game.atVs === "vs" ? team : game.opponent}
                away={game.atVs === "vs" ? game.opponent : team}
                game={game}
                teamHistory={false}
                
                
              />

              
            </View>
          ))
          :
          <View style={s.noData}>
            <Icon source="information-outline" color='white' size={24} />
            <Text style={s.noDataText}>Sin datos</Text>
          </View>
      }
    </View>
  )
}

export default HeadToHead

const s = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 7
  },
  divider: {
    backgroundColor: Colors.highlight
  },
  title: {
    paddingVertical: 7,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: Colors.text
  },
  noData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingBottom: 10,
    paddingHorizontal: 5
  },
  noDataText: {
    color: Colors.text,
    fontSize: 15
  }

})
