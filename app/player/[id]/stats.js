import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import { Picker } from '@react-native-picker/picker'
import Colors from '../../../constants/Colors'

const PlayerStats = () => {
  const { player } = useStateContext()
  const [selectedLeague, setSelectedLeague] = useState(player.statistics.splits[0])


  return (
    <ScrollView>
      <View style={s.container}>
        <Picker
          style={s.picker}
          selectedValue={selectedLeague}
          selectionColor="white"
          dropdownIconColor="white"
          prompt="Seleccionar Competición"
          onValueChange={(itemValue, itemIndex) => { setSelectedLeague(itemValue) }}

        >
          {

            player.statistics.splits.map((league, i) => (
              <Picker.Item key={i} color='black' label={league.displayName.replace("Argentine", "")} value={league} />
            ))
          }



        </Picker>

        <View style={s.statsContainer}>
          {
            selectedLeague.stats.map((stat, i) => (
              <View key={i} style={s.stat}>
                <Text style={s.statName}>
                  {
                    player.statistics.displayNames[i]
                      .replace("Aperturas", "Partidos como titular")
                      .replace("Total de goles", "Goles")
                      .replace("Tarjetas", "")
                      .replace("amarillas", "Amarillas")
                      .replace("Tiros", "Remates")
                      .replace("a meta", "al arco")
                      .trim()
                  }
                </Text>
                <Text style={s.statValue}>{stat}</Text>

              </View>
            ))
          }

        </View>

      </View>
    </ScrollView>
  )
}

export default PlayerStats

const s = StyleSheet.create({
  container: {
    marginTop: 6,
    marginHorizontal: 6
  },
  picker: {
    color: Colors.text,
    backgroundColor: Colors.card,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    marginTop: 20,
    backgroundColor:Colors.highlight
  },
  stat: {
    display: "flex",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal:6,
    backgroundColor: Colors.card

  },
  statName: {
    color: Colors.text,

  },
  statValue: {
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 4,
    color: Colors.text,

  }
})