import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { fetchVideo } from '../../utils/fetch'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import VideoCard from '../../components/game/VideoCard'
import Colors from '../../constants/Colors'

const VideoPage = () => {
    const { id } = useGlobalSearchParams()
    const [video, setVideo] = useState(false)
    const [loading, setLoading] = useState(true)
    const { back } = useRouter()

    useEffect(() => {
        fetchVideo(id)
            .then(res => setVideo(res))
            .finally(() => setLoading(false))

    }, [])

    if (loading)
        return (
            <View style={s.spinner}>
                <ActivityIndicator color='white' size={25} />
            </View>
        )


    return (
        <View style={s.container}>
            <View style={s.backView}>
                <IconButton icon="arrow-left" iconColor='white' size={22} onPress={() => back()} />
                <Text style={s.pageTitle}>Video</Text>
            </View>
            {
                !video ?
                    <Text style={s.error}>Error al obtener el video</Text>
                    :
                    <View style={s.video}>
                        <VideoCard video={video} />
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
        marginHorizontal:4,
        backgroundColor: Colors.card,
    },
    backView: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:5,
        backgroundColor: Colors.card,
        paddingVertical: 0,
    },
    error:{
        color:Colors.text,
        padding:7,
        textAlign:"center",
        fontSize:15
    },
    pageTitle:{
        color:Colors.text,
        fontWeight:"500",
        fontSize:16
    }
})