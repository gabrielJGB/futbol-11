import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { convertTimestamp } from '../../../utils/time'
import { Icon, TouchableRipple } from 'react-native-paper'
import Colors from '../../../constants/Colors'
import { useRouter } from 'expo-router'

const LeagueArticles = ({ news }) => {

    const { push } = useRouter()

    const articles = news.articles.map(x => {
        return {
            headline: x.headline,
            image: x.images[0].url,
            published: x.published,
            type: x.type,
            href: x.links.api.news.href,
        }
    })


    return (
        <View style={s.container}>
            <Text style={s.header}>{news.header.replace("- ", "")}</Text>

            {
                articles.map((article, i) => (

                    <TouchableRipple
                        unstable_pressDelay={80}
                        key={i}
                        rippleColor="#5e7edb"
                        borderless
                        style={{ borderRadius: 7 }}
                        onPress={() => {


                            if (article.type === "Media") {
                                const id = article.href.match(/clips\/(.*)\?lang/)[1]
                                push(`video/${id}`)
                            }
                            else {
                                const id = article.href.match(/news\/(.*)\?lang/)[1]
                                push(`article/${id}`)
                            }
                        }}
                    >
                        <View style={s.article}>

                            <Image source={{ uri: article.image }} style={s.img} />

                            {
                                // article.type === "Media" ?
                                //     <Icon source="video-box" size={32} color='#f3f3f3' />
                                //     :
                                //     <Icon
                                //         source="newspaper-variant"
                                //         size={32}
                                //         color='#f3f3f3'
                                        
                                //     />
                            }

                            <View style={s.contentBody}>

                                <Text style={s.date}>{convertTimestamp(article.published).DDMMYYYY}</Text>


                                <Text numberOfLines={2} style={s.contentText}>
                                    {/* {article.type === "Media" && <><Icon source="video" size={12} color="white" /> </>} */}
                                    {article.headline}
                                </Text>


                            </View>
                        </View>
                    </TouchableRipple>
                ))
            }

        </View>
    )
}

export default LeagueArticles

const s = StyleSheet.create({
    container: {

        marginTop: 12,
        flexDirection: "column",
        gap: 7,
    },
    header: {
        fontSize: 17,
        marginBottom: 2,
        textAlign: "center",
        fontWeight: "500",
        color: "white",
        // textTransform: "uppercase"
    },
    article: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: Colors.card,
        padding: 7,
    },
    contentBody: {
        width: "100%",
        flexDirection: "column",

        gap: 0
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    contentText: {
        maxWidth: "85%",
        fontSize: 13,
        color: "white"
    },
    date: {
        color: Colors.text100,
        fontSize: 9,
        fontWeight: "500",
        marginBottom: 2,
    },
})