import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { getStatus } from '../../utils/match'

const GameHeaderScore = ({ homeWinner, awayWinner, score, shootout, status, date, headerFull }) => {


  const getStatusStyle = state => {


    switch (state) {
      case "pre":
        return s.statusPre

      case "in":
        return s.statusIn

      case "post":
        return s.statusPost
    }
  }


  return (
    <View style={s.container}>

      <View style={s.score}>

        <Text style={[headerFull ? s.scoreText : s.scoreTextMin, { color: (homeWinner ? "lime" : "white") }]}>
          {score.home}
        </Text>

        <Text style={headerFull ? s.scoreText : s.scoreTextMin}>-</Text>

        <Text style={[headerFull ? s.scoreText : s.scoreTextMin, { color: (awayWinner ? "lime" : "white") }]}>
          {score.away}
        </Text>

      </View>

      {
        shootout && headerFull &&
        <Text style={s.shootout}>({shootout.home} - {shootout.away})</Text>
      }

      {

        <Text style={[s.status, getStatusStyle(status.state), headerFull ? s.statusFull : s.statusMin]} >
          {getStatus(status, date)}
        </Text>

      }

    </View>
  )
}

export default GameHeaderScore

const s = StyleSheet.create({
  container: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 2
  },
  score: {
    display: "flex",
    flexDirection: "row",
    gap: 3
  },
  scoreText: {
    color: Colors.text,
    fontSize: 35
  },
  scoreTextMin: {
    color: Colors.text,
    fontSize: 20
  },
  shootout: {
    color: Colors.text,
    fontSize: 14,
    marginBottom:3
  },
  statusMin: {
    fontSize: 11
  },
  statusFull: {
    fontSize: 14
  },
  status: {
    color: Colors.text,
    marginTop: 0,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1,
    fontWeight: "500",
    textAlign: "center"
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