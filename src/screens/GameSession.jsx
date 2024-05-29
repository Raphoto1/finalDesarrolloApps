//imports de app
import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
//imports propios
import ButtonBlue from '../componets/ButtonBlue'
import SessionsList from '../componets/SessionsList'

const GameSession = ({navigation}) => {
  return (
    <View style={styles.generalContainer}>
      <View style={styles.sessList}>
        <SessionsList/>
      </View>
      <View style={styles.btnContainer}>
          <Text>Check on Games to set a GameSession</Text>
          <ButtonBlue title={'Go to Games'} onPress={()=>navigation.navigate('HomeStack',{screen:'GameList'})}/>
      </View>
    </View>
  )
}

export default GameSession

const styles = StyleSheet.create({
  generalContainer: {
    width: '100%',
    height:'100%',
    flex:1
  },
  btnContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center'
  },
  sessList: {
    width:'100%',
    height:'90%',
  }
})