import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { getStatus } from '../../../utils/match'
import Colors from '../../../constants/Colors'
import TeamCard from '../../home/TeamCard'
import { convertTimestamp, formatDateObject } from '../../../utils/time'
import { useRouter } from 'expo-router'


const getStatusStyle = (status) => {

  switch (status) {
    case "pre":
      return s.statusPre

    case "in":
      return s.statusIn

    case "post":
      return s.statusPost
  }
}

const GameCard = ({ game }) => {

  const { push } = useRouter()
  const home = game.competitions[0].competitors.find(competitor => competitor.homeAway === "home")
  const away = game.competitions[0].competitors.find(competitor => competitor.homeAway === "away")
  const isFinished = game.status.type.state === "post"
  const isPre = game.status.type.state === "pre"

  return (
    <TouchableNativeFeedback
      onPress={() => push(`/game/${game.id}`)}
    >

      <View style={s.game}>
        <Text style={s.gameTitle}>
          {formatDateObject(convertTimestamp(game.date).dateObject).toUpperCase()}
        </Text>


        <View style={s.mainContainer}>
          <View style={s.teamsContainer}>
            <TeamCard team={home} isWinner={isFinished && home.winner} isPre={isPre}/>
            <TeamCard team={away} isWinner={isFinished && away.winner} isPre={isPre}/>
          </View>
          <View style={s.gameStatus}>
            <Text style={[s.gameStatusText, getStatusStyle(game.status.type.state)]}>
              {getStatus(game.status.type, game.date)}
            </Text>


          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

export default GameCard

const s = StyleSheet.create({
  game: {
    backgroundColor: Colors.card,
    paddingHorizontal: 9,
    paddingVertical:8,
    borderRadius: 5,
    borderWidth:1,
    borderColor:Colors.card100
  },
  gameTitle: {
    color: Colors.text100,
    fontSize: 11
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // paddingVertical: 10
  },
  teamsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    width: "70%",


  },
  gameStatus: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33%"


  },
  gameStatusText: {

    color: "white",
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 13,
    borderWidth: 1,
  },
  statusPre: {
    backgroundColor: "transparent",
    borderWidth: 0
  },
  statusIn: {
    backgroundColor: "#a30000",
    borderColor: "#c52020"
  },
  statusPost: {
    backgroundColor: "black",
    borderColor: "#383838"
  }


})