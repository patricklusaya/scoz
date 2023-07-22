import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsScreen from "./components/SettingsScreen";
import TopTabNavigator from "./components/TopTabNavigator";
import Stats from "./components/Stats";
import Epl from "./components/competitions/Epl";
import EuropeTopScorers from "./components/EuropeTopScorers";
import EuropeTopAssistsProviders from "./components/EuropeTopAssistsProviders";
import Laliga from "./components/competitions/laliga/Laliga";
import SerieaStanding from "./components/competitions/seriea/SerieaStanding";
import SerieA from "./components/competitions/seriea/SerieA";
import Bundesliga from "./components/competitions/bundesliga/Bundesliga";
import Ligue1 from "./components/competitions/ligue1/Ligue1";
import Eredivisie from "./components/competitions/eredivisie/Eredivisie";
import PrimeiraLiga from "./components/competitions/primeiraliga/PremeiraLiga";
import Efl from "./components/competitions/efl/Efl";
import OtherMatches from "./components/OtherMatches";
import Fixtures from "./components/Fixtures";
import { StatusBar } from "react-native";
import {
  DarkModeContext,
  DarkModeProvider,
} from "./components/context/DarkModeContext";
import { useContext } from "react";
import { MatchDetails } from "./components/MatchDetails";




const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  const { isDarkModeEnabled } = useContext(DarkModeContext);

  const screenStyle = isDarkModeEnabled
    ? {
        backgroundColor: "#050C12",
        color: "#FFFAF0", // Text color for dark mode
        iconColor: "#FFFFFF", // Icon color for dark mode
      }
    : {
        backgroundColor: "#F8F8F8",
        color: "black", // Text color for light mode
        iconColor: "black", // Icon color for light mode
      };

  const tabBarStyle = isDarkModeEnabled
    ? {
        backgroundColor: "#101E2A",
        color: "#FFFAF0", // Text color for dark mode
        iconColor: "#FFFFFF", // Icon color for dark mode
      }
    : {
        backgroundColor: "white",
        color: "black", // Text color for light mode
        iconColor: "black", // Icon color for light mode
      };

  const cardStyle = isDarkModeEnabled
    ? {
        cardBackgroundColor: "#101E2A",
        cardColor: "#FFFAF0",
        cardIconColor: "#D9E6F2",
      }
    : {
        cardBackgroundColor: "white",
        cardColor: "#101010",
        cardIconColor: "#101010",
      };

  const statsCardStyle = isDarkModeEnabled
    ? {
        cardBackgroundColor: "tomato",
        cardColor: "#FFFAF0",
      }
    : {
        cardBackgroundColor: "tomato",
        cardColor: "#101010",
      };

  //popular league card styling on dark mode toggling
  const popularLeagueCardStyle = isDarkModeEnabled
    ? {
        cardBackgroundColor: "#101E2A",
        cardColor: "#FFFAF0",
      }
    : {
        cardBackgroundColor: "white",
      };

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Stats") {
            iconName = focused ? "ios-analytics" : "ios-analytics-outline";
          } else if (route.name === "Fixtures") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list";
          }

          return <Ionicons name={iconName} size={24} color="tomato" />;
        },

        tabBarStyle: {
          backgroundColor: tabBarStyle.backgroundColor,
          borderTopColor: "transparent",
        }, // Apply the screenStyle to tabBarStyle
      })}
    >
      <BottomTab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => (
          <View
            style={{ flex: 1, backgroundColor: tabBarStyle.backgroundColor }}
          >
            <TopTabNavigator
              {...props}
              screenStyle={screenStyle}
              cardStyle={cardStyle}
              popularLeagueCardStyle={popularLeagueCardStyle}
            />
          </View>
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Stats"
        options={{
          headerStyle: {
            backgroundColor: cardStyle.cardBackgroundColor,
          },
          headerTitleStyle: { color: screenStyle.color },
        }}
      >
        {(props) => (
          <Stats
            {...props}
            screenStyle={screenStyle}
            cardStyle={statsCardStyle}
            popularLeagueCardStyle={popularLeagueCardStyle}
          />
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Fixtures"
        options={{
          tabBarLabel: "Fixtures",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color="tomato"
            />
          ),
          headerStyle: screenStyle, // Apply the screenStyle to headerStyle
          headerTitleStyle: { color: screenStyle.color },
        }}
      >
        {(props) => (
          <Fixtures
            {...props}
            screenStyle={screenStyle}
            cardStyle={cardStyle}
          />
        )}
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Settings"
        options={{
          headerStyle: screenStyle, // Apply the screenStyle to headerStyle
          headerTitleStyle: { color: screenStyle.color },
        }}
        component={SettingsScreen}
      />
    </BottomTab.Navigator>
  );
};
export const App = () => {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
};
export const AppContent = () => {
  const { isDarkModeEnabled } = useContext(DarkModeContext);

  const screenStyle = isDarkModeEnabled
    ? {
        backgroundColor: "black",
        color: "#FFFAF0", // Text color for dark mode
        iconColor: "white", // Icon color for dark mode
      }
    : {
        backgroundColor: "white",
        color: "black", // Text color for light mode
        iconColor: "black", // Icon color for light mode
      };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabs"
          options={{ headerShown: false }}
          component={BottomTabs}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Other" component={OtherMatches} />
        <Stack.Screen name="Epl" component={Epl} />
        <Stack.Screen name="Laliga" component={Laliga} />
        <Stack.Screen name="Serie A" component={SerieA} />
        <Stack.Screen name="Bundesliga" component={Bundesliga} />
        <Stack.Screen name="French Ligue 1" component={Ligue1} />
        <Stack.Screen name="Eredivisie" component={Eredivisie} />
        <Stack.Screen name="Primeira Liga Portugal" component={PrimeiraLiga} />
        <Stack.Screen name="English Championship" component={Efl} />
        <Stack.Screen name="Europe Top Scorers" component={EuropeTopScorers} />
        <Stack.Screen name="Match" component={EuropeTopScorers} />
        <Stack.Screen name="Assists" component={EuropeTopAssistsProviders} />
        <Stack.Screen name="Match Details" component={MatchDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
