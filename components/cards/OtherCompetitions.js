import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, ScrollView, Image, TouchableOpacity, StyleSheet , Text} from "react-native";

const OtherCompetitions = () => {

  const navigation = useNavigation();

  const handleBundesligaData = () => {
   
    navigation.navigate('Bundesliga')
 
   // Navigate to the Epl component
  };

  const handleLigue1Data = () => {

    navigation.navigate('French Ligue 1')
 
   // Navigate to the Epl component
  };
  const handleEredivisieData = () => {
   
    navigation.navigate('Eredivisie');
 
  };
  const handleLigaNosData = () => {
    console.log("Pressed");
    navigation.navigate('Primeira Liga Portugal')
 
   // Navigate to the CL component
  };
  const handleClData = () => {
    console.log("Pressed");
    navigation.navigate('Serie A')
 
   // Navigate to the Efl component
  };
  const handleEflData = () => {
  
    navigation.navigate('English Championship')
 
 
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <View style={styles.titleContainer}>
<Text style={styles.cardtitle}>Other Competitions</Text>
</View>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.imageContainer} onPress={handleBundesligaData}>
                <View style={styles.viewer}>
              <Image
                source={require("../../assets/images/bundeslga.png")}
                style={styles.image}
              />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer} onPress={handleLigue1Data}>
              <Image
               source={require("../../assets/images/lg1.png")}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer} onPress={handleEredivisieData}>
              <Image
                source={require("../../assets/images/eredivisie.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.imageContainer} onPress={handleLigaNosData}>
              <Image
                source={require("../../assets/images/lignos.png")}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/ucll.png")}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer} onPress={handleEflData}>
              <Image
               source={require("../../assets/images/efl2.png")}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height:400,
    borderRadius: 0,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    backgroundColor: "tomato",
    marginTop:270,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
  },
  viewer:{
    shadowColor: "green",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  row: {
    marginTop:0,
    flexDirection: "row",
    justifyContent: "center",
    marginTop:40,
    marginBottom: 10,
    marginLeft:40
  },
  imageContainer: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: 50,
      height: 50,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  cardtitle: {
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default OtherCompetitions;
