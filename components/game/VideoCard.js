import { Video } from 'expo-av'
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { convertTimestamp } from '../../utils/time'
import WebView from 'react-native-webview'
import * as Network from 'expo-network';


const VideoCard = ({ video }) => {

    const [url, setUrl] = useState(video.links.source.HD.href)


    useEffect(() => {
        const checkDataSaver = async () => {
            const networkState = await Network.getNetworkStateAsync();
            setUrl(networkState.type === "WIFI" ? video.links.source.HD.href : video.links.mobile.source.href);

        };

        checkDataSaver();
    }, []);

    const timestamp = convertTimestamp(video.originalPublishDate)
    const date = timestamp.DDMMYYYY
    const time = timestamp.time
    const accentColor = "lime"


    const htmlContentPlyr = `
    
    <!doctype html>
<html>
<head>
    <title>Dash.js Rocks</title>
  
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
        
            <style>
                *{padding:0;margin:0}

                :root {
                    --plyr-color-main: ${accentColor};
                }
            </style>
            <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    </head>
    <body style="background-color:${Colors.card}">

    <video id="player"  playsinline muted controls >

        <source src="${url}" type="application/x-mpegURL"/>
    </video>
  

<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

<script>
  let player = new Plyr('#player',{
    settings: ['quality', 'speed' ],
    speed:{ selected: 1, options: [0.5, 1,1.5, 2] },
    quality:{ default: 480, options: [480,1080] },

    controls: [
            'play-large',
            'play',
            'mute',
            'current-time',
            'progress',
            'settings',
            'fullscreen', 
    ],
  });




</script>
</body>
</html>

    
    `


    return (
        <View style={s.videoContainer}>
            <View style={s.text}>
                {
                    "headline" in video &&
                    <Text style={s.headLine}>{video.headline}</Text>
                }

                <Text style={s.date}>{date}, {time}</Text>

                {
                    "description" in video &&
                    <Text style={s.description}>{video.description}</Text>
                }


            </View>
            <WebView
                style={s.webview}

                userAgent='Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
                allowsFullscreenVideo
                originWhitelist={['*']}
                // source={{uri:streamUrl}}
                // source={{ html: htmlContentNative}}
                // source={{ html: htmlContentVideojs }}
                source={{ html: htmlContentPlyr }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                allowsProtectedMedia={true}
                mediaPlaybackRequiresUserAction={false}
            />

            {/* 
            <Video
                style={{
                    width: Dimensions.get('window').width / 1.02,
                    height: Dimensions.get('window').height / 3.9,
                    backgroundColor: "black",
                }}
                source={{ uri: video.links.mobile.source.href }}
                resizeMode='contain'
                useNativeControls
            /> */}


        </View>
    )
}

export default VideoCard


const s = StyleSheet.create({
    videoContainer: {
        backgroundColor: Colors.card,
        borderRadius: 7
    },
    webview: {
        width: "100%",
        aspectRatio: (16 / 9),
        backgroundColor: Colors.background,
    },
    headLine: {
        color: Colors.text,
        fontSize: 21,
        fontWeight: "600",
        lineHeight: 28
    },
    text: {
        padding: 10
    },
    description: {
        color: Colors.text100,
        fontSize: 12,
        paddingTop: 5,
        lineHeight: 17
    },
    date: {
        marginTop: 4,
        fontWeight: "500",
        fontSize: 10,
        color: Colors.text,
    }
})