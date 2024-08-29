import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { router, useFocusEffect, useRouter } from 'expo-router';
import { dateToYYYYMMDD, isSameDay } from '../utils/time';
import { useStateContext } from '../context/StateContext';
import { fetchAllLeagues } from '../utils/fetch';
import LeagueCard from '../components/home/LeagueCard';
import HomeHeader from '../components/home/HomeHeader';
import LoadingCards from '../components/home/LoadingCard';
import { Button, FAB } from 'react-native-paper';
import Colors from '../constants/Colors';
import DatePickerComponent from '../components/home/DatePickerComponent';
import { useApp } from '../context/AppContext';
import { gamePlaying } from '../utils/match';


const Home = () => {



  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false);
  const { selectedDate, setSelectedDate, leagues, setLeagues, setShowOnlyPlaying } = useStateContext()
  const { firstRender, setFirstRender } = useApp()
  const formatedDate = dateToYYYYMMDD(selectedDate)
  const { push, replace } = useRouter()
  let i = 0

  const _fetchAllLeagues = (load) => {

    console.log(`Fetching date games.. ${selectedDate}, ${++i}`);
    setLoading(load)

    fetchAllLeagues(formatedDate)
      .then(data => {
        setLeagues(data)
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false))
  }




  useFocusEffect(
    useCallback(() => {

      if (firstRender) {
        _fetchAllLeagues(true)
        _fetchAllLeagues(true)
        _fetchAllLeagues(true)
        _fetchAllLeagues(true)
        _fetchAllLeagues(true)

        setFirstRender(false)
      }
    }, [firstRender, setFirstRender]))


  useFocusEffect(
    useCallback(() => {
      // push("game/717399")
      // push("team/83?season=2024")
      // push("league/arg.1")
      // push("player/380084")
      let intervalId;

      if (isSameDay(selectedDate, new Date())) {
        _fetchAllLeagues(true)
        _fetchAllLeagues(true)
        _fetchAllLeagues(true)
        _fetchAllLeagues(true)


        intervalId = setInterval(() => {
          _fetchAllLeagues(false)
          _fetchAllLeagues(false)

        }, 1000 * 30)

        return () => {
          
          clearInterval(intervalId)
        }

      } else {
        
        clearInterval(intervalId)
        
        setShowOnlyPlaying(false)
      }
    }, [selectedDate]))

  useEffect(() => {
    setLeagues(false)
    _fetchAllLeagues(true)

  }, [selectedDate])




  return (

    <>

      <HomeHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <View style={s.container}>


        {
          loading &&
          <LoadingCards />
        }

        {
          !loading && error &&
          <View>
            <Text style={s.error}>Sin datos  {":("} </Text>
            <Button
              onPress={() => {
                setSelectedDate(new Date())
                replace("/")

              }}
              style={{ borderRadius: 7 }}
              mode='contained'
              buttonColor='black'
              textColor='white'
              icon='reload' >Volver a hoy</Button>
          </View>
        }

        {
          !loading && !error &&

          <FlatList
            data={leagues}
            renderItem={(league) => (<LeagueCard league={league} />)}
            keyExtractor={(item) => item.id}
            onRefresh={() => _fetchAllLeagues(true)}
            refreshing={loading ? true : false}
            ListHeaderComponent={() => (<Text style={s.top}></Text>)}
            ListFooterComponent={() => (<Text style={s.footer}></Text>)}
            // ListEmptyComponent={() => <Text style={s.empty}>...</Text>}
            removeClippedSubviews
            initialNumToRender={6}
            windowSize={10}



          />

        }





      </View>

      <View style={s.fab}>
        <FAB
          icon="calendar-month"
          mode='elevated'
          rippleColor="white"
          style={{ backgroundColor: "#04cc00" }}
          color='white'
          onPress={() => setShowCalendar(true)}
        />
      </View>

      <DatePickerComponent
        date={selectedDate}
        setDate={setSelectedDate}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
      />

    </>
  );
};

export default Home;



const s = StyleSheet.create({
  container: {

    paddingVertical: 0,
    paddingHorizontal: 5,
  },
  text: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 0
  },
  separator: {

  },
  top: {
    color: "white",
    paddingVertical: 0
  },
  footer: {

    color: Colors.text100,
    textAlign: "center",
    marginVertical: 100
  },
  spinner: {
    marginTop: 20
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "white"
  },
  error: {
    color: Colors.text,
    fontSize: 15,
    textAlign: "center",
    paddingTop: 20,
    marginBottom: 20
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
})