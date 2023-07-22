import React, { useEffect, useState } from 'react';

import { View, Text , Image, ScrollView, TouchableOpacity} from 'react-native';
import { fetchTopAssistProvidersAcrossLeagues } from '../services/matchesServices';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

export default function EuropeTopAssistsProviders() {
  const navigation = useNavigation();
  const [assistProviders, setAssistProviders] = useState([]);
 

  useEffect(() => {
    const fetchAssistProviders = async () => {
      const competitionIds = [2014, 2019, 2002, 2015, 2021];
      const promises = competitionIds.map((competitionId) => fetchTopAssistProvidersAcrossLeagues(competitionId));
      const results = await Promise.all(promises);

      // Combine the results from different competitions
      const combinedAssistProviders = results.flat();

      // Sort the combined assist providers by number of assists in descending order
      const sortedAssistProviders = combinedAssistProviders.sort((a, b) => b.assists - a.assists);

      // Take the top 20 assist providers
      const top20AssistProviders = sortedAssistProviders.slice(0, 80);
console.log(top20AssistProviders);
      setAssistProviders(top20AssistProviders);
    };

    fetchAssistProviders();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.topAssistProvidersList}>
    <Text style={styles.title}>Assist Ranking Among Europe Top Scorers</Text>
    {assistProviders.map((provider, index) => (
      <View key={index} style={styles.providerItem}>
        <Text style={styles.providerRank}>{index + 1}.</Text>
        <View style={styles.providerDetails}>
        {provider.team.crest.endsWith('.svg') ? (
           
    <SvgUri uri={provider.team.crest} width={15} height={15}  />
  ) : (
    <Image source={{ uri: provider.team.crest }} style={styles.teamCrest} />
  )}
          <Text style={styles.providerName}>{provider.player.name} -</Text>
          <Text style={styles.providerAssists}>{provider.assists} assists</Text>
        </View>
      </View>
    ))}
  </ScrollView>
  );
  
}

const styles = {
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topAssistProvidersList: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  providerItem: {
    padding: 10,
    marginTop: 3,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "column",
    alignItems: "center",
    marginRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:0.6,
        borderBottomColor:'tomato',
        marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  providerRank: {
    marginRight: 10,
  },
  providerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamCrest: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  providerName: {
    marginRight: 5,
  },
 
};
