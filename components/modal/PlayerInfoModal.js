import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalContext } from "./ModalContext"; 
import { Images } from "../competitions/Images";

export default function PlayerInfoModal({ isModalVisible, closeModal, selectedPlayer, playerDetails }) {
  const getRandomImage = () => {
    const imageKeys = Object.keys(Images);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return Images[randomKey];
  };

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPressOut={closeModal}
      >
        <Image source={getRandomImage()} style={styles.largeIcon} />
        <Text style={styles.playerDetails}>
          {playerDetails && playerDetails.shirtNumber}
        </Text>
     
        <View style={styles.modalContent}>
        <View style={styles.modalTopper}>
<Text style= {styles.sampleText}>sample text</Text>
            </View>
         
          {selectedPlayer && (
            <>
              <Text style={styles.playerName}>{selectedPlayer.name}</Text>

              <Text style={styles.goalsText}>
                Goals: {selectedPlayer.numberOfGoals}
              </Text>

              <Text style={styles.playerDetails}>
                Position: {selectedPlayer.position}
              </Text>
              {playerDetails && (
                <>
                  <Text style={styles.playerDetails}>
                    Nationality: {playerDetails.nationality}
                  </Text>
                  <Text style={styles.playerDetails}>
                    Team: {playerDetails.currentTeam.name}
                  </Text>
                  <Text style={styles.playerDetails}>
                    Jersey No: {playerDetails.shirtNumber}
                  </Text>
                  {/* <Text style={styles.playerDetails}>
                    Age: {playerDetails.age}
                  </Text> */}
                  <Text style={styles.playerDetails}>
                    Contract End: {playerDetails.currentTeam.contract.until}
                  </Text>
                  <Image
                    source={{ uri: playerDetails.currentTeam.crest }}
                    style={styles.teamCrest}
                  />
                  {/* Add more player details as needed */}
                </>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
    container: {},
    sampleText:{
        textAlign:'center',
       
    },
   modalTopper:{
    marginTop:0,
    height:12,
    width:100,
    backgroundColor:'black',
    borderRadius: 9
   },
   
    playerInfoContainer: {
      flex: 1,
      marginLeft: 16,
    },
    playerName: {
      fontSize: 14,
      fontWeight: "bold",
    },
    playerDetails: {
      fontSize: 12,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "black",
    },
    modalContent: {
      backgroundColor: "white",
      width: "100%",
      height: "60%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 0,
      alignItems: "center",
    },
    largeIcon: {
      width: 190,
      height: 190,
      marginBottom: 50,
    },
    teamCrest: {
      width: 190,
      height: 190,
      marginBottom: 50,
    },
    shirtNumber: {
      color: "white",
    },
    cardContainer: {
      backgroundColor: "tomato",
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    goalsText: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },

  });