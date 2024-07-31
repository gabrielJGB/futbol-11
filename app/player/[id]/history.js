import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import Colors from '../../../constants/Colors'
import HistoryTeam from '../../../components/player/history/HistoryTeam'

const PlayerHistory = () => {
  const { player } = useStateContext()



  return (
    <ScrollView>
      <View style={s.container}>

        {
          player.teamHistory.map((section, i) => {

            return section.teams.length > 0 === true && (

              <View key={i} style={s.section}>
                <Text style={s.sectionName}>{section.displayName.toUpperCase()}</Text>
                <View style={s.teams}>
                  {
                    section.teams.map((team, k) => (
                      <HistoryTeam key={k} team={team} section={section} />
                    ))
                  }
                </View>
              </View>
            )
          })
        }

      </View>
    </ScrollView>
  )
}

export default PlayerHistory

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginTop: 10,
    marginHorizontal: 6,
    marginBottom: 300
  },
  section: {
    backgroundColor: Colors.card,
    display: "flex",
    flexDirection: "column",
    gap: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.card100
  },
  sectionName: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 5
  },
  teams:{
    display: "flex",
    flexDirection: "column-reverse",
  }
})