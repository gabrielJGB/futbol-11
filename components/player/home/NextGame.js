import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { getLogo } from '../../../utils/match'
import { convertTimestamp } from '../../../utils/time'
import { useRouter } from 'expo-router'

const Team = ({ team, score, resultColor }) => {


  return (
    <View style={[s.team, { borderColor: resultColor }]}>
      <View style={s.teamLeft}>
        {getLogo(team, 18)}
        <Text numberOfLines={1} style={s.teamName}>{"displayName" in team ? team.displayName : team.abbreviation}</Text>
      </View>
      <Text style={s.score}>{score}</Text>

    </View>
  )
}

const NextGame = ({ game, leagueName }) => {


  const home = game[0].competitors[0]
  const away = game[0].competitors[1]
  const date = convertTimestamp(game[0].date)
  const { push } = useRouter()


  return (
    <View style={s.container}>
      <Text style={s.title}>PRÓXIMO PARTIDO</Text>
      <TouchableNativeFeedback onPress={() => push(`game/${game[0].id}`)}>
        <View style={s.gameContainer}>
          <Text style={s.league}>{leagueName.replace("Argentine", "").toUpperCase()}</Text>
          <View style={s.gameBody}>
            <View style={s.teams}>
              <Team team={home} score={""} resultColor={"grey"} />
              <Team team={away} score={""} resultColor={"grey"} />
            </View>

            <Text style={s.date}>{`${date.dayOfWeek.slice(0,3)} ${date.day} ${date.month.slice(0,3)}`}</Text>

          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default NextGame

const s = StyleSheet.create({
  container:{
    

    marginBottom:25
    
    
  },
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.card,
    paddingBottom:4,
    borderWidth: 1,
    borderColor: Colors.card100,
    borderRadius: 6,
  },
  title: {
    color:Colors.text,
    fontSize:20,
    fontWeight:"500",
    textAlign:"center",
    paddingVertical:4
  },
  league: {
    alignSelf: "flex-start",
    fontSize: 11,
    color: Colors.text100,
    marginTop: 5,
    marginHorizontal: 7,
    marginBottom: 5
  },
  gameBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 6

  },
  teams: {

    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  team: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderRightWidth: 2,
    borderColor: "white"

  },
  teamLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  teamName: {
    maxWidth:"90%",
    fontSize: 13,
    color: Colors.text,
  },
  score: {
    paddingRight: 7,
    color: Colors.text,
  },
  date: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    width: "30%",
  },
})