import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
 
} from "react-native";
import { fetchTopScorersAcrossLeagues } from "../services/matchesServices";
import EuropeTopScorers from "../components/EuropeTopScorers";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EuropeTopAssistsProviders from "./EuropeTopAssistsProviders";
import TopCleanSheets from "./TopCleanSheets";
import PopularLeague from "./cards/PopularLeague";
import OtherCompetitions from "./cards/OtherCompetitions";
import CustomLoader from "./loaders/CustomLoader";
export default function Stats({cardStyle, screenStyle,popularLeagueCardStyle}) {

//States initialization
  const [topScorers, setTopScorers] = useState([]);
  const [showTopScorers, setShowTopScorers] = useState(false);
  const [showTopAssistProviders, setShowTopAssistProviders] = useState(false);
  const [showTopCleanSheets, setShowTopCleanSheets] = useState(false);

  //constants initializations
  const navigation = useNavigation();
  const { backgroundColor, color, iconColor } = screenStyle;
  const { cardBackgroundColor, cardColor, cardiconColor } = cardStyle;
  const { popularCardBackgroundColor  } = popularLeagueCardStyle;
  
  //render header back icon
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="tomato"
            style={{ marginLeft: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  
  const handleCardPress = () => {
    navigation.navigate('Europe Top Scorers');
  };

  const handleDisplayOfAssistProviders = () => {
    navigation.navigate('Assists');
  };

  const handleDisplayOfTopCleenSheets = () => {
    setShowTopCleanSheets(true);
  };

  return (

  <View style={[styles.container, {backgroundColor:backgroundColor}]}>
     
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={handleCardPress}>
              <View style={[styles.card , {backgroundColor:cardBackgroundColor}]}>
                <Text style={[styles.title , {color:cardColor}]}>European Golden Boot</Text>
                <Image
                  source={require("../assets/images/boot2.png")}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDisplayOfAssistProviders}>
              <View style={[styles.card , {backgroundColor:cardBackgroundColor}]}>
                <Text style={[styles.title , {color:cardColor}]}>Top Assists</Text>
                <Image
                  source={require("../assets/images/assist.png")}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDisplayOfTopCleenSheets}>
              <View style={[styles.card , {backgroundColor:cardBackgroundColor}]}>
                <Text style={[styles.title , {color:cardColor}]}>Top Cleensheets</Text>
                <Image
                  source={require("../assets/images/glove.png")}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.card , {backgroundColor:cardBackgroundColor}]}>
                <Text style={[styles.title , {color:cardColor}]}>Top Goal Contributers</Text>
                <Image
                  source={require("../assets/images/boot2.png")}
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* <View style={styles.container}>
            <View style={styles.leaguecard}>
            <View style={styles.titleContainer}>
    <Text style={styles.cardtitle}>Popular Leagues</Text>
  </View>
              <View style={styles.viewerContainer}>
                <View style={styles.viewer}>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/images/pl3.jpg")}
                    style={styles.image}
                  />
                   </TouchableOpacity>
                  
                </View>
                <View style={styles.viewer}>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/images/laliga.jpg")}
                    style={styles.image}
                  />
                   </TouchableOpacity>
                
                </View>
                <TouchableOpacity>
                <View style={styles.viewer}>
                    
                  <Image
                    source={require("../assets/images/seriea2.png")}
                    style={styles.image}
                  />
                
                </View>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
          <PopularLeague popularLeagueCardStyle={popularLeagueCardStyle}/>
         <OtherCompetitions/>
        </View>
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 190,
  },
  card: {
    width: 200,
    height: 120,
    padding: 16,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: "tomato",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 2,
    flexDirection: "column",
    alignItems: "center",
    marginRight: 16,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  leaguecard: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    // shadowColor: "tomato",
    // shadowOffset: { width: 0, height: 9 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 14,
    padding: 20,
  },
  viewerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewer: {
    alignItems: "center",
    marginBottom: 0,
    paddingBottom:50
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  cardtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
