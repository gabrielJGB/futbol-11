import { Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { convertTimestamp } from '../../utils/time'
import { useRouter } from 'expo-router'

const ArticleCard = ({ article }) => {

    const { push } = useRouter()

    const published = `${convertTimestamp(article.published).dayOfWeek} ${convertTimestamp(article.published).day} de ${convertTimestamp(article.published).month} de ${convertTimestamp(article.published).year}, ${convertTimestamp(article.published).time}hs`



    const handlePress = () => {


        let id = false
        let type = article.type
        
        
        if ("id" in article) {
            // team || player
            id = article.id

        } else {
            // league
            const url = article.links.api.news.href
            const match = url.match(/\/(\d+)\?/)
            id = match && match[1] ? match[1] : null
        }
        

        if (type === "Media") {
            push(`video/${id}`)

        }
        else if (type === "dStory") {
            push(`article/${id}`)

        }
        else 
            return ;

    }


    return (
        <TouchableNativeFeedback onPress={() => handlePress()}>
            <View style={s.container}>
                {
                    "images" in article && article.images.length &&
                    <Image
                        source={{ uri: article.images[0].url }}
                        width={Dimensions.get('window').width - 10}
                        height={Dimensions.get('window').width / 2}
                        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    />
                }

                {
                    <View style={s.body}>
                        <Text style={s.published}>{published}</Text>
                        <Text style={s.headline}>
                            {`${article.type === 'Media' ? "[Video]" : ""} ${article.headline}`}
                        </Text>
                        <Text style={s.description}>{article.description}</Text>
                    </View>
                }

            </View>
        </TouchableNativeFeedback>
    )
}

export default ArticleCard

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.card100
    },
    body: {
        display: "flex",
        flexDirection: "column",
        padding: 10,


    },
    published: {
        fontSize: 12,
        paddingBottom: 7,
        color: Colors.text100,
    },
    headline: {
        fontSize: 23,
        fontWeight: "500",
        color: Colors.text,
        lineHeight: 28,
    },
    description: {
        marginTop: 11,
        color: "#e2e2e2",
        fontSize: 13,
        lineHeight: 20,
        textAlign: "justify"
    }
})