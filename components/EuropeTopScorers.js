import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { fetchTopScorersAcrossLeagues } from "./competitions/efl/EflServices";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalContext } from "./modal/ModalContext";
import CustomLoader from "./loaders/CustomLoader";

const EuropeTopScorers = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2022-23");
  // const [selectedSeason, setSelectedSeason] = useState("2022");
  const [selectedScorerYear, setSelectedScorerYear] = useState("2022");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    // setSelectedSeason(year);
    setSelectedScorerYear(year)
    setIsLoading(true);
    console.log(`Selected year: ${year}`);

    if (year.length === 7) {
      const selectedYearValue = parseInt(year.split("-")[0]);
      const selectedScorerYear = selectedYearValue.toString();
      setSelectedScorerYear(selectedScorerYear);
      // setSelectedSeason(selectedScorerYear);
      console.log(`Selected season year: ${selectedScorerYear}`);
    } else {
      // Reset the selectedScorerYear if the format is not "yyyy-yy"
      console.log('shit happened');
      setSelectedScorerYear("");
    }

    closeModal();
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openModal}>
          <Ionicons
            name="ellipsis-vertical-circle"
            size={24}
            color="black"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // const year = "2022"; // Specify the year you want to fetch the top scorers for
    fetchTopScorersAcrossLeagues(selectedScorerYear)
      .then((data) => {
        console.log('Top scorers', data);
        setTopScorers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [selectedScorerYear]);

  //Handling the display of buttons from 2000 to 2021
  const startYear = 2021;
  const endYear = 2022;
  const seasons = [];
  for (let year = endYear; year >= startYear; year--) {
    const season = `${year}-${(year + 1).toString().slice(2)}`;
    seasons.push(season);
  }

  //Handle Arrangement of Modal's button and Year selecting
  const createButtonRow = (start, end) => {
    const buttonRow = [];
    for (let i = start; i <= end; i++) {
      const season = seasons[i];
      const year = parseInt(season.split("-")[0]);
      buttonRow.push(
        <View style={styles.buttonContainer} key={season}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleYearSelect(season, year)}
          >
            <Text style={styles.buttonText}>{season}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return buttonRow;
  };

  const buttonRows = [];
  const totalSeasons = seasons.length;
  const numColumns = 3;
  let startIndex = 0;
  let endIndex = numColumns - 1;
  while (endIndex < totalSeasons) {
    buttonRows.push(createButtonRow(startIndex, endIndex));
    startIndex += numColumns;
    endIndex += numColumns;
  }
  if (startIndex < totalSeasons) {
    buttonRows.push(createButtonRow(startIndex, totalSeasons - 1));
  }

  const renderTopScorers = () => {
    if (isLoading) {
      return <CustomLoader/>;
    } else if (Array.isArray(topScorers) && topScorers.length > 0) {
      return (
        <ScrollView>
            <Text style={styles.headerText}>{selectedYear} Europe Top Scorers</Text>
          {topScorers.map((scorer, index) => (
            <TouchableOpacity style={styles.itemContainer}>
            
              <View key={index} style={styles.scorerItem}>
                <Text style={styles.index}>{index + 1}.</Text>
                <View style={styles.playerInfoContainer}>
                  <Text style={styles.playerName}>{scorer.player.name}</Text>
                  <Text style={styles.playerDetails}>
                    {scorer.numberOfGoals} goals
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return <Text>No top scorers found.</Text>;
    }
  };

  return (
    <View style={styles.container}>
     
      {renderTopScorers()}
      <ModalContext.Provider value={{ openModal }}>
        <Modal visible={isModalOpen} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Season</Text>
            {buttonRows.map((row, index) => (
              <View style={styles.buttonRow} key={index}>
                {row}
              </View>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ModalContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  headerText:{
      textAlign:'center'

  },
  topScorersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  topScorersList: {
    flexGrow: 1,
    alignItems: "center",
  },
  scorerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  scorerRank: {
    marginRight: 8,
    fontWeight: "bold",
  },
  scorerDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  scorerName: {
    marginRight: 8,
    fontWeight: "bold",
  },
  scorerGoals: {
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "tomato",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
});

export default EuropeTopScorers;
