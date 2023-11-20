import React, { Component } from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl
} from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Tomorrow from "./Tomorrow";
import { fetchTodayMatches } from "../services/matchesServices";
import { SvgUri } from "react-native-svg";
import CustomLoader from "./loaders/CustomLoader";
import NetworkErrorCard from "./cards/NetworkErrorCard";
import NoMatchCard from "./cards/NoMatchCard";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
function Today({cardStyle, screenStyle}) {

//States initialization
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noMatchesPresent, setNoMatch] = useState(false);

  //constants initialization
  const { backgroundColor, color, iconColor } = screenStyle;
  const { cardBackgroundColor, cardColor, cardiconColor } = cardStyle
  const navigation = useNavigation();
  useEffect(() => {
    fetchMatches();
  }, []);

  //fetch today's matches from the service api
  const fetchMatches = async () => {
    try {
      const matchesData = await fetchTodayMatches();
      setMatches(matchesData);
      setIsLoading(false);
      setIsError(false)
      if (matchesData.length === 0) {
        setNoMatch(true)
  
        
      }
      else{
        setNoMatch(false)
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true)
    }
  };

  

  const navigateToMatchDetails = (match) => {
    navigation.navigate("Match Details", { matchId: match.id });
  };
  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await fetchMatches();
    } catch (error) {
      console.error(error);
    }

    setRefreshing(false);
  };
  const renderMatchItem = ({ item }) => {
    const competition = item.competition;
    const competitionName = competition.name;
    const competitionCrest = competition.area.ensignUrl;
    console.log(item);

    return (
      <View style={[styles.container, {backgroundColor:backgroundColor}]} >
      
          <TouchableOpacity onPress={() => navigateToMatchDetails(item)}>
            <View style={[styles.matchContainer]}>
              <View>
                <SvgUri
                  uri={competitionCrest}
                  height={20}
                  width={20}
                  style={styles.competitionCrest}
                />
                <Text style={[styles.competitionName, {color:color}]}>{competitionName}</Text>
                <Text style={[styles.matchText, {color:color}]}>
                  {item.homeTeam.name} vs {item.awayTeam.name}
                </Text>
                {item.status === "FINISHED" ? (
                  <Text style={[styles.statusText, {color:color}]}>FT</Text>
                ) : item.status === "SCHEDULED" ? (
                  <Text style={[styles.statusText, {color:color}]}>
                    {new Date(item.utcDate).toLocaleTimeString()}
                  </Text>
                ) : item.status === "IN_PLAY" ? (
                  <Text style={[styles.statusText, {color:color}]}>
                     <Text style={[styles.statusText, {color:color}]}>LIVE</Text>
                  </Text>
                ) :  item.status === "PAUSED" ? (
                  <Text style={[styles.statusText, {color:color}]}>
                     <Text style={[styles.statusText, {color:color}]}>HT</Text>
                  </Text>
                ) :
                 (
                  <Text style={[styles.statusText, {color:color}]}>{item.status}</Text>
                )}
              </View>
              {item.status === "FINISHED" && (
                <View style={styles.scoreContainer}>
                  <Text style={[styles.scoreText, {color:color}]}>
                    {item.score.fullTime.homeTeam} -{" "}
                    {item.score.fullTime.awayTeam}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
   
      </View>
    );
  };

  return (
  
    <ScrollView
    contentContainerStyle={[styles.container , {backgroundColor:backgroundColor }]}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
      {isLoading ? (
      <CustomLoader />
    ) : (
      <View>
        {isError ? (
         <NetworkErrorCard/>
        ) : (

          <View>
          {noMatchesPresent? (<NoMatchCard/>):(
    <FlatList
      data={
        matches
          ? matches.sort((a, b) =>
              a.competition.name.localeCompare(b.competition.name)
            )
          : []
      }
      renderItem={renderMatchItem}
      keyExtractor={(item) => item.id.toString()}
    />
    )}
    </View>

    )}
    </View>
    )}
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  matchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  competitionCrest: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  competitionName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  matchText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusText: {
    marginBottom: 4,
  },
  scoreText: {
    fontWeight: "bold",
    color: "tomato",
  },
  scoreContainer: {
    borderRadius: 6,
    padding: 5,
  },
});

export default Today;
