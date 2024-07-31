import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import Table from '../../../components/Table'
import Colors from '../../../constants/Colors'

const Positions = () => {
  const { league } = useStateContext()



  return (
    <ScrollView >

      <View style={s.container}>

        {
          league.standings.map((standing, i) => (
            <View key={i} style={s.tableContainer}>
              <Text style={s.tableTitle}>{standing.name}</Text>
              <Table entries={standing.standings.entries} homeId={false} awayId={false} />

            </View>
          ))
        }
      </View>

    </ScrollView>
  )
}

export default Positions

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 16,
    paddingHorizontal: 4,
    marginBottom:100


  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 10
  },
  tableTitle: {
    color: Colors.text,
    textAlign: "center",
    fontSize: 18
  }
})