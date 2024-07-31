import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import Colors from '../../../constants/Colors'
import FixtureGame from '../../../components/team/fixture/FixtureGame'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'


const getStats = (events, team) => {
  let won = 0, lost = 0, tied = 0



  events.forEach(game => {
    const _team = game.competitions[0].competitors.find(comp => comp.id === team.id)
    const rival = game.competitions[0].competitors.find(comp => comp.id != team.id)
    const result = _team.winner ? "G" : (rival.winner ? "P" : "E")

    if (game.played)
      if (result === "G")
        won++
      else if (result === "P")
        lost++
      else if (result === "E")
        tied++
  })


  let total = won + lost + tied

  let wonRate = parseInt((won * 100) / total)
  let tiedRate = parseInt((tied * 100) / total)
  let lostRate = parseInt((lost * 100) / total)


  return won === 0 && tied === 0 && lost === 0 ? false : [
    { value: won, percentage: wonRate, color: "#00A537", displayName: "Victorias" },
    { value: tied, percentage: tiedRate, color: "#F7FF32", displayName: "Empates" },
    { value: lost, percentage: lostRate, color: "#EB1E1C", displayName: "Derrotas" },
  ]


}



const Fixture = () => {
  const [selectedLeagueEvents, setSelectedLeagueEvents] = useState([])
  const [selectedLeagueName, setSelectedLeagueName] = useState('')
  const [error, setError] = useState(false)
  const { push } = useRouter()
  const {
    team,
    leagues,
    selectedLeague,
    selectedSeason,
  } = useStateContext()


  const summary = "standingSummary" in team && team.standingSummary

  useEffect(() => {

    if (leagues) {


      if (selectedLeague === "all") {

        let allEvents = []
        leagues.forEach(league => league.events.forEach(event => allEvents.push(event)))
        setSelectedLeagueName(`Temporada ${selectedSeason}/${(parseInt(selectedSeason) + 1) - 2000}`)

        allEvents.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        setSelectedLeagueEvents(allEvents)

      } else {

        const league = leagues?.find(league => league.slug === selectedLeague)
        const events = league != undefined ? league.events : leagues[0].events



        setError(!league && !leagues)
        setSelectedLeagueName(league?.events[0].season.displayName.replace("Argentine", "") || "")
        setSelectedLeagueEvents(events)
      }
    }
  }, [leagues, selectedLeague])


  if (error)
    return <Text style={s.error}>Sin datos</Text>

  return (
    <ScrollView>

      <View style={s.container}>


        {
          selectedLeague != "all" ?
            <Button
              style={s.button}
              onPress={() => { push(`/league/${selectedLeague}`) }}
              mode='elevated'
              buttonColor='black'
              textColor='white'
              rippleColor='white'
            > {selectedLeagueName}</Button>
            :
            <Text style={s.leagueName}>Temporada {`${selectedSeason}/${parseInt(selectedSeason)+1}`}</Text>

        }



        {
          summary && false &&
          <Text style={s.summary}>{summary}</Text>
        }

        {
          selectedLeagueEvents &&
          <View style={s.statsContainer}>

            {
              getStats(selectedLeagueEvents, team) &&
              getStats(selectedLeagueEvents, team)?.map((stat, i) => (
                <View key={i} style={{ backgroundColor: stat.color, width: `${stat.percentage}%`, minWidth: (stat.percentage != 0 ? "8%" : "0") }}>
                  <Text style={[s.stat, { color: `${i === 1 ? "black" : "white"}` }]}  >{stat.value}</Text>

                </View>
              ))

            }
          </View>
        }


        <View style={s.gameContainer}>
          {
            selectedLeagueEvents.map((game, i) => (
              <FixtureGame key={i} team={team} game={game} n={i + 1} />
            ))
          }
        </View>





      </View>

    </ScrollView>
  )
}

export default Fixture

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100
  },
  leagueName: {
    paddingVertical:9,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 9
  },
  button: {
    borderWidth:1,
    borderColor:Colors.card100,
    borderRadius: 7,
    marginHorizontal: 10,
    marginVertical:16,
    width:"95%"
  },
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginHorizontal: 3,

  },
  error: {
    color: Colors.text,
    textAlign: "center",
    marginTop: 20
  },
  statsContainer: {
    marginTop: 5,
    marginBottom: 17,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "97%",

  },
  stat: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center"
  },
  summary: {
    textAlign: "center",
    color: Colors.text100,
    marginBottom: 8
  }

})