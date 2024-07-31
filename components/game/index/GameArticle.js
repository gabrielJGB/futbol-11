import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'

const GameArticle = ({ article }) => {
    return (

        <View style={s.container}>

            {
                "headline" in article &&

                <Text style={s.headline}>
                    {article.headline}
                </Text>


            }

            {
                "images" in article &&
                <View style={s.images}>
                    {
                        article.images.map((image, i) => (

                            <Image key={i} source={{ uri: image.url }} width={Dimensions.get('window').width - 8} height={Dimensions.get('window').width / 2} />
                        ))
                    }
                </View>

            }



            <Text style={s.story}>
                {article.story.
                    replaceAll("<p>", "\n")
                    .replaceAll("</p>", "")
                    .replaceAll("<strong>", "")
                    .replaceAll("</strong>", "")
                    .replaceAll("<photo1>", "")
                    .replaceAll("<h2>", "")
                    .replaceAll("</h2>", "")
                    }
            </Text>


        </View>

    )
}

export default GameArticle

const s = StyleSheet.create({
    container: {
        backgroundColor: Colors.card,
        borderRadius: 7,
        // marginHorizontal:3, 
        marginBottom:100,
        
    },
    headline: {
        fontSize: 24,
        margin:8,
        color: Colors.text,
        fontWeight: "500"
    },
    images: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12
    },
    story:{
        backgroundColor:Colors.card,
        textAlign:"justify",
        color:Colors.text,
        padding:8,
        lineHeight:20,
        borderRadius:7
    }
})