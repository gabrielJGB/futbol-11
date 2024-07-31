import { Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { field } from '../../../assets'
import { useStateContext } from '../../../context/StateContext'
import FieldLine from './FieldLine'
import { sortRoster } from '../../../utils/match'
import { ActivityIndicator } from 'react-native-paper'

const WIDTH = Dimensions.get("screen").width
const HEIGHT = 450
const IMG_SIZE = 10


const Field = () => {

    const { game } = useStateContext()


    const formations = [game.rosters[0].formation.split("-"), game.rosters[1].formation.split("-")]
    const rosterHome = game.rosters[0].roster.filter(elem => elem.starter)
    const rosterAway = game.rosters[1].roster.filter(elem => elem.starter)
    const rosters = [rosterHome, rosterAway]
    const [lines, setLines] = useState(false)
    const homeColor = game.header.competitions[0].competitors[0].team.color || "white"
    const awayColor = game.header.competitions[0].competitors[1].team.color || "black"


    const switchPositions = (k,p1,p2) =>{
        let aux = rosters[k][p1]
        rosters[k][p1] = rosters[k][p2]
        rosters[k][p2] = aux
    }

    const getLines = (k) => {

        rosters[k] = sortRoster(rosters[k])
    
        if (formations[k][1] === "2" && formations[k][2] === "3"&& formations[k][3] === "1") {
            switchPositions(k,6,7)
            switchPositions(k,6,8)
        }
        if(formations[k][1] === "1" && formations[k][2] === "2" && formations[k][3] === "1" && formations[k][4] === "2"){
            switchPositions(k,6,8)
            switchPositions(k,5,7)
            switchPositions(k,6,7)
        }
        if(formations[k][1] === "4" && formations[k][2] === "2" && formations[k][3] === "1"){
            switchPositions(k,9,10)
         
        }
        if(formations[k][1] === "2" && formations[k][2] === "2" && formations[k][3] === "2"){
            switchPositions(k,5,6)
            switchPositions(k,6,7)
        }

        if(formations[k][1] === "1" && formations[k][2] === "4" && formations[k][3] === "1"){
            switchPositions(k,5,6)
            switchPositions(k,5,7)
            switchPositions(k,5,8)
            
        }

        if(formations[k][1] === "3" && formations[k][2] === "1" && formations[k][3] === "2"){
            switchPositions(k,7,8)    
            
        }
     
  
        const lines = []
        formations[k].unshift("1")
        formations[k].forEach((playersInLine, i) => {
            let x = rosters[k].splice(0, playersInLine)
            lines.push(x)
        })

        return lines
    }


    useEffect(() => {
        setLines([getLines(0), getLines(1)])
    }, [])




    if (!lines)
        return <View style={s.loading}>
              <ActivityIndicator color='white' size={35} />
        </View>


    return (


        <ScrollView horizontal>

            {/* {console.log(rosterHome.)} */}

            {
                [0, 1].map((i, k) => (
                    <View
                        key={k}
                        style={[s.field]}
                    >

                        <Image
                            source={field}
                            style={[s.fieldImg, { transform: k === 1 ? [{ rotateY: '180deg' }] : [] }]}
                        />


                        {
                            lines[k].map((line, i) => (

                                <FieldLine
                                    key={i}
                                    line={line}
                                    lineIndex={i}
                                    color={k === 0 ? homeColor : awayColor}
                                    isHome={k === 0}
                                    playersInLine={formations[k].length + 1}
                                    isThisBoca={game.header.competitions[0].competitors[k].team.id === "5"}
                                />
                            ))
                        }
                        
                    </View>
                ))
            }


        </ScrollView>
    )
}

export default Field

const s = StyleSheet.create({
    field: {
        width: WIDTH,
        height: HEIGHT,
        borderRadius: 16,

    },
    fieldImg: {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        width: WIDTH,
        height: HEIGHT,
    },
    fieldHome: {
        backgroundColor: "#27821a",

    },
    fieldAway: {
        backgroundColor: "#3da42e",
    },
    loading:{
        alignSelf:"flex-start",
        color:"white",
        textAlign:"left",
        marginTop:10,
        marginLeft:90,
        fontSize:15
    }

})