//imports de app
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
//imports propios
import PlayersCounter from '../componets/PlayersCounter'

const GameSession = () => {
  return (
    <View style={styles.generalContainer}>
      <PlayersCounter/>
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