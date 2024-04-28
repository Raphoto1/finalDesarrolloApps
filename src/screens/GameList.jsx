//imports de app
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
//imports Propios
import GridList from "../componets/GridList";

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
      <GridList />
    </View>
  );
};

export default GameList;

const styles = StyleSheet.create({
  titleContainer: {
    
  }
});
