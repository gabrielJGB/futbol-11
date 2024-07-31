import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import Player from '../../../components/team/roster/Player'
import Colors from '../../../constants/Colors'
import { ActivityIndicator } from 'react-native-paper'
import { fetchTeamRoster } from '../../../utils/fetch'

const getPosHeader = (pos) => {
  switch (pos) {
    case "G":
      return "ARQUEROS"
    case "D":
      return "DEFENSORES"
    case "M":
      return "MEDIOCAMPISTAS"
    case "A":
      return "DELANTEROS"
  }
}
const Roster = () => {

  const { team, selectedLeague, selectedSeason, leagues } = useStateContext()
  const [roster, setRoster] = useState(false)
  const [loading, setLoading] = useState(true)


  const _fetchRoster = () => {


    setLoading(true)
    fetchTeamRoster(team.id, selectedSeason, selectedLeague?selectedLeague:leagues[0].slug)
      .then(roster => {setRoster(roster)})
      .finally(() => setLoading(false))
      .catch(error => setRoster(error.message))
  }

  useEffect(() => {
    _fetchRoster()
  }, [selectedLeague])



  if (loading)
    return (
      <View style={s.spinner}>
        <ActivityIndicator color='white' size={22} />
      </View>
    )

  if (!roster || typeof (roster) === "string")
    return <Text style={s.error}>Sin datos</Text>



  return (
    <ScrollView>
      <View style={s.container}>
        {
          ["G", "D", "M", "A"].map(position => {
            return (
              <View style={s.playersContainer} key={position}>
                <Text style={s.posHeader}>{getPosHeader(position)}</Text>

                <View style={s.playersContainer}>
                  {
                    roster.filter(p => p.position.abbreviation === position).map(player => (
                      <Player key={player.id} player={player} />
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

export default Roster

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    marginTop: 6,
    marginHorizontal: 3,
    marginBottom: 100
  },
  playersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1
  },
  posHeader: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 6,
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    padding: 7,
    color: Colors.text,
    backgroundColor: Colors.card,
  },
  error: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    color: Colors.text,
  },
  spinner: {
    marginTop: 40
  }
})
