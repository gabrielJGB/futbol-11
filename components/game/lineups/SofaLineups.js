import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import Colors from '../../../constants/Colors'

const SofaLineups = ({sofaId}) => {
  return (
    
      <View style={{}}>
        

          <WebView
            source={{ uri: `https://widgets.sofascore.com/es-ES/embed/lineups?id=${sofaId}&widgetTheme=dark&v=2` }}
            style={s.webview}
          />

        </View>
    
  )
}

export default SofaLineups

const s = StyleSheet.create({
    webview:{
        width:"100%",
        height:785,
        marginTop:10,
        marginHorizontal:"auto",
        backgroundColor:Colors.background
    }
})