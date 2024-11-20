import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, IconButton } from 'react-native-paper'




import { fetchArticle } from '../../utils/fetch'
import { convertTimestamp } from '../../utils/time'
import VideoCard from '../../components/game/VideoCard'
import Colors from '../../constants/Colors'
import WebView from 'react-native-webview'


const ArticlePage = () => {

    const { id } = useLocalSearchParams()
    const [article, setArticle] = useState(false)
    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(false)
    const [tweets, setTweets] = useState([])
    const { push, back } = useRouter()
    const published = `${convertTimestamp(article.published).dayOfWeek} ${convertTimestamp(article.published).day} de ${convertTimestamp(article.published).month} de ${convertTimestamp(article.published).year}, ${convertTimestamp(article.published).time}hs`
    const season = new Date().getFullYear()


    useEffect(() => {

        if (id) {
            fetchArticle(id)
                .then(resp => { setArticle(resp.headlines[0]) })
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        }

        // if()

        // if (param.id === "1") {

        //     setArticle(JSON.parse(JSON.stringify(param.article)))


        // } else if (param.id) {

        //     fetchArticle(article.id)
        //         .then(resp => {

        //             setArticle(resp)
        //         })
        //         .catch(error => setError(error))
        //         .finally(() => setLoading(false))
        // }

    }, [id])


    useEffect(() => {

        if (article) {

            let regex = /https:\/\/twitter\.com\/[^\/]+\/status\/\d+/g;
            let matches = article.story.match(regex);

            if (matches)
                setTweets(matches)
        }

    }, [article])




    const getTagRoute = (category) => {

        if (category.type === "team") {
            return `team/${category.team.id}?season=${season}`

        } else if (category.type === "athlete") {
            return `player/${category.athlete.id}`

        } else if (category.type === "league") {
            return `league/${category.league.description}`
        } else
            return '/'

    }

    const boldMap = {
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚',
        'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡',
        'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨',
        'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴',
        'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻',
        'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂',
        'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲',
        '7': '𝟳', '8': '𝟴', '9': '𝟵',
        'Á': '𝗔́', 'É': '𝗘́', 'Í': '𝗜́', 'Ó': '𝗢́', 'Ú': '𝗨́',
        'á': '𝗮́', 'é': '𝗲́', 'í': '𝗶́', 'ó': '𝗼́', 'ú': '𝗺́'
    };

    const toBold = (text) => {
        return text.split('').map(char => boldMap[char] || char).join('');
    };



    const parseHTML = (text) => {



        text = text.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');
        text = text.replace(/<h2>(.*?)<\/h2>/gi, (match, p1) => `<strong>${p1.toUpperCase()}</strong>\n`);
        text = text.replace(/<h3>(.*?)<\/h3>/gi, (match, p1) => `<strong>${p1.toUpperCase()}</strong>\n`);
        text = text.replace(/<strong>(.*?)<\/strong>/gi, (match, p1) => toBold(p1));


        const tags = [
            "<p>", "<photo1>", "<photo2>", "<photo3<", "<photo4>", "<photo5>", "<photo6>",
            "<photo7>", "<photo8>", "<photo9>", "<photo10>", "<inline1>", "<inline2>", "<inline3>", "<inline4>",
            "<inline5>", "<video1>", "<video2>", "<video3<", "<video4>", "<video5>", "<video5>", "<video6>",
            "<video7>", "<video8>", "<alsosee>", "<inline1-wide>", "<inline2-wide>", "<inline3-wide>"
        ];


        tags.forEach(tag => {
            text = text.replaceAll(tag, "");
        });

        text = text.replaceAll("</p>", "\n");
        text = text.replaceAll("<li>", "- ");
        text = text.replaceAll("</li>", "\n");
        text = text.replace(/<[^>]*>/g, '');
        text = text.trim();

        return text;
    }



    if (loading)
        return (
            <ActivityIndicator size={22} color='white' style={{ marginTop: 20 }} />
        )

    if (error)
        return <Text style={s.error}>Ha ocurrido un error: {error.message} </Text>

    return (
        <ScrollView>
            <View style={s.backView}>
                <IconButton icon="arrow-left" iconColor='white' size={22} onPress={() => back()} />
                <Text style={s.screenTitle}></Text>
            </View>



            <View style={s.container}>

                <Text style={s.headline}>{article.headline}</Text>
                <Text style={s.published}>{published}</Text>
                <Text style={s.description}>{article.description}</Text>

                <View style={s.images}>
                    {
                        "images" in article && article.images
                            // .filter(img => img.type === "header" || img.type === "inline" || !"type" in img)
                            .map((image, i) => (
                                <View key={i}>
                                    <View style={s.img}>
                                        <Image key={i} source={{ uri: image.url }} width={Dimensions.get('window').width - 8} height={Dimensions.get('window').width / 2} />

                                    </View>
                                    {
                                        "caption" in image &&
                                        <Text style={s.caption}>
                                            {image.caption.replace("<p>", "").replace("</p>", "")}
                                        </Text>
                                    }
                                </View>

                            ))
                    }
                </View>

                {
                    "story" in article &&

                    <View style={s.articleContainer}>
                        <Text style={s.article}>

                            {parseHTML(article.story)}
                        </Text>
                    </View>
                }

                {
                    tweets.map((item, i) => (

                        <WebView
                            key={i}
                            forceDarkOn={true}
                            style={{ flex: 1, width: "100%", height: 750, marginBottom:12}}
                            source={{ uri: item }}

                        />

                    ))
                }


                <Text style={s.source}>En esta noticia:</Text>
                <View style={s.tags}>
                    {
                        "categories" in article &&
                        article.categories.map((cat, i) => {
                            return cat.description && (
                                <TouchableNativeFeedback key={i} onPress={() => push(getTagRoute(cat))}>
                                    <View>
                                        <Text style={s.tag}>{cat.description}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            )
                        }
                        )
                    }
                </View>

                {

                    "source" in article &&
                    <Text style={s.source}>FUENTE: {article.source}</Text>
                }


                {
                    "video" in article && article.video.length > 0 &&

                    <View style={s.videoContainer}>
                        <Text style={s.videoRelated}>VIDEOS RELACIONADOS:</Text>
                        {
                            article.video.map((video, i) => (

                                <VideoCard key={i} video={video} autoplay={false} muted={false} />
                            ))
                        }

                    </View>
                }

                {

                    "related" in article && article.related.length > 0 &&

                    <View style={s.relatedContainer}>
                        <Text style={s.videoRelated}>NOTICIAS RELACIONADAS:</Text>
                        {
                            article.related.map((related, i) => (
                                <TouchableNativeFeedback key={i} onPress={() => push(`article/${related.id}`)}>
                                    <View>
                                        <Text style={s.relatedHeadline}>{related.headline}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            ))
                        }

                    </View>
                }

            </View>
        </ScrollView>
    )
}

