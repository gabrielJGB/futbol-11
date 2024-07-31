import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArticleCard from '../../../components/team/ArticleCard'
import { useStateContext } from '../../../context/StateContext'


const PlayerNews = () => {
  const { player } = useStateContext()

  

  return (
    <ScrollView>

      <View style={s.container}>
        {
          player.news.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))
        }
      </View>

    </ScrollView>
  )
}

export default PlayerNews

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