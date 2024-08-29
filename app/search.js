import { Image, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Icon, TextInput, TouchableRipple } from 'react-native-paper'
import { useRouter } from 'expo-router'
import Colors from '../constants/Colors'
import { fetchSearch } from '../utils/fetch'
import { convertTimestamp } from '../utils/time'

const SearchPage = () => {

    const { back, push } = useRouter()
    const [text, setText] = useState("");
    const [results, setResults] = useState(false)
    const [loading, setLoading] = useState(false)
    const textInput = useRef()


    const manageSearch = (text) => {

        Keyboard.dismiss()
        setLoading(true)
        setResults(false)
        fetchSearch(text)
            .then(res => { setResults(res) })
            .finally(() => setLoading(false))
    }


    const onSubmit = () => {

        if (text != "") {
            
            manageSearch(text)
            setLoading(true)
        }

    }

    useEffect(() => {

        if (text != "") {
            // setTimeout(() => {
            //     manageSearch(text)
            // }, 1000)

        } else {
            setResults(false)
        }

    }, [text])


    useEffect(() => {
        textInput.current.focus()
    }, [])



    const getImage = (content) => {
        
        if ("image" in content) {
            return <Image source={{ uri: "defaultDark" in content.image ? content.image.defaultDark : content.image.default }} style={s.img} />
            
        } else if ("images" in content) {
            
            return <Image source={{ uri: content.images[0].url }} style={s.img} />

        } else if (content.type === "player")
            return <Icon source="account" color='white' size={40} />

        else if (content.type === "team")
            return <Icon source="shield" color='white' size={40} />

        else if (content.type === "league")
            return <Icon source="trophy-outline" color='white' size={40} />

        else
            return <View style={{ width: 50 }}></View>
    }


    const manageItemPress = (content) => {
        const type = content.type
        if (type === "team") {
            const id = content.uid.match(/t\:(.*)/)[1]
            push(`team/${id}?season=${new Date().getFullYear()}`)

        } else if (type === "league") {
            push(`league/${content.defaultLeagueSlug}`)

        } else if (type === "player") {
            const id = content.uid.match(/a\:(.*)/)[1]
            push(`player/${id}`)

        } else if (type === "dStory") {
            const id = content.id
            push(`article/${id}`)
        }

    }


    return (
        <View style={s.container}>

            <TextInput
                ref={textInput}
                label="Buscar liga, equipo o jugador"
                value={text.toLowerCase()}
                left={<TextInput.Icon icon="arrow-left" color="white" onPress={() => back()} />}
                activeUnderlineColor="#3cc346"
                style={{ backgroundColor: Colors.card }}
                textColor='white'
                placeholderTextColor='lime'
                enterKeyHint='search'
                right={<TextInput.Icon icon="magnify" color="white" onPress={() => onSubmit()} />}
                onChangeText={text => setText(text)}
                onSubmitEditing={() => onSubmit()}

            />

            <ScrollView>



                {
                    !results && loading &&
                    <ActivityIndicator color='white' size={25} style={{ marginTop: 100 }} />
                }

                {
                    !loading && results ?
                        results.totalFound === 0 ?
                            <Text style={s.noResults}>Sin resultados</Text>
                            :
                            <View style={s.results}>

                                {
                                    "didYouMean" in results && text != results.didYouMean &&
                                    <Text
                                        onPress={() => {
                                            
                                            setText(results.didYouMean)
                                            manageSearch(results.didYouMean)
                                            setLoading(true)
                                        }}
                                        style={s.dym1}>Quizás quisiste decir: <Text style={s.dym2}>{results.didYouMean}</Text> </Text>
                                }

                                {
                                    results.results.map((result, i) => (

                                        <View key={i} style={s.result}>
                                            <Text style={s.section}>{result.displayName.replace("Notas", "Noticias").replace("Atletas", "Jugadores")}</Text>

                                            {
                                                result.contents.filter(x => x.sport === "soccer" || x.type === "dStory").sort(((a, b) => { return new Date(b.date) - new Date(a.date) })).map((content, k) => (
                                                    <TouchableRipple
                                                        unstable_pressDelay={80}
                                                        key={k}
                                                        rippleColor="#5e7edb"
                                                        borderless
                                                        style={{ borderRadius: 7 }}
                                                        onPress={() => manageItemPress(content)}
                                                    >

                                                        <View style={s.content}>
                                                            {getImage(content)}
                                                            <View style={s.contentBody}>
                                                                {
                                                                    content.type === "dStory" &&
                                                                    <Text style={s.date}>{convertTimestamp(content.date).DDMMYYYY}</Text>
                                                                }
                                                                <View style={s.data}>
                                                                    <Text style={s.contentText}>{content.displayName}</Text>
                                                                    {
                                                                        "subtitle" in content && content.type === "player" &&
                                                                        <Text style={s.subtitle}>{content.subtitle}</Text>
                                                                    }
                                                                </View>
                                                            </View>
                                                        </View>

                                                    </TouchableRipple>
                                                ))
                                            }

                                        </View>

                                    ))
                                }
                            </View>
                        : <></>

                }








            </ScrollView>
        </View>
    )
}

export default SearchPage

const s = StyleSheet.create({
    container: {
        flexDirection: "column",


    },
    results: {
        padding: 7,
        flexDirection: "column",
        gap: 9,
        marginTop: 3,
        marginBottom: 100
    },
    result: {
        flexDirection: "column",

        // backgroundColor: Colors.card,
        gap: 7,
        borderRadius: 6,
        paddingHorizontal: 7,
        paddingVertical: 15,

    },
    content: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.card,
        minHeight: 50,
        padding: 7,
        gap: 8
    },
    noResults: {
        color: Colors.text,
        textAlign: "center",
        marginTop: 70
    },
    section: {
        width: "100%",

        fontSize: 24,
        fontWeight: "500",
        color: Colors.text
    },
    contentText: {
        maxWidth: "80%",
        fontSize: 13,
        color: Colors.text
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    date: {
        color: Colors.text100,
        fontSize: 9,
        fontWeight: "500",
    },
    contentBody: {
        width: "100%",
        flexDirection: "column",
        gap: 0
    },
    data: {
        flexDirection: "column",
    },
    subtitle: {
        color: Colors.text100,
        fontSize: 11
    },
    dym1: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        color: "tomato",

    },
    dym2: {
        color: "white"
    }
})