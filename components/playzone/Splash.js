import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
const Splash = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;
  const navigation = useNavigation();

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
  };

  const handleStart = () => {
    // Add any action you want to perform when the start button is pressed
  navigation.navigate('Sign Up')
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="tomato"
            style={{ marginLeft: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <FlatList
        data={imagesData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.floor(offsetX / windowWidth);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: windowWidth }]}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {activeIndex === imagesData.length - 1 && (
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      )}

      <View style={styles.navigationDots}>
        {imagesData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
   startButton: {
    backgroundColor: 'tomato',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom:20,
    alignSelf: 'stretch', // Set the button to stretch across the screen width
    marginHorizontal: 20, // Add some margin on both sides
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  navigationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'tomato',
  },
});



// Replace this with your actual images and descriptions
const imagesData = [
  {
    id: 1,
    image: require('../../assets/images/splash/img1.png'),
    description: ' Engage in our interactive quizzes  related to matches, players, events, and more. Earn rewards and virtual coins for every correct answer!',
  },
  {
    id: 2,
    image: require('../../assets/images/splash/cover2.png'),
    description: 'Predict match outcomes, goal scorers, and player performances to earn points and climb up the leaderboard. Prove your sports expertise and win big',
  },
  {
    id: 3,
    image: require('../../assets/images/splash/img3.png'),
    description: 'Rise through the ranks as you accumulate points, rewards, and virtual coins. The higher you climb, the bigger the cash prizes',
  },
];

export default Splash;
