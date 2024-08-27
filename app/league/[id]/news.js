import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext'
import { fetchLeagueArticles } from '../../../utils/fetch'
import { ActivityIndicator } from 'react-native-paper'
import ArticleCard from '../../../components/team/ArticleCard'

const News = () => {

  const { league } = useStateContext()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState(false)

  useEffect(() => {

    
    fetchLeagueArticles(league.slug)
      .then(resp => setArticles(resp))
      .finally(() => setLoading(false))

  }, [])

  if (loading)
    return (
      <View style={s.spinner}>
        <ActivityIndicator color='white' size={35} />
      </View>
    )

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
  },
  spinner: {
    marginTop: 40
  }
})