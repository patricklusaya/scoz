import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Today from "./Today";
import Tomorrow from "./Tomorrow";
import OtherMatches from "./OtherMatches";
import { View } from "react-native";

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const TopTabNavigator = ({cardStyle, screenStyle}) => {

  //const initialization
  const { backgroundColor, color, iconColor } = screenStyle;
  const { cardBackgroundColor, cardColor, cardiconColor } = cardStyle;

  return (
   
    <TopTab.Navigator
 initialRouteName="Today"
    tabBarOptions={{
      indicatorStyle: {
        backgroundColor: "tomato",
        height: 50,
        borderRadius: 50,
      },
      labelStyle: {
        fontSize: 12,
        color: "black",
      },
      style: {
        marginTop: 50,
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: "#cccccc",
        // backgroundColor: cardStyle.cardBackgroundColor,
      
        borderRadius: 50,
        borderBottomColor: "transparent",
      },
      activeTintColor: "tomato",
      inactiveTintColor: "grey",
      pressColor: "#cccccc",
      pressOpacity: 0.8,
      scrollEnabled: true,
    }}
  >
     <TopTab.Screen
        name="Other"
       
        
      >
          {(props) => (
    <OtherMatches {...props} screenStyle={screenStyle} cardStyle={cardStyle}  />
  ) }
</TopTab.Screen>
      <TopTab.Screen name="Today" 
      
    
    >
     {(props) => (
    <Today{...props} screenStyle={screenStyle} cardStyle={cardStyle}  />
  )}
</TopTab.Screen>
      <TopTab.Screen name="Tommorow" >
      {(props) => (
    <Tomorrow {...props} screenStyle={screenStyle} cardStyle={cardStyle}  />
  )}
</TopTab.Screen>
     
    </TopTab.Navigator>
 
  );
};
const styles = StyleSheet.create({
  customTabBarStyle: {
    marginTop: 60, // Adjust the marginTop for the specific tab
  },
});

export default TopTabNavigator;
