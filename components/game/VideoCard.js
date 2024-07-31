import { Video } from 'expo-av'
import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'



const VideoCard = ({ video }) => {

    

    return (
        <View style={s.videoContainer}>
            <View style={s.text}>
                {
                    "headline" in video &&
                    <Text style={s.headLine}>{video.headline}</Text>
                }

                {
                    "description" in video &&
                    <Text style={s.description}>{video.description}</Text>
                }
            </View>
            <Video
                style={{
                    width: Dimensions.get('window').width/1.02,
                    height: Dimensions.get('window').height / 3.9,
                    backgroundColor: "black",
                }}
                resizeMode='contain'
                useNativeControls
                source={{ uri: video.links.mobile.source.href }}
            // source={{ uri:  isHDselected?video.links.source.full.href:video.links.mobile.source.href }}
            />
        </View>
    )
}

export default VideoCard


const s = StyleSheet.create({
    videoContainer: {
        backgroundColor: Colors.card,
        borderRadius: 7
    },
    headLine: {
        color: Colors.text,
        fontSize: 21,
        fontWeight: "600",
        lineHeight:28
    },
    text:{
        padding:10
    },
    description: {
        color: Colors.text100,
        fontSize: 12,
        paddingTop:5,
        lineHeight:17

    }
})