import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchTeamArticles } from '../../../utils/fetch'
import { ActivityIndicator } from 'react-native-paper'
import ArticleCard from '../../../components/team/ArticleCard'
import { useStateContext } from '../../../context/StateContext'

const News = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const { team } = useStateContext()



  useEffect(() => {

    setLoading(true)
    fetchTeamArticles(team.id)
      .then(articles => setArticles(articles))
      .finally(() => setLoading(false))

  }, [])

  if (loading)
    return <ActivityIndicator size={22} color='white' style={{ marginTop: 20 }} />

  return (
    <ScrollView>

      <View style={s.container}>
        {
          articles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))
        }
      </View>

    </ScrollView>
  )
}

export default News

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
    marginHorizontal: 4,
    marginTop: 10,
    marginBottom: 100
  }
})