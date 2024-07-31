import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import SofaLineups from '../../../components/game/lineups/SofaLineups'
import TeamSelector from '../../../components/game/lineups/TeamSelector'
import Roster from '../../../components/game/lineups/Roster'
import { getLogo, sortRoster } from '../../../utils/match'
import Field from '../../../components/game/lineups/Field'








const Lineups = () => {

  const { game, sofaId } = useStateContext()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const homeLogo = getLogo(game.boxscore.teams[0], 20)
  const awayLogo = getLogo(game.boxscore.teams[1], 20)
  const roster = "roster" in game.rosters[0]
  const formation = "formation" in game.rosters[0] ? game.rosters[0].formation : false

  useEffect(() => {
    
    if(roster && !formation){
      game.rosters[0].roster = sortRoster(game.rosters[0].roster)
      game.rosters[1].roster = sortRoster(game.rosters[1].roster)
    }

  }, [])
  

  return (
    <ScrollView>
      <View style={s.container}>

        {
          roster && !formation &&
          <TeamSelector game={game} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
        }

        <ScrollView horizontal >
          <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


            {
              roster && formation &&
              <Field />
            }

            <View style={{ display: "flex", flexDirection: roster && formation ? "row" : "column" }}>
              <Roster roster={sortRoster(game.rosters[0].roster)} logo={homeLogo} show={roster && formation ? true : selectedIndex === 0} />
              <Roster roster={sortRoster(game.rosters[1].roster)} logo={awayLogo} show={roster && formation ? true : selectedIndex === 1} />
            </View>

          </View>
        </ScrollView>


        {/* {
          sofaId &&
          <SofaLineups sofaId={sofaId} />
        } */}

      </View>
    </ScrollView>
  )
}

export default Lineups

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 16,
    paddingHorizontal: 0,
    paddingBottom: 300

  }
})