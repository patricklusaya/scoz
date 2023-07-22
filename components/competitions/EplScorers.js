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
import { fetchEplScorers } from "../../services/matchesServices";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalContext } from "../modal/ModalContext";
import { Images } from "./Images";
export default function EplScorers({ selectedYear }) {
  const [scorers, setScorers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);

  const navigation = useNavigation();
  const { openModal } = useContext(ModalContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openModal}>
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color="black"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedYear) {
      console.log("year is ", selectedYear);
      getTopScorers(selectedYear);
    }
  }, [selectedYear]);

  const getTopScorers = async (year) => {
    try {
      const data = await fetchEplScorers(year);
      setScorers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const openPlayerModal = async (player) => {
    setSelectedPlayer(player);
    setIsModalVisible(true);

 await fetchPlayerDetails(player.id);
  
  };

 

  const closePlayerModal = () => {
    setIsModalVisible(false);
  };

 const fetchPlayerDetails = async (playerId) => {
    try {
      const response = await fetch(
        `http://api.football-data.org/v4/persons/${playerId}`,
        {
          headers: {
            "X-Auth-Token": "ddadc918507c482b89eef25415c9f885",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPlayerDetails(data);
      console.log("my url", data.currentTeam.crest);
      console.log("my player data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomImage = () => {
    const imageKeys = Object.keys(Images);
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return Images[randomKey];
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => openPlayerModal(item.player)}
    >
      <Text style={styles.index}>{index + 1}</Text>
      <View style={styles.playerInfoContainer}>
        <Text style={styles.playerName}>{item.player.name}</Text>
        <Text style={styles.playerDetails}>
          {item.numberOfGoals} goals | {item.player.position} | {item.player.id}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={scorers}
        keyExtractor={(item) => item.player.id.toString()}
        renderItem={renderItem}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={closePlayerModal}
        >
          <Image source={getRandomImage()} style={styles.largeIcon} />
          <Text style={styles.playerDetails}>
            {playerDetails && playerDetails.shirtNumber}
          </Text>

          <View style={styles.modalContent}>
            {selectedPlayer && (
              <>
                <Text style={styles.playerName}>{selectedPlayer.name}</Text>

                <Text style={styles.goalsText}>
                  Goals:{selectedPlayer.numberOfGoals}
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
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  playerName: {
    fontSize: 26,
    fontWeight: "bold",
  },
  goals: {
    fontSize: 14,
  },
  position: {
    fontSize: 14,
  },
  teamName: {
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  index: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16,
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
    padding: 20,
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

