import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import LaligaStanding from "./LaligaStanding";
import LaligaScorers from "./LaligaScorers";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { ModalContext } from "../../modal/ModalContext";
const BottomTab = createBottomTabNavigator();

export default Laliga = () => {
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2000-01");
  const [selectedScorerYear, setSelectedScorerYear] = useState("2022");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleYearSelect = (year) => {
  //   setSelectedYear(year);
  //   closeModal();
  //   // Perform the necessary actions based on the selected year
  //   console.log(`Selected year: ${year}`);
  // };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    console.log(`Selected year: ${year}`);
  
    if (year.length === 7) {
      const selectedYearValue = parseInt(year.split("-")[0]);
      const selectedScorerYear = selectedYearValue.toString();
      setSelectedScorerYear(selectedScorerYear);
      console.log(`Selected Scorer year: ${selectedScorerYear}`);
    } else {
      setSelectedScorerYear(""); // Reset the selectedScorerYear if the format is not "yyyy-yy"
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
  //Handling the display of buttons from 2000 to 2021
 const startYear = 2000;
const endYear = 2022;

const seasons = [];
for (let year = endYear; year >= startYear; year--) {
  const season = `${year}-${(year + 1).toString().slice(2)}`;
  seasons.push(season);
}

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

return (
  <ModalContext.Provider value={{ openModal }}>
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Standings") {
            iconName = focused ? "ios-stats-chart" : "stats-chart-outline";
          } else if (route.name === "Scorers") {
            iconName = focused ? "ios-football" : "ios-football-outline";
          }

          return <Ionicons name={iconName} size={20} color="tomato" />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
    >
      <BottomTab.Screen name="Standings" options={{ headerShown: false }}>
        {(props) => <LaligaStanding {...props} selectedYear={selectedYear} />}
      </BottomTab.Screen>
      <BottomTab.Screen name="Scorers" options={{ headerShown: false }}>
        {(props) => (
          <LaligaScorers
            {...props}
            
            selectedScorerYear={selectedScorerYear}
          />
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
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
);

};
const styles = StyleSheet.create({
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
});
