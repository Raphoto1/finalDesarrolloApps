//imports de app
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
//imports Propios
import GridList from "../componets/GridList";
import gamesFull from '../data/gamesFull.json'

const GameList = ({ route, navigation }) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text>All Games</Text>
        <Button
          title='Back'
          onPress={() => {
            navigation.goBack();
          }}></Button>
      </View>
      <GridList listToShow={gamesFull} navigation={navigation } />
    </View>
  );
};

export default GameList;

const styles = StyleSheet.create({
  titleContainer: {
    
  }
});
