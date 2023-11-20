import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList , TouchableOpacity, Image } from 'react-native';
import { fetchMatchesByDate } from '../services/matchesServices';
import { useState, useEffect } from "react";
import CustomLoader from './loaders/CustomLoader';
import { RefreshControl } from 'react-native';
import NoMatchCard from './cards/NoMatchCard';
import { SvgUri } from "react-native-svg";
import NetworkErrorCard from './cards/NetworkErrorCard';
export default function Tomorrow({screenStyle, cardStyle}) {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noMatchesPresent, setNoMatch] = useState(false);

    //constants initialization
    const { backgroundColor, color, iconColor } = screenStyle;
    const { cardBackgroundColor, cardColor, cardiconColor } = cardStyle
    console.log(backgroundColor);

  useEffect(() => {
    fetchTomorrowMatches();
  }, []);

  const fetchTomorrowMatches = async () => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const matchesData = await fetchMatchesByDate(tomorrow);
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

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await fetchTomorrowMatches();
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
            <View style={[styles.matchContainer, {backgroundColor:backgroundColor }]}>
              <View>
                
                {/* <SvgUri
                  uri={competitionCrest}
                  height={20}
                  width={20}
                  style={styles.competitionCrest}
                />
                <Text style={[styles.competitionName, {color:color}]}>{competitionName}</Text> */}
                 <View style={styles.gameContainer}>
      <View style={styles.imageContainer}>
        <SvgUri
          uri={competitionCrest}
          height={20}
          width={20}
          style={styles.circularImage}
        />
      </View>
      <Text style={styles.competitionName}>{competitionName}</Text>
    </View>
    <View style={styles.matchDetails}>
                <Text style={[styles.matchText, {color:color}]}>
                  {item.homeTeam.name} vs {item.awayTeam.name}
                </Text>
                {item.status === "FINISHED" ? (
                  <Text style={[styles.statusText, {color:color}]}>FT</Text>
                ) : item.status === "SCHEDULED" ? (
                  <Text style={[styles.statusText, {color:color}]}>
                    {new Date(item.utcDate).toLocaleTimeString()}
                  </Text>
                ) : (
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  imageContainer: {
  
    overflow: 'hidden', // Clip the image to the circular shape
    marginRight: 5, // Add some spacing between the image and the competition name
  
    
  
   
  },
 
  competitionName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  matchText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusText: {
    marginBottom: 4,
  },
  scoreText: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  scoreContainer: {
    borderRadius: 6,
    padding: 5,
  },
  matchDetails:{
    marginLeft:25
  }
});



