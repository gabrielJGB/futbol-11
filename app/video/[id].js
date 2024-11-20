import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import Colors from '../../constants/Colors'
import VideoCard from '../../components/game/VideoCard'
import { fetchVideo } from '../../utils/fetch'


const VideoPage = () => {
    // const { id } = useGlobalSearchParams()
    const [video, setVideo] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { back } = useRouter()
    const { id } = useLocalSearchParams()

    useEffect(() => {

        if (id) {

            fetchVideo(id)
                .then(res => { setVideo(res) })
                .catch(error => setError(error.message))
                .finally(() => setLoading(false))

        }
    }, [id])

    if (loading)
        return (
            <View style={s.spinner}>
                <ActivityIndicator color='white' size={25} />
            </View>
        )


    if (error)
        return <Text style={s.error}> {`Error: ${error}\n\nVideo state: ${JSON.stringify(video)}\n\nVideo url: ${parsedArticle.links.api.self.href}\n\nArticle:${article ? "true" : "false"}`}</Text>


    return (
        <View style={s.container}>
            <View style={s.backView}>
                <IconButton icon="arrow-left" iconColor='white' size={22} onPress={() => back()} />
                <Text style={s.pageTitle}></Text>
            </View>
            {
                // !video ?
                //     <Text style={s.error}>Error al obtener el video</Text>
                //     :
                <View style={s.video}> 
                    <VideoCard video={video}  muted={false} autoplay={true}  />
                </View>
            }
        </View>
    )
}

export default VideoPage

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 22,
    },
    spinner: {
        marginTop: 40
    },
    video: {
        marginHorizontal: 4,
        backgroundColor: Colors.card,
    },
    backView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: Colors.card,
        paddingVertical: 0,
    },
    error: {
        color: Colors.text,
        padding: 7,
        textAlign: "center",
        fontSize: 15
    },
    pageTitle: {
        color: Colors.text,
        fontWeight: "500",
        fontSize: 16
    }
})