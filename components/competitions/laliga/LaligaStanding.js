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
import { ModalContext } from '../../modal/ModalContext';

import { useNavigation } from '@react-navigation/native';
import jsonData from '../../../data/EplData.json';
export default  LaligaStanding = ({ selectedYear }) => {
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
        const filteredStandings = jsonData.filter((standing) => standing.Season === selectedYear);
        setStandings(filteredStandings);
      }, [selectedYear]);
    
      return (
        <View style={styles.container}>
           <View style={styles.header}>
            <Text> {selectedYear} Standing</Text>
           </View>
          <ScrollView>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 0.5 }]}>No.</Text>
                <Text style={[styles.headerCell, { flex: 2 }]}>Team</Text>
                <Text style={[styles.headerCell, { flex: 0.5 }]}>P</Text>
                <Text style={[styles.headerCell, { flex: 0.5 }]}>W</Text>
                <Text style={[styles.headerCell, { flex: 0.5 }]}>D</Text>
                <Text style={[styles.headerCell, { flex: 0.5 }]}>L</Text>
                <Text style={[styles.headerCell, { flex: 0.5 }]}>Points</Text>
              </View>
              {standings.length > 0 ? (
                standings.map((standing, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.cell, { flex: 0.5 }]}>{standing.Pos}</Text>
                    <Text style={[styles.cell, { flex: 2 }]} numberOfLines={1}>{standing.Team}</Text>
                    <Text style={[styles.cell, { flex: 0.5 }]}>{standing.Pld}</Text>
                    <Text style={[styles.cell, { flex: 0.5 }]}>{standing.W}</Text>
                    <Text style={[styles.cell, { flex: 0.5 }]}>{standing.D}</Text>
                    <Text style={[styles.cell, { flex: 0.5 }]}>{standing.L}</Text>
                    <Text style={[styles.cell, { flex: 0.5 }]}>{standing.Pts}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.message}>No standings available for the selected year</Text>
              )}
            </View>
          </ScrollView>
        </View>
      );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  message: {
    marginLeft: 80,
    padding: 16,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    textAlign: 'center',
  },
  header:{
    alignItems:'center',
    marginBottom:10
  }
});


