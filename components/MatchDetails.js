import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { fetchMatchDetails } from '../services/matchesServices';

export const MatchDetails = ({ route }) => {
  const { matchId } = route.params;
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetchMatchDetails(matchId);
        setMatchDetails(response);
      } catch (error) {
        console.log('Error fetching match details:', error);
      }
    };

    fetchMatchData();
  }, [matchId]);

  if (!matchDetails) {
    return <ActivityIndicator style={styles.loading} />;
  }

  // Extract the required data from matchDetails object
  const { match, head2head } = matchDetails;

  // Format the UTC date to display time in the user's time zone
  const utcDate = new Date(match.utcDate);
  const localTime = utcDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: match.competition.area.ensignUrl }} style={styles.competitionLogo} />
        <Text style={styles.competitionName}>{match.competition.name}</Text>
      </View>
      <Text style={styles.matchDay}>Matchday {match.matchday}</Text>
      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>{match.homeTeam.name}</Text>
        </View>
        <Text style={styles.vs}>vs</Text>
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>{match.awayTeam.name}</Text>
        </View>
      </View>
     

<View style={styles.headToHeadContainer}>
  <Text style={styles.headToHeadTitle}>Last {head2head.numberOfMatches} Matches</Text>
  <View style={styles.headToHeadStatsContainer}>
    <View style={styles.statContainer}>
      <Text style={styles.statLabel}>Draws</Text>
      <View style={styles.statValuesContainer}>
        <Text style={styles.statValueLeft}>{head2head.homeTeam.draws}</Text>
        <Text style={styles.statValueRight}>{head2head.awayTeam.draws}</Text>
      </View>
    </View>

  </View>
  <View style={styles.headToHeadStatsContainer}>
    <View style={styles.statContainer}>
      <Text style={styles.statLabel}>Wins</Text>
      <View style={styles.statValuesContainer}>
        <Text style={styles.statValueLeft}>{head2head.homeTeam.wins}</Text>
        <Text style={styles.statValueRight}>{head2head.awayTeam.wins}</Text>
      </View>
    </View>
   
  </View>
  <View style={styles.headToHeadStatsContainer}>
    <View style={styles.statContainer}>
      <Text style={styles.statLabel}>Losses</Text>
      <View style={styles.statValuesContainer}>
        <Text style={styles.statValueLeft}>{head2head.homeTeam.losses}</Text>
        <Text style={styles.statValueRight}>{head2head.awayTeam.losses}</Text>
      </View>
    </View>
   
  </View>
</View>


<View style={styles.scoresContainer}>
  {match.score.fullTime.homeTeam && match.score.fullTime.awayTeam && (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTitle}>Full Time</Text>
      <Text style={styles.scoreValue}>
        {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
      </Text>
    </View>
  )}
  {match.score.halfTime.homeTeam && match.score.halfTime.awayTeam && (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTitle}>Half Time</Text>
      <Text style={styles.scoreValue}>
        {match.score.halfTime.homeTeam} - {match.score.halfTime.awayTeam}
      </Text>
    </View>
  )}
  {match.score.extraTime.homeTeam && match.score.extraTime.awayTeam && (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTitle}>Extra Time</Text>
      <Text style={styles.scoreValue}>
        {match.score.extraTime.homeTeam} - {match.score.extraTime.awayTeam}
      </Text>
    </View>
  )}
</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  competitionLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  competitionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchDay: {
    fontSize: 16,
    marginBottom: 10,
    textAlign:'center'
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  teamContainer: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vs: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headToHeadContainer: {
    marginBottom: 20,
  },
  headToHeadTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center'
  },
  headToHeadStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statContainer: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
   
  },
  statValuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statValueLeft: {
    fontSize: 14,
    textAlign: 'left',
    width: '50%',
    
  },
  statValueRight: {
    fontSize: 14,
    textAlign: 'right',

    width: '50%',
  },
  scoresContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  scoreValue: {
    fontSize: 16,
  },
});