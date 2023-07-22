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
import DropDownPicker from "react-native-dropdown-picker";
import { ModalContext } from "./ModalContext";

export default function LeagueFixtureModal({
  isModalOpen,
  closeModal,
  text,
  leagueId,
}) {
  const [leagueStats, setLeagueStats] = useState(null);
  const [fixtures, setFixtures] = useState([]);
  const [matchday, setMatchday] = useState(["1"]);
  const [isSelectorModalOpen, setIsSelectorModalOpen] = useState(false);
  const [selectedMatchday, setSelectedMatchday] = useState(null);

  const handleOpenModal = () => {
    setIsSelectorModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSelectorModalOpen(false);
  };

  const handleMatchdaySelect = (matchday) => {
    setMatchday(matchday);
    handleCloseModal();
  };

  useEffect(() => {
    fetchLeagueStats(leagueId);
  }, [leagueId]);

  const fetchLeagueStats = async (leagueId) => {
    console.log("my id", leagueId);
    try {
      const response = await fetch(
        `https://api.football-data.org/v2/competitions/${leagueId}/teams?season=2023`,
        {
          headers: {
            "X-Auth-Token": "ddadc918507c482b89eef25415c9f885",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setLeagueStats(data);
      console.log("League data", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch the fixtures based on the leagueId and matchday
    fetchFixtures(leagueId, matchday);
  }, [leagueId, matchday]);

  const fetchFixtures = async (leagueId, matchday) => {
    try {
      const response = await fetch(
        `https://api.football-data.org/v4/competitions/${leagueId}/matches?matchday=${matchday}`,
        {
          headers: {
            "X-Auth-Token": "ddadc918507c482b89eef25415c9f885",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFixtures(data.matches);
      console.log("Fixtures", data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLeagueCoverImage = (leagueId) => {
    switch (leagueId) {
      case "PL":
        return require("../../assets/images/plcover2.jpg");
      //   case 'BL1':
      //     return require('../../assets/images/league-bl1.jpg');
      case "SA":
        return require("../../assets/images/serieacover3.jpg");
      case "PD":
        return require("../../assets/images/laligacover4.webp");
      //   case 'FL1':
      //     return require('../../assets/images/league-fl1.jpg');
      default:
        return null;
    }
  };
  const coverImage = getLeagueCoverImage(leagueId);

  const renderMatchdayOptions = () => {
    const matchdays = Array.from({ length: 38 }, (_, index) => index + 1);
  
    return (
      <ScrollView
        contentContainerStyle={styles.matchdayOptionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {matchdays.map((matchday) => (
          <TouchableOpacity
            style={styles.matchdayOption}
            key={matchday}
            onPress={() => handleMatchdaySelect(matchday)}
          >
            <Text style={styles.matchdayOptionText}>Matchday {matchday}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <Modal visible={isModalOpen} animationType="slide" transparent>
      <View style={styles.topCover}>
        <Image source={coverImage} style={styles.largeIcon} />
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPressOut={closeModal}
        >
          <Ionicons name="close-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.modalContent}>
        <View style={styles.leagueTitleContainer}>
          <Text style={styles.leagueTitle}>{text}</Text>
        </View>
        <View style={styles.leagueStatsContainer}>
          <View style={styles.leagueStatItem}>
            <Ionicons name="people-outline" size={24} color="tomato" />
            <Text style={styles.leagueStatLabel}>Teams</Text>
            <Text style={styles.leagueStatValue}>
              {leagueStats?.count || "-"}
            </Text>
          </View>
          <View style={styles.leagueStatItem}>
            <Ionicons name="calendar-outline" size={24} color="tomato" />
            <Text style={styles.leagueStatLabel}>Commence</Text>
            <Text style={styles.leagueStatValue}>
              {leagueStats?.season?.startDate
                ? new Date(leagueStats.season.startDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "-"}
            </Text>
          </View>
          <View style={styles.leagueStatItem}>
            <Ionicons name="hand-right-outline" size={24} color="tomato" />
            <Text style={styles.leagueStatLabel}>End</Text>
            <Text style={styles.leagueStatValue}>
              {leagueStats?.season?.startDate
                ? new Date(leagueStats.season.endDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "-"}
            </Text>
          </View>
        </View>
        <View style={styles.matchDays}>
          <View style={styles.matchDayHeader}>
            <Text style={styles.matchDayTitle}>
              Matchday {matchday} Fixtures
            </Text>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleOpenModal}
            >
              <Ionicons
                name="ellipsis-vertical-circle-outline"
                size={24}
                color="tomato"
              />
            </TouchableOpacity>
      
            <Modal
              visible={isSelectorModalOpen}
              animationType="fade"
              transparent
              style={styles.selectorModal}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={handleCloseModal}
              >
                <View style={styles.modalContent}>
                  {renderMatchdayOptions()}
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
          <ScrollView>
            {fixtures &&
              fixtures.map((fixture) => (
                <View style={styles.fixtureContainer} key={fixture.id}>
                  <Text style={styles.fixtureDate}>
                    {new Date(fixture.utcDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                  <View style={styles.fixture}>
                    <Image
                      source={{ uri: fixture.homeTeam.crest }}
                      style={styles.teamCrest}
                    />
                    <Text style={styles.fixtureTeam}>
                      {fixture.homeTeam.shortName}
                    </Text>
                    <Text style={styles.vsText}>Vs</Text>
                    <Text style={styles.fixtureTeam}>
                      {fixture.awayTeam.shortName}
                    </Text>
                    <Image
                      source={{ uri: fixture.awayTeam.crest }}
                      style={styles.teamCrest}
                    />
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
  sampleText: {
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  closeIconContainer: {
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 4,
  },
  leagueTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 15,
  },
  leagueTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "100%",
  },
  leagueStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  leagueStatItem: {
    flex: 1,
    alignItems: "center",
  },
  leagueStatLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  leagueStatValue: {
    fontSize: 16,
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  //   topCover: {
  //     width: '100%',
  //     height: '30%', // Adjust the height of the top section as needed
  //   },
  largeIcon: {
    width: 400,
    height: 230,
    resizeMode: "cover",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    zIndex: 10, // Higher value to be behind the selectorModal
  },

  teamCrest: {
    width: 20,
    height: 20,
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
  matchDays: {
    marginTop: 20,
  },
  matchDayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  matchDayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  iconContainer: {
    padding: 5,
    borderRadius: 20,
    // backgroundColor: '#ccc',
  },
  fixtureContainer: {
    marginBottom: 10,
  },
  fixtureDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  fixture: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  fixtureTeam: {
    fontSize: 14,
  },
  fixtureScore: {
    fontSize: 16,
    fontWeight: "bold",
  },
  matchdayOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
   alignItems:"center"
  },
  matchdayOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