export default ArticlePage

const s = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.card,
        marginHorizontal: 4,
        marginBottom: 200
    },
    published: {
        fontSize: 12,
        padding: 7,
        fontStyle: "italic",
        color: Colors.text,
    },
    headline: {
        fontSize: 30,
        fontWeight: "500",
        color: Colors.text,
        // textAlign: "justify",
        lineHeight: 34,
        padding: 7
    },
    description: {

        color: "#d4d3d3",
        fontSize: 18,
        lineHeight: 20,
        textAlign: "auto",
        padding: 7,
        paddingBottom: 12
    },
    images: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    img: {
        backgroundColor: Colors.background,
        width: Dimensions.get('window').width - 8,
        height: Dimensions.get('window').width / 2,
    },
    backView: {

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginHorizontal: 4,
        backgroundColor: Colors.card
    },
    screenTitle: {
        color: Colors.text,
        fontSize: 17,
        fontWeight: "500"
    },
    videoContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 17,

    },
    videoRelated: {
        marginTop: 10,
        fontWeight: "500",
        borderTopWidth: 0,
        borderTopColor: Colors.border,
        backgroundColor: "black",
        color: Colors.text,
        paddingVertical: 7,
        paddingLeft: 7,
        fontSize: 13
    },
    source: {
        color: Colors.text100,
        padding: 7
    },
    relatedContainer: {
        display: "flex",
        flexDirection: "column",

    },
    relatedHeadline: {
        color: Colors.text,
        paddingHorizontal: 7,
        paddingVertical: 12,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: Colors.border,
        borderStyle: "dashed",
    },
    articleContainer: {
        marginVertical: 18,
        marginHorizontal: 7

    },
    article: {
        color: "#e7e7e7",
        lineHeight: 24,
        fontSize: 15,
        textAlign: "justify"
    }
    ,
    tags: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 7,
        paddingHorizontal: 7,
        paddingBottom: 14

    },
    tag: {
        color: Colors.text,
        padding: 7,
        paddingVertical: 9,
        borderRadius: 7,
        backgroundColor: Colors.card100,
        borderWidth: 1,
        borderColor: Colors.border
    },
    error: {
        color: Colors.text,
        textAlign: "center",
        marginTop: 20,
    },


    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 10,
        color: Colors.text,
    },
    p: {
        fontSize: 18,
        color: Colors.text,
        marginBottom: 10,
    },
    strong: {
        fontWeight: 'bold',
        color: Colors.text,
    },
    em: {
        fontStyle: 'italic',
        color: Colors.text,
    },
    caption: {
        margin: 5,
        fontStyle: "italic",
        color: Colors.text100,
        fontSize: 11
    }
})