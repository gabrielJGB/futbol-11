import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'



import { Button, Icon } from 'react-native-paper'


import { useStateContext } from '../../../context/StateContext'
import VideoCard from '../../../components/game/VideoCard'
import GameInfo from '../../../components/game/index/GameInfo'
import AttackMomentum from '../../../components/game/index/AttackMomentum'
import GameArticle from '../../../components/game/index/GameArticle'

const Overview = () => {
  const { game, sofaId } = useStateContext()




  return (
    <ScrollView >
      <View style={s.container}>



        {
          game.videos?.length > 0 &&
          <VideoCard video={game.videos[0]} />
        }

        {
          sofaId &&
          <AttackMomentum sofaId={sofaId} />
        }

        <GameInfo game={game} />


        {
          "article" in game &&
          <GameArticle article={game.article} />

        }


      </View>
    </ScrollView>
  )
}

export default Overview

const s = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 16,
    paddingHorizontal: 4,
    paddingBottom: 100

  }
})