import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import { getLogo } from '../../../utils/match'
import Stat from '../../../components/game/stats/Stat'
import Colors from '../../../constants/Colors'

const Stats = () => {

  const { game } = useStateContext()
  const home = game.boxscore.teams[0]
  const away = game.boxscore.teams[1]
  const statsLength = game.boxscore.teams[0].statistics.length



  return (
    <ScrollView>
      <View style={s.container}>


        <View style={s.header}>
          {getLogo(home.team, 20)}
          <Text style={s.title}>ESTADÍSTICAS</Text>
          {getLogo(away.team, 20)}
        </View>

        <View style={s.stats}>
          {
            new Array(statsLength).fill(0).map((e, i) => (
              <Stat
                key={i}
                homeStat={home.statistics[i]}
                awayStat={away.statistics[i]} />
            ))
          }
        </View>

      </View>
    </ScrollView>
  )
}

export default Stats

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 16,
    paddingHorizontal: 4,
    paddingBottom: 100
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between"
  },
  title:{
    color:Colors.text,
    fontWeight:"500",
    fontSize:18
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }


})