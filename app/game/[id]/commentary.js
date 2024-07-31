import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import Selector from '../../../components/game/commentary/Selector'
import EventCard from '../../../components/game/commentary/EventCard'

const Commentary = () => {

  const { game } = useStateContext()
  const events = "commentary" in game ? game.commentary : false
  const keyEvents = "keyEvents" in game ? game.keyEvents : false
  const [showKeyEvents, setShowKeyEvents] = useState(!events)


  const getTeam = (displayName) => {

    return game.boxscore.teams.find(team => team.team.displayName === displayName)?.team
  }



  return (
    <ScrollView>
      <View style={s.container}>

        {
          events && keyEvents &&
          <Selector showKeyEvents={showKeyEvents} setShowKeyEvents={setShowKeyEvents} />
        }


        {
          events &&
          <View style={[s.eventsContainer, { display: !showKeyEvents ? "flex" : "none" }]}>
      
            {
              events.map((event, i) => {
                const isFoul = event.play && "type" in event.play && "id" in event.play.type && event.play.type.id === '66' || event.play && "type" in event.play && "id" in event.play.type && event.play.type.id === '36'

                return !isFoul && <EventCard
                  key={i}
                  text={event.text}
                  clock={event.time.displayValue}
                  participants={event.play && "participants" in event.play && event.play.participants}
                  typeId={event.play && "type" in event.play && "id" in event.play.type && event.play.type.id}
                  typeText={event.play && "type" in event.play && "text" in event.play.type && event.play.type.text}
                  team={event.play && "team" in event.play && getTeam(event.play.team.displayName)}

                />
              })
            }
          </View>
        }


        {
          keyEvents &&
          <View style={[s.eventsContainer, { display: showKeyEvents ? "flex" : "none" }]}>
            {
              keyEvents.map((event, i) => (
                <EventCard
                  key={i}
                  text={event.text}
                  clock={event.clock.displayValue}
                  participants={"participants" in event && event.participants}
                  typeId={"type" in event && "id" in event.type && event.type.id}
                  typeText={"type" in event && "text" in event.type && event.type.text}
                  team={"team" in event && getTeam(event.team.displayName)}

                />
              ))
            }
          </View>
        }


      </View>
    </ScrollView>
  )
}

export default Commentary

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 16,
    paddingHorizontal: 4,
    paddingBottom: 100
  },
  eventsContainer: {
    flexDirection: "column-reverse",
    gap: 15
  }
})