import { ScrollView, ScrollViewBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import VideoCard from '../../../components/game/VideoCard'

const PlayerVideos = () => {
    const { player } = useStateContext()

    return (
      <ScrollView>
  
        <View style={s.container}>
          {
            player.videos?.map((video, i) => (
              <VideoCard key={i} video={video}  muted={false} autoplay={false} />
            ))
          }
        </View>
  
      </ScrollView>
    )
  }
  
  export default PlayerVideos
  
  const s = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      marginHorizontal: 4,
      marginTop: 10,
      marginBottom: 100
    }
  })