//imports de app
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
//imports Propios
import GridList from '../componets/GridList'

const GameList = ({route, navigation}) => {
  return (
    <View>
      <Text>GameList title</Text>
      <Button title='Back' onPress={()=>{navigation.goBack()}}></Button>
          <GridList/>
    </View>
  )
}

export default GameList

const styles = StyleSheet.create({})