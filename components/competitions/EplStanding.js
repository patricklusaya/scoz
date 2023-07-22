import React, { useEffect, useState , useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
import { ModalContext } from '../modal/ModalContext';
import { fetchEplStandings, fetchStandings } from '../../services/matchesServices';
import { useNavigation } from '@react-navigation/native';
const EplStanding = ({ selectedYear }) => {
  const navigation = useNavigation();
  const { openModal } = useContext(ModalContext);
    const [standings, setStandings] = useState([]);

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={openModal}>
            <Ionicons name="ellipsis-vertical-circle" size={24} color="black" style={{ marginRight: 16 }} />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);
  
    useEffect(() => {
      const fetchStandingsData = async () => {
        try {
          const data = await fetchEplStandings();
          setStandings(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchStandingsData();
    }, []);

    useEffect( () =>{
      if (selectedYear) {
        fetchStandingsData(selectedYear)   
      }
  
    },

   [selectedYear] );

   const fetchStandingsData = async (year) => {
    try {
      const data = await fetchEplStandings(year);
      setStandings(data);
    } catch (error) {
      console.error(error);
    }
  };
  
    return (
      <View style={styles.container}>
     
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>No.</Text>
            <Text style={styles.headerCell}>Team</Text>
            <Text style={styles.headerCell}>P</Text>
            <Text style={styles.headerCell}>W</Text>
            <Text style={styles.headerCell}>D</Text>
            <Text style={styles.headerCell}>L</Text>
            <Text style={styles.headerCell}>Points</Text>
          </View>
          {standings && standings.length > 0 ? (
            standings.map((team) => (
              <View key={team.team.id} style={styles.tableRow}>
                <Text style={styles.cell}>{team.position}</Text>
                <Text style={styles.cell}>{team.team.name}</Text>
                <Text style={styles.cell}>{team.playedGames}</Text>
                <Text style={styles.cell}>{team.won}</Text>
                <Text style={styles.cell}>{team.draw}</Text>
                <Text style={styles.cell}>{team.lost}</Text>
                <Text style={styles.cell}>{team.points}</Text>
              </View>
            ))
          ) : (
            <Text style= {styles.message}>No standings available</Text>
          )}
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    message:{
    marginLeft:80,
      padding: 16,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    table: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    cell: {
      flex: 1,
    },
  });
export default EplStanding;