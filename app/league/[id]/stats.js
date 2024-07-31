import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import { ActivityIndicator } from 'react-native-paper'
import Leader from '../../../components/league/stats/Leader'
import Colors from '../../../constants/Colors'
import { fetchLeagueStats } from '../../../utils/fetch'

const Stats = () => {

  const { league } = useStateContext()
  const [error, setError] = useState(false)
  const [stats, setStats] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {



    fetchLeagueStats(league.slug, league.year)
      .then(resp => setStats(resp))
      .catch(error => setError(error))
      .finally(() => setLoading(false))

  }, [])

  if (loading)
    return <ActivityIndicator style={s.spinner} color='white' size={22} />

  if (error)
    return <Text style={s.error}>{error.message}</Text>

  return (
    <ScrollView>
      <View style={{ marginBottom: 200 }}>
        {
          stats ?
            stats?.map((stat, i) => {
              return (
                <View key={i} style={s.container}>
                  <Text style={s.title}>{`${stat.displayName}`} <Text style={[{ color: Colors.text100, fontSize: 16 }]}>(Partidos)</Text></Text>

                  {
                    stat.leaders.map((leader, k) => (
                      <Leader key={k} leader={leader} num={k + 1} />
                    ))
                  }

                </View>
              )
            })
            :
            <Text style={s.noData}>Sin datos</Text>
        }
      </View>
    </ScrollView>
  )
}

export default Stats

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 7,

  },
  title: {
    marginTop: 22,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "500",
    color: Colors.text
  },
  noData: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: Colors.text
  },
  error: {
    color: Colors.text
  },
  spinner: {
    marginTop: 20
  }
})