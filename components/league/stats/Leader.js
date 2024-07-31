import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { getLogo } from '../../../utils/match'
import Colors from '../../../constants/Colors'
import { useRouter } from 'expo-router'

const Leader = ({ leader, num }) => {

  const { push } = useRouter()

  return (
    <TouchableNativeFeedback onPress={() => push(`player/${leader.athlete.id}`)}>
      <View style={s.container}>
        <View style={s.box}>

          <Text style={s.num}>{num}</Text>
          {getLogo(leader.athlete.team, 18)}
          <Text style={s.jersey}>{leader.athlete.jersey}</Text>
          <Text style={s.name}>{leader.athlete.displayName}</Text>

        </View>

        <View style={s.box}>
          <Text style={s.value}>{leader.value}</Text>
          <Text style={s.games}>({leader.athlete.statistics[0].value})</Text>
        </View>

      </View>
    </TouchableNativeFeedback>
  )
}

export default Leader

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: Colors.card,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.card100,
    marginHorizontal: 3
  },
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7
  },
  num: {
    textAlign: "center",
    minWidth: 17,
    fontSize: 14,
    // fontWeight: "500",
    color: Colors.text100,
  },
  name: {
    color: Colors.text
  },
  value: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.text
  },
  games: {
    color: Colors.text100
  },
  jersey: {
    backgroundColor: Colors.background,
    color: Colors.text,
    borderRadius: 5,
    paddingVertical: 1,
    fontWeight: "500",
    width: 22,
    textAlign: "center",
    fontSize: 13
},
})