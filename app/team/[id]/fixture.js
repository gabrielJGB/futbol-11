import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import Colors from '../../../constants/Colors'
import FixtureGame from '../../../components/team/fixture/FixtureGame'
import { Button, SegmentedButtons } from 'react-native-paper'
import { useRouter } from 'expo-router'


const getStats = (events, team, showOnly) => {
  let won = 0, lost = 0, tied = 0
  let teamScore = 0
  let rivalScore = 0


  events.forEach(game => {
    const _team = game.competitions[0].competitors.find(comp => comp.id === team.id)
    const rival = game.competitions[0].competitors.find(comp => comp.id != team.id)
    const result = _team.winner ? "G" : (rival.winner ? "P" : "E")

    if ("score" in _team) {
      if (showOnly === "ALL") {

        teamScore = teamScore + parseInt(_team.score.value)
        rivalScore = rivalScore + parseInt(rival.score.value)

      } else if (showOnly === "L" && _team.homeAway === "home") {

        teamScore = teamScore + parseInt(_team.score.value)
        rivalScore = rivalScore + parseInt(rival.score.value)

      } else if (showOnly === "V"&& _team.homeAway === "away") {

        teamScore = teamScore + parseInt(_team.score.value)
        rivalScore = rivalScore + parseInt(rival.score.value)

      }
    }

    if (showOnly === "ALL" || _team.homeAway === "home" && showOnly === "L" || _team.homeAway === "away" && showOnly === "V") {
      if (game.played)
        if (result === "G")
          won++
        else if (result === "P")
          lost++
        else if (result === "E")
          tied++
    }
  })

  const score = [teamScore, rivalScore]


  let total = won + lost + tied

  let wonRate = parseInt((won * 100) / total)
  let tiedRate = parseInt((tied * 100) / total)
  let lostRate = parseInt((lost * 100) / total)


  return won === 0 && tied === 0 && lost === 0 ? { arr: [] } : {
    arr: [
      { value: won, percentage: wonRate, color: "#00A537", displayName: "Victorias" },
      { value: tied, percentage: tiedRate, color: "#F7FF32", displayName: "Empates" },
      { value: lost, percentage: lostRate, color: "#EB1E1C", displayName: "Derrotas" },
    ],
    score
  }


}



const Fixture = () => {
  const [selectedLeagueEvents, setSelectedLeagueEvents] = useState([])
  const [selectedLeagueName, setSelectedLeagueName] = useState('')
  const [error, setError] = useState(false)
  const [value, setValue] = useState("ALL");

  const { push } = useRouter()
  const {
    team,
    leagues,
    selectedLeague,
    selectedSeason,
  } = useStateContext()


  const summary = "standingSummary" in team && team.standingSummary
  const seasonText = `${selectedSeason}/${parseInt(selectedSeason) + 1}`

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

        <Text style={s.leagueName}>{selectedLeague != "all" ? selectedLeagueName : `Temporada ${seasonText}`}</Text>

        <SegmentedButtons
          theme={{ colors: { secondaryContainer: "white" } }}
          onValueChange={setValue}
          density='small'
          value={value}
          style={{ marginHorizontal: 40 }}
          buttons={[
            {

              value: 'L',
              label: 'Local',
              uncheckedColor: "grey",

            },
            {

              value: 'ALL',
              label: 'Todos',
              uncheckedColor: "grey",

            },

            {

              value: 'V',
              label: 'Visitante',
              uncheckedColor: "grey",

            },
          ]}
        />

        {
          selectedLeagueEvents &&
          <View style={s.statsContainer}>


            {
              getStats(selectedLeagueEvents, team, value).arr?.map((stat, i) => (
                <View key={i} style={{ backgroundColor: stat.color, width: `${stat.percentage}%`, minWidth: (stat.percentage != 0 ? "8%" : "0") }}>
                  <Text style={[s.stat, { color: `${i === 1 ? "black" : "white"}` }]}  >{stat.value}</Text>

                </View>
              ))

            }

          </View>
        }

        <View style={s.scoreContainer}>
          {
            selectedLeagueEvents &&
            getStats(selectedLeagueEvents, team, value).score?.map((score, j) => (
              <View key={j} style={s.score}>
                <Text style={{ color: "white", fontSize: 14, fontWeight: "500" }}>{score}</Text>
                <Text style={{ color: "white", fontSize: 12 }}>{j === 0 ? "Goles a favor" : "Goles en contra"}</Text>
              </View>
            ))
          }
        </View>

        <View style={s.gameContainer}>
          {
            selectedLeagueEvents.map((game, i) => (
              <FixtureGame key={i} team={team} game={game} n={i + 1} showOnly={value} />
            ))
          }
        </View>




        {
          selectedLeague != "all" &&
          <Button
            style={s.button}
            onPress={() => { push(`/league/${selectedLeague}`) }}
            mode='elevated'
            buttonColor='black'
            textColor='white'
            rippleColor='white'
          >Ir a la sección del torneo</Button>

        }


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

    color: Colors.text,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
    marginVertical: 12
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.card100,
    borderRadius: 7,
    marginHorizontal: 10,
    marginVertical: 16,
    width: "95%"
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
    marginTop: 18,
    marginBottom: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    

  },
  stat: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center"
  },
  summary: {
    textAlign: "center",
    color: Colors.text100,
    marginBottom: 12
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 8,
    marginBottom:5,
  },
  score: {
    justifyContent: "center",
    alignItems: "center"
  },
  scoreText: {
    color: "white",
    fontSize: 12
  }


})