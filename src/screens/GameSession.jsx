//imports de app
import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
//imports propios
import PlayersCounter from '../componets/PlayersCounter'
import HorizontalList from '../componets/HorizontalList'

const GameSession = ({navigation}) => {
  return (
    <View style={styles.generalContainer}>
      <View>
        <Pressable navigation={navigation}>
          <Text>Create New Session</Text>
        </Pressable>
      </View>
      <HorizontalList title={"Active Friends"} navigation={navigation} />
      <HorizontalList title={"Pending Sessions"} navigation={navigation}/>
      <HorizontalList title={"Active Sessions"} navigation={navigation}/>
    </View>
  )
}

export default GameSession

const styles = StyleSheet.create({
  generalContainer: {
    width:'100%',
    flex:1
  }
})