import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function PopularLeague({popularLeagueCardStyle}) {
  //constants initialization
    const navigation = useNavigation();
    const { cardBackgroundColor, cardColor  } = popularLeagueCardStyle;

       
   // Navigate to the Epl component
    const handleEplData = () => {
      console.log("Pressed");
      navigation.navigate('Epl')
    };

       // Navigate to the Laliga component
    const handleLaligaData = () => {
      console.log("Pressed");
      navigation.navigate('Laliga')
   
  
    };

      // Navigate to the serie a component
    const handleserieaData = () => {
      console.log("Pressed");
      navigation.navigate('Serie A')
    };

  return (
    <View style={[styles.container]}>
    <View style={[styles.leaguecard ,  {backgroundColor: cardBackgroundColor}]}>
    <View style={styles.titleContainer}>
<Text style={[styles.cardtitle, {color:cardColor}]}>Popular Leagues</Text>
</View>
      <View style={styles.viewerContainer}>
        <View style={styles.viewer}>
        <TouchableOpacity onPress={handleEplData}>
          <Image
            source={require("../../assets/images/pl3.jpg")}
            style={styles.image}
          />
           </TouchableOpacity>
          
        </View>
        <View style={styles.viewer}>
        <TouchableOpacity onPress={handleLaligaData}>
          <Image
            source={require("../../assets/images/laliga.jpg")}
            style={styles.image}
          />
           </TouchableOpacity>
        
        </View>
        <TouchableOpacity onPress={handleserieaData}>
        <View style={styles.viewer}>
            
          <Image
            source={require("../../assets/images/seriea2.png")}
            style={styles.image}
          />
        
        </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0,
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 190,
    },
    card: {
      width: 200,
      height: 120,
      padding: 16,
      marginTop: 20,
      marginLeft: 10,
      borderRadius: 8,
      backgroundColor: "tomato",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      flexDirection: "column",
      alignItems: "center",
      marginRight: 16,
    },
    image: {
      width: 60,
      height: 60,
      marginBottom: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    leaguecard: {
      width: "90%",
      height:160,
      borderRadius: 10,
      backgroundColor: "white",
      // shadowColor: "tomato",
      // shadowOffset: { width: 0, height: 9 },
      // shadowOpacity: 0.3,
      // shadowRadius: 4,
      elevation: 14,
      padding: 20,
    },
    viewerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    viewer: {
      alignItems: "center",
      marginBottom: 0,
      paddingBottom:50
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
    },
    titleContainer: {
      alignItems: "center",
      marginBottom: 10,
    },
    cardtitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  