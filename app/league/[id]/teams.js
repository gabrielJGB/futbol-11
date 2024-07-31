import { ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import { getLogo } from '../../../utils/match'
import Colors from '../../../constants/Colors'
import { useRouter } from 'expo-router'


const Team = ({ team }) => {

  const { push } = useRouter()
  const { league } = useStateContext()


  return (

    <TouchableNativeFeedback onPress={() => push(`team/${team.team.id}?season=${league.year}&league=${league.slug}`)}>
      <View style={s.team}>
        {getLogo(team, 22)}
        <Text style={s.teamName}>{team.team.name}</Text>
      </View>
    </TouchableNativeFeedback>

  )
}

const Teams = () => {
  const { league } = useStateContext()




  return (
    <ScrollView>

      <View style={s.container}>
        {
          league.teams.map((team, i) => (
            <Team key={i} team={team} />
          ))
        }
      </View>

    </ScrollView>
  )
}

export default Teams

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginHorizontal: 3,
    marginTop: 10,
    marginBottom: 200
  },
  team: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.card,
    paddingHorizontal: 6,
    paddingVertical:10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.card100,
  },
  teamName: {
    color: Colors.text

  }
})