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
  RefreshControl,
  Image,
} from "react-native";

import {
  fetchPlayerDetails,
 
} from "../../../services/matchesServices";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalContext } from "../../modal/ModalContext";
import CustomLoader from "../../loaders/CustomLoader";
import PlayerInfoModal from "../../modal/PlayerInfoModal";
import NetworkErrorCard from "../../cards/NetworkErrorCard";
import { fetchLigue1Scorers } from "./Ligue1Services";


export default function Ligue1Scorers({
  selectedScorerYear,
  selectedSeason,
}) {

  // initialize states
  const [scorers, setScorers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  //   initialize constants
  const navigation = useNavigation();
  const { openModal } = useContext(ModalContext);

  //Layout of the header select right icon

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
    if (selectedScorerYear) {
      // Format: "2000"
      getTopScorers(selectedScorerYear);
    }
  }, [selectedScorerYear]);

  //Get league top scorers from the service function
  const getTopScorers = async (year) => {
    try {
      const data = await fetchLigue1Scorers(year);
      setScorers(data);
      setIsError(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setScorers([]);
      setIsError(true);
      setIsLoading(false);
    }
  };

  //Handle screen refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getTopScorers(selectedScorerYear);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };


  //Handle Opening of the Player info modal
  const openPlayerModal = async (player) => {
    setSelectedPlayer(player);
    setIsModalVisible(true);
    // await fetchPlayerDetails(player.id);
    await getPlayerInfo(player.id);
  };

  //Handle Closing of the Player info modal
  const closePlayerModal = () => {
    setIsModalVisible(false);
  };

  //Get player info tobe displayed onthe modal
  const getPlayerInfo = async (playerId) => {
    try {
      const data = await fetchPlayerDetails(playerId);
      setPlayerDetails(data);
      console.log("my player data", data);
    } catch (error) {
      console.log(error);
    }
  };

  //Render a single player item
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => openPlayerModal(item.player)}
    >
      <Text style={styles.index}>{index + 1}</Text>
      <View style={styles.playerInfoContainer}>
        <Text style={styles.playerName}>{item.player.name}</Text>
        <Text style={styles.playerDetails}>{item.numberOfGoals} goals</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View>
          {isError ? (
            <NetworkErrorCard />
          ) : (
            <View>
              {isLoading ? (
                <CustomLoader />
              ) : (
                <View>
                  <Text style={styles.headerStyle}>
                    {selectedSeason} Scorers
                  </Text>
                  <FlatList
                    data={scorers}
                    keyExtractor={(item) => item.player.id.toString()}
                    renderItem={renderItem}
                  />
                </View>
              )}
            </View>
          )}
        </View>
        {/* //Render Info of a specific player */}
        <PlayerInfoModal
          isModalVisible={isModalVisible}
          closeModal={closePlayerModal}
          selectedPlayer={selectedPlayer}
          playerDetails={playerDetails}
        />
      </View>
    </ScrollView>
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
  headerStyle: {
    textAlign: "center",
    marginTop: 20,
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
  errorCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  errorIcon: {
    marginRight: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
