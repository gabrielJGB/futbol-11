import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { memo } from 'react'
import TeamCard from './TeamCard'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { Icon } from 'react-native-paper'
import { gamePlaying, getStatus, translateTitle } from '../../utils/match'
import { useStateContext } from '../../context/StateContext'


const GameCard = ({ game, league, status }) => {

    const router = useRouter()
    const {showOnlyPlaying} = useStateContext()
    const home = game.item.competitors.find(competitor => competitor.homeAway === "home")
    const away = game.item.competitors.find(competitor => competitor.homeAway === "away")
    const isFinished = status.type.state === "post"




    const getStatusStyle = (status) => {


        switch (status) {
            case "pre":
                return s.statusPre

            case "in":
                return s.statusIn

            case "post":
                return s.statusPost
        }
    }

    {/* {
         
          <Button
            
            title="Game"
            onPress={() => {
              router.push({
                pathname: `/game/2424`,
                params: { liga: "Copa" },
              })
            }}
          />
        
      } */}

// { display: showOnlyPlaying && !gamePlaying(league) ?"none":"flex"}
    return (
        <TouchableNativeFeedback
            onPress={() => router.push(`/game/${game.item.id}`)}
        >
        
            <View style={[s.game,{display:gamePlaying(game) || !showOnlyPlaying  ? "flex":"none"}]}>

                {
                    league && league.item.isTournament && game.item.group.shortName &&

                    <Text style={s.gameTitle}>{translateTitle(game.item.group.name).toUpperCase()}</Text>

                }


                <View style={s.mainContainer}>
                    <View style={s.teamsContainer}>
                        <TeamCard team={home} isWinner={isFinished && home.winner} isPre={false}/>
                        <TeamCard team={away} isWinner={isFinished && away.winner} isPre={false}/>
                    </View>
                    <View style={s.gameStatus}>
                        <Text style={[s.gameStatusText, getStatusStyle(status.type.state)]}>
                            {getStatus(status.type, game.item.date)}
                        </Text>


                    </View>
                </View>

                {
                    "video" in game.item &&
                    <View style={s.videoContainer}>
                        <View style={s.video}>
                            <Icon source="video" size={18} color='white' />
                        </View>
                        <Text style={s.videoHeadline}>{game.item.video.headline}</Text>
                    </View>
                }

            </View>

        </TouchableNativeFeedback>
    )
}

export default memo(GameCard)

const s = StyleSheet.create({
    game: {
        padding: 9,
        borderBottomWidth:1,
        borderColor:Colors.highlight

    },
    gameTitle: {
        color: Colors.text100,
        fontSize: 11
    },
    mainContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingVertical: 10
    },
    teamsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: "70%",


    },
    gameStatus: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "33%"


    },
    video: {
        backgroundColor: "black",
        paddingHorizontal: 5,
        paddingVertical: 2,
        color: "white",
        borderRadius: 5,
        fontSize: 12,
        borderWidth: 1,
        borderColor: "grey"

    },
    videoContainer: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-evenly",
        alignItems: "center",
        gap: 7,
        paddingBottom: 5
    },
    videoHeadline: {
        fontStyle: "italic",
        fontSize: 12,
        color: Colors.text100,
        lineHeight: 17,
        width: "85%"
    },
    gameStatusText: {

        color: "white",
        fontWeight: "500",
        textAlign: "center",
        paddingTop: 3,
        paddingBottom: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        fontSize: 13,
        borderWidth: 1,
    },
    statusPre: {
        backgroundColor: "transparent",
        borderWidth: 0
    },
    statusIn: {
        backgroundColor: "#a30000",
        borderColor: "#c52020"
    },
    statusPost: {
        backgroundColor: "black",
        borderColor: "#383838"
    }

})