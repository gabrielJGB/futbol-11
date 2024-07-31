import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import Colors from '../../../constants/Colors'
import Table from '../../../components/Table'

const Positions = () => {
  const { game } = useStateContext()
  const groups = game.standings.groups
  const homeId = game.boxscore?.teams[0].team.id
  const awayId = game.boxscore?.teams[1].team.id



  return (
    <ScrollView>
      <View style={s.container}>

        {
          groups.map((group, i) => (
            <View key={i} style={s.tableContainer}>
              <Text style={s.tableTitle}>{group.header}</Text>
              <Table entries={group.standings.entries} homeId={homeId} awayId={awayId} />

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
    paddingBottom: 100

  },
  tableContainer:{
    display:"flex",
    flexDirection:"column",
    width:"100%",
    gap:10
  },
  tableTitle:{
    color:Colors.text,
    textAlign:"center",
    fontSize:18
  }
})