import React, { useState } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isSameDay } from '../../utils/time';

const DatePickerComponent = ({ date, setDate, showCalendar, setShowCalendar }) => {
    //   const [date, setDate] = useState(new Date());


    const onChange = (event, selectedDate) => {

        setShowCalendar(false)

        if (event.type === 'neutralButtonPressed') {
            setDate(new Date())
        } else if (selectedDate.getDate() != date.getDate()) {
            const currentDate = selectedDate || date;
            setDate(currentDate);
        }

    };





    return (
        <>
            {
                showCalendar &&
                <View style={s.container}>
                    <DateTimePicker

                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={onChange}
                        neutralButton={{ label: isSameDay(date, new Date()) ? '' : 'Volver a hoy' }}


                    />
                </View>
            }

        </>
    );
};

const s = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default DatePickerComponent;
