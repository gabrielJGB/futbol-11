import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import VideoCard from '../../../components/game/VideoCard'

const Videos = () => {

  const { game } = useStateContext()



  return (
    <ScrollView>
      <View style={s.container}>

        {
          game.videos.map((video, i) => (
            <VideoCard key={i} video={video} />
          ))
        }

      </View>
    </ScrollView>
  )
}

export default Videos

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
    paddingTop: 16,
    paddingHorizontal: 4,
    paddingBottom: 100

  },
})