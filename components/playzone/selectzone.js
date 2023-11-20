import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SelectZone = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundTomato}>
        <View style={styles.contentContainer}>
          <Row>
            <GameColumn imageSource={require('../../assets/images/quiz.png')} name="Scoz Quiz" />
            <View style={styles.spaceBetweenColumns} />
            <GameColumn imageSource={require('../../assets/images/predictor.png')} name="Predictor" />
          </Row>
          <Row>
            <GameColumn imageSource={require('../../assets/images/trnfr.jpg')} name="Transfer Guru" />
            <View style={styles.spaceBetweenColumns} />
            <GameColumn imageSource={require('../../assets/images/dribl.webp')} name="Dribble Kings" />
          </Row>
          <Row>
            <GameColumn imageSource={require('../../assets/images/4422.png')} name="4-4-2" />
            <View style={styles.spaceBetweenColumns} />
            <GameColumn imageSource={require('../../assets/images/keeper2.png')} name="Score Me" />
          </Row>
          <Row>
            <GameColumn imageSource={require('../../assets/images/corner.jpg')} name="Corner Wizard" />
            <View style={styles.spaceBetweenColumns} />
            <GameColumn imageSource={require('../../assets/images/game.jpg')} name="Scoz Prima 2024" />
          </Row>
        </View>
      </View>
    </View>
  );
};

const Row = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

const GameColumn = ({ icon, name ,  imageSource }) => {
   const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate(name); // Navigate to the screen with the same name as the game
  };
  return (
    <TouchableOpacity style={styles.gameColumn}  onPress={handleNavigation}>
      <View style={styles.gameIcon}>
      <Image source={imageSource} style={styles.gameImage} />
      </View>
      <Text style={styles.gameName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundTomato: {
    backgroundColor: 'tomato',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginTop:0,
    marginLeft:0,
    marginRight:0,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gameColumn: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: 140,
    height: 140,
  },
  gameIcon: {
    marginBottom: 10,
    backgroundColor:'lightgray',
    borderRadius:12,
    padding: 5,
  },

  gameImage: {
    width: 40,
    height: 40,
  },
  gameName: {
    fontSize: 16,
    textAlign: 'center',
  },
  spaceBetweenColumns: {
    width: 10, // You can adjust the space between columns here
  },
});

export default SelectZone;
