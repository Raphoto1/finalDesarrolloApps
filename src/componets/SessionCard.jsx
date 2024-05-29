import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { useGetGameByIdQuery } from "../services/gamesService";
import moment from "moment/moment";

const SessionCard = ({ gameId,date, players, index }) => {
  const { data: gameInfo } = useGetGameByIdQuery(gameId);

  const handleDelete = () => {
    console.log(index);
  }
  return (
    <View style={styles.genContainer}>
      <View style={styles.sessCard}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.gameImage} resizeMode='cover' source={{ uri: `${gameInfo?.background_image}` }} borderTopLeftRadius={10} borderTopRightRadius={10} />
          </View>
          <View style={styles.topTextContainer}>
            <Text style={styles.topTextMain}>{gameInfo?.name }</Text>
            <Text style={styles.topTextSecondary}>{date.slice(0,-8)}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textPlayers}>{players.length} Players</Text>
          {/* <Pressable onPress={handleDelete}>
            <Text style={styles.textPlayersDel}>Delete</Text>
          </Pressable> */}
        </View>
      </View>
    </View>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  genContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    padding:10,
  },
  sessCard: {
    backgroundColor:colors.grayDark,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    
  },
  textContainer: {
    width:'100%',
    height: '20%',
    borderRadius: 10,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems:'center'
  },
  topContainer: {
      width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  topTextContainer: {
    position: 'absolute',
    paddingStart: 10,
  },
  topTextMain: {
    fontFamily: 'LatoBold',
    fontSize:24,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  topTextSecondary: {
    fontFamily:'LatoRegular',
    color: colors.white,
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  imageContainer: {
    width: 400,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf:'flex-start'
  },
  gameImage: {
    height: "100%",
    width: "100%",
  },
  textPlayers: {
    justifyContent:'center',
    color:colors.gray,
    fontFamily: 'LatoRegular',
    fontSize:18,
  },
  textPlayersDel: {
    justifyContent:'center',
    color:colors.alertColor,
    fontFamily: 'LatoRegular',
    fontSize:18,
  }
});
