import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchTopCleanSheetTeams } from '../services/CleanSheetService';


const TopCleanSheets = () => {
  const [topTeams, setTopTeams] = useState([]);

  useEffect(() => {
    fetchTopCleanSheetTeams()
      .then((topTeams) => {
        setTopTeams(topTeams);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Clean Sheet Teams</Text>
      <View style={styles.teamList}>
        {topTeams.map((team) => (
          <View key={team.teamId} style={styles.teamItem}>
            <Text>{team.rank}</Text>
            <Image source={{ uri: team.crestUrl }} style={styles.teamLogo} />
            <Text>{team.name}</Text>
            <Text>{team.cleanSheets}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  teamList: {
    marginTop: 8,
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
});

export default TopCleanSheets;
