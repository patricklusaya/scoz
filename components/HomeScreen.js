import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



import Today from './Today';
import Tomorrow from './Tomorrow';

// const Tab = createMaterialTopTabNavigator();
const Tab = createMaterialTopTabNavigator();


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      isLoading: true,
    };
    this.navigateToMatchDetails = this.navigateToMatchDetails.bind(this);
  }

  componentDidMount() {
    this.fetchMatches();
  }

  fetchMatches = async () => {
    try {
      const matches = await fetchTodayMatches();
      this.setState({
        matches,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };
  navigateToMatchDetails(match) {
    this.props.navigation.navigate('MatchDetails', { match });
  }

  renderMatchItem = ({ item }) => (

    <TouchableOpacity onPress={() => this.navigateToMatchDetails(item)}>
      <View style={styles.matchContainer}>
        <View>
          <Text style={styles.matchText}>{item.homeTeam.name} vs {item.awayTeam.name}</Text>
          {item.status === "FINISHED" ? (
            <Text style={styles.statusText}>FT</Text>
          ) : item.status === "SCHEDULED" ? (
            <Text style={styles.statusText}>{new Date(item.utcDate).toLocaleTimeString()}</Text>
          ) : (
            <Text style={styles.statusText}>{item.status}</Text>
          )}
        </View>
        {item.status === "FINISHED" && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{item.score.fullTime.homeTeam} - {item.score.fullTime.awayTeam}</Text>
          </View>
        )}
      </View>



    </TouchableOpacity>

  );
  render() {
   
    const { matches, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topTabContainer}>
          <Tab.Navigator
            tabBarOptions={{
              indicatorStyle: {
                backgroundColor: 'tomato',
                height: 40,
                borderRadius: 50,
              },
              labelStyle: {
                fontSize: 12,
                color: 'white',
              },
              style: {
                backgroundColor: '#cccccc',
                borderRadius: 50,
                borderBottomColor: 'transparent',
              },
              activeTintColor: 'tomato',
              inactiveTintColor: 'grey',
              pressColor: 'tomato',
              pressOpacity: 0.8,
              scrollEnabled: true,
            }}
          >

            <Tab.Screen name="Today" component={Today} />
            <Tab.Screen name="Tomorrow" component={Tomorrow} />
          </Tab.Navigator>
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={matches}
            renderItem={this.renderMatchItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTabContainer: {
    height: 40,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    color: 'tomato'
  },
  scoreContainer: {
    // backgroundColor:'tomato',
    borderRadius: 6,
    padding: 5,

  }
});

export default HomeScreen;
