import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Colors from '../../../constants/Colors'
import { getLogo, translateTitle } from '../../../utils/match'
import { convertTimestamp } from '../../../utils/time'
import { useStateContext } from '../../../context/StateContext'
import { Icon } from 'react-native-paper'

const FixtureGame = ({ game, team, n, showOnly }) => {

  const { push } = useRouter()
  const { selectedLeague } = useStateContext()

  const rival = game.competitions[0].competitors.find(comp => comp.id != team.id)
  const _team = game.competitions[0].competitors.find(comp => comp.id === team.id)
  const homeAway = _team.homeAway === "home" ? "L" : "V"
  const result = _team.winner ? "G" : (rival.winner ? "P" : "E")
  const score = "score" in _team ? `${_team.score.displayValue}-${rival.score.displayValue}` : false
  const leagueName = game.league.name.replace("Argentine", "")
  const gameStage = translateTitle(game.seasonType.name).trim()
  const gameTime = convertTimestamp(game.date).DDMMYYYY
  const opponent = rival.team.shortDisplayName.replace("ROS", "R. Central")
  const isTournament = game.league.isTournament

  const getScoreColor = (result) => {

    switch (result) {
      case "P":
        return "#EB1E1C"
      case "G":
        return "#00A537"
      case "E":
        return "#F7FF32"
      default:
        return ""
    }
  }



  return (
    <TouchableNativeFeedback
      onPress={() => push(`game/${game.id}`)}
    >
      <View style={[s.container, { display: showOnly==="ALL" || showOnly === "L" && homeAway === "L" ||showOnly === "V" && homeAway === "V"? "flex" : "none" }]}>
        <View style={[s.left]}>

          <View style={s.header}>


            {/* <Text style={s.gameNum}>{n}</Text> */}

            <View style={s.headerRight}>
              {/* <Text style={s.gameDate}>{gameTime}</Text> */}
              {
                isTournament && leagueName.trim() != "Copa de la Liga Profesional" &&
                <Icon source="trophy" size={11} color='white' />
              }
              <Text style={s.gameStage}>
                {selectedLeague === "all" ? `${leagueName} ${isTournament ? `| ${gameStage}` : ""}` : gameStage}
                {/* {selectedLeague === "all" ? `${leagueName} ${isTournament?(" | "+gameStage):""}`: isTournament?gameStage:""} */}

              </Text>

            </View>


            <View style={s.headerComponent}>
              <Text style={s.gameStage}>
                {gameTime}
              </Text>

            </View>

          </View>

          <View style={s.game} >
            <View style={s.gameInfo}>
              <Text style={s.gameNum}>{n}</Text>
              <Text style={s.homeAway}>{`${homeAway}`}</Text>
              {getLogo(rival.team, 23)}
              <Text numberOfLines={1} style={s.opponent}>{opponent}</Text>
            </View>

            {
              game.played && score ?
                <Text style={[s.scoreText, { color: result === "E" ? "black" : "white", backgroundColor: getScoreColor(result) }]}>
                  {score}
                </Text> : <Text></Text>
            }
          </View>

        </View>


      </View>
    </TouchableNativeFeedback>
  )
}

export default FixtureGame

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.card100,


  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.card,
    paddingVertical: 3,
    paddingHorizontal: 2
  },

  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    gap: 3,
    paddingLeft: 3,

  },
  headerComponent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  left: {
    display: "flex",
    flexDirection: "column",
    width: "100%"

  },
  gameNum: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderColor: Colors.border,
    fontWeight: "500",
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: Colors.background,
    borderRadius: 20,
    fontSize: 10,
    color: Colors.text,

  },

  gameNum2: {
    color: Colors.text100,
    fontWeight: "500",
    fontSize: 11,
  },
  gameStage: {
    // maxWidth:"85%",
    fontWeight: "500",
    fontSize: 11,
    color: Colors.text100,
  },
  gameDate: {
    alignSelf: "flex-end",
    fontSize: 11,
    fontWeight: "500",
    color: Colors.text100,
  },



  game: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  gameInfo: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 5,
    paddingLeft: 2,
    gap: 5,
    alignItems: "center",
  },
  opponent: {
    fontSize: 14,
    color: Colors.text
  },
  scoreText: {
    // width: "12%",
    height: "100%",
    fontWeight: "500",
    fontSize: 17,
    color: Colors.text,
    width: 40,
    textAlignVertical: "center",
    textAlign: "center",
  },
  homeAway: {
    color: Colors.text100,
    fontSize: 12,
    fontWeight: "500"
  }


})