import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import Shot from '../../../components/game/shootout/Shot'
import { getLogo } from '../../../utils/match';
import Colors from '../../../constants/Colors';

const interleaveShots = (penalties) => {
  if ("shots" in penalties[0]) {

    const maxShots = Math.max(penalties[0].shots.length, penalties[1].shots.length);
    let interleaved = [];
    for (let i = 0; i < maxShots; i++) {
      penalties.forEach(team => {
        if (team.shots[i]) {
          interleaved.push({ ...team.shots[i], team: team.team });
        }
      });
    }
    return interleaved;
  }
  return false
};

const Penalties = () => {

  const { game } = useStateContext()
  const shots = interleaveShots(game.shootout)



  const getTeamLogo = (teamName) => {

    const team = game.header.competitions[0].competitors.find(elem => elem.team.displayName === teamName)
    const logo = getLogo(team, 40)

    return logo

  }

  return (
    <ScrollView>
      <View style={s.container}>

        <View style={s.header}>
          {

            [0, 1].map(i => (
              <View key={i} style={s.team}>
                {getTeamLogo(shots[i].team)}
                {/* <Text style={s.teamName}>{shots[i].team}</Text> */}
              </View>

            ))

          }
        </View>

        <View style={s.shots}>

          {
            shots?.map((shot, i) => (
              <Shot key={i} i={i} shot={shot} />
            ))
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default Penalties

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 0
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    paddingTop: 10,
    paddingBottom: 6
  },
  shots: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    paddingHorizontal: 4,
    paddingBottom: 100
  },
  team: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 0
  },
  teamName: {
    color: Colors.text,
    fontSize: 13
  }
})