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
import EplScorers from "./EplScorers";
import EplStanding from "./EplStanding";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../modal/ModalContext";
const BottomTab = createBottomTabNavigator();

const Epl = () => {
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2022");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    closeModal();
    // Perform the necessary actions based on the selected year
    console.log(`Selected year: ${year}`);
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
        <BottomTab.Screen
          name="Standings"
          options={{ headerShown: false }}
        >
          {(props) => <EplStanding {...props} selectedYear={selectedYear} />}
        </BottomTab.Screen>
        <BottomTab.Screen
          name="Scorers"
          options={{ headerShown: false }}
        >
          {(props) => <EplScorers {...props} selectedYear={selectedYear} />}
        </BottomTab.Screen>
      </BottomTab.Navigator>
      <Modal visible={isModalOpen} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Season</Text>
          <View style={styles.buttonContainer}>
          
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleYearSelect("2020")}
            >
              <Text style={styles.buttonText}>19/20</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleYearSelect("2021")}
            >
              <Text style={styles.buttonText}>20/21</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleYearSelect("2022")}
            >
              <Text style={styles.buttonText}>21/22</Text>
            </TouchableOpacity>
          </View>
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
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "tomato",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
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

export default Epl;
