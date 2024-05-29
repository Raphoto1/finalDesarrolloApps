//imports de app
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//imports propios
import ButtonBlue from "./ButtonBlue";
import { useDispatch, useSelector } from "react-redux";
import { setDateTimeSession } from "../features/GameSession/GameSessionSlice";

const DatePickerModal = () => {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());
  const { datetimeSession } = useSelector((state) => state.GameSessionSlice.value);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDateSelected(date);
    dispatch(
      setDateTimeSession({
        datetimeSession: date.toString(),
      })
    );
    hideDatePicker();
  };

  return (
    <View>
      <View style={styles.btnContainer}>
        <ButtonBlue title='When' onPress={showDatePicker} />
      </View>
      <DateTimePickerModal isVisible={isDatePickerVisible} mode='datetime' minimumDate={new Date()} onConfirm={handleConfirm} onCancel={hideDatePicker} />
    </View>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
  },
});
