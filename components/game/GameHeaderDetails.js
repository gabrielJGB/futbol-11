import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import { getDetailIcon } from '../../utils/match'
import { Button, Icon } from 'react-native-paper'

const GameHeaderDetails = ({ details, homeId, awayId }) => {

  


  return (
    <View style={s.container}>
      <View style={[s.detailsContainer]}>
        {
          details.map((detail, i) => (
            <View key={i} style={[s.detailContainer, { flexDirection: (detail.team.id === homeId ? "row" : "row-reverse") }]}>

              <View style={s.detail}>

                {getDetailIcon(detail)}

                <Text style={s.participant}>
                  {"participants" in detail ?
                    detail.participants[0].athlete.displayName :
                    "Expulsión (banco)"} {detail.ownGoal && " (EC)"}
                </Text>

              </View>

              <Text style={s.clock}>
                {detail.clock.displayValue}
              </Text>


            </View>
          ))
        }
      </View>

{/* 
      {
        details.length > 0 &&

        
      } */}
    


    </View >
  )
}

export default GameHeaderDetails

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop:4

  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  detailContainer: {
    display: "flex",
    
  },
  detail: {
    width: "42%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    backgroundColor: Colors.card200,
    color: Colors.text,
    

  },
  clock: {
    width: "16%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    backgroundColor: Colors.card200,
    color: Colors.text
  },
  participant: {
    color: Colors.text,
    fontSize: 12,
    textAlign: "center"
  },
  button: {
    
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:5,
    marginTop:5
    
  }


})