//imports de app
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
//imports propios
import GridList from '../componets/GridList'
import genresClear from '../data/genresClear.json'
const GenreList = ({ route, navigation }) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Button
          title='Back'
          onPress={() => {
            navigation.goBack();
          }}></Button>
      </View>
      <GridList listToShow={genresClear} navigation={navigation} bubbleFunct={() => { navigation.navigate('GameListGenre',`${item.name}`) }} targetRedirectBubble={'GameListGenre'} />
    </View>
  )
}

export default GenreList

const styles = StyleSheet.create({})