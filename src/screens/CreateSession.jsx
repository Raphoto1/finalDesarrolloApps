//imports de app
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
//imports propios
import PlayersCounter from '../componets/PlayersCounter'

const CreateSession = () => {
  return (
      <View>
          <PlayersCounter/>
      <Text>CreateSession</Text>
    </View>
  )
}

export default CreateSession

const styles = StyleSheet.create({})