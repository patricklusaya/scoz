import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NoMatchCard() {
  const navigation = useNavigation();
  const currentDate = new Date().toLocaleDateString();

  navigateToOtherScreen = () =>{
    navigation.navigate('Other')
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="calendar-outline" size={24} color="black" style={styles.icon} />
        <Text style={styles.dateText}>{currentDate}</Text>
        <Text style={styles.noMatchText}>No Matches Today </Text>
        <TouchableOpacity onPress={navigateToOtherScreen} style={styles.arrowContainer}>
        <Ionicons name="arrow-forward-outline" size={24}  style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop:'50%',
    width: 240,
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  noMatchText: {
    fontSize: 13,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    top: 8,
    right: 8,
    color:'tomato',
    // transform: [{ rotate: '180deg' }]
  },
});
