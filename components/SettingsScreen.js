import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import { Switch } from "react-native";
import { DarkModeContext } from "./context/DarkModeContext";

const SettingsCard = ({ iconName, text, screenStyle }) => {
  const { isDarkModeEnabled, toggleDarkMode } = useContext(DarkModeContext);

  const cardStyle = isDarkModeEnabled
    ? {
        backgroundColor: '#101E2A', // Dark color for cards in dark mode
        color: '#FFFFFF', // Text color for cards in dark mode
        iconColor: '#FFFFFF', // Icon color for cards in dark mode
      }
    : {
        color: 'black', // Default text color for cards
        iconColor: 'black', // Default icon color for cards
      };

  return (
    <Pressable style={[styles.cardContainer]}>
      <View style={[styles.cardContent, cardStyle]}>
        <Ionicons name={iconName} size={24} color={cardStyle.iconColor} style={styles.icon} />
        <Text style={[styles.text, cardStyle]}>{text}</Text>
        {text === 'Dark Mode' && (
          <Switch
            trackColor={{ false: 'tomato', true: '#FFFAF0' }}
            thumbColor={isDarkModeEnabled ? 'tomato' : '#FFFAF0'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkModeEnabled}
            style={styles.switch}
          />
        )}
        {text !== 'Dark Mode' && (
          <Ionicons
            name="chevron-forward"
            size={24}
            color={cardStyle.iconColor}
            style={styles.arrowIcon}
          />
        )}
      </View>
    </Pressable>
  );
};

const SettingsScreen = () => {
  const { isDarkModeEnabled, toggleDarkMode } = useContext(DarkModeContext);

  const screenStyle = isDarkModeEnabled
    ? {
        backgroundColor: '#050C12',
        color: '#FFFAF0', // Text color for dark mode
        iconColor: 'white', // Icon color for dark mode
      }
    : {
        backgroundColor: '#F8F8F8',
        color: 'black', // Text color for light mode
        iconColor: 'black', // Icon color for light mode
      };

  const cardStyle = {
    light: {
      backgroundColor: 'white',
      color: 'black', // Text color for light mode
      iconColor: 'black', // Icon color for light mode
    },
    dark: {
      backgroundColor: '#36454F',
      color: '#FFFAF0', // Text color for dark mode
      iconColor: 'white', // Icon color for dark mode
    },
  };

  const navigation = useNavigation();

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

  return (
    <ScrollView>
      <View style={[styles.container, screenStyle]}>
        <Text style={[styles.sectionTitle, { color: screenStyle.color }]}>General</Text>

        <SettingsCard
          iconName="moon-outline"
          text="Dark Mode"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="language-outline"
          text="Language"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="sunny-outline"
          text="Light Theme"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="moon-outline"
          text="Dark Theme"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="trash-outline"
          text="Clear Space"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />

        <Text style={[styles.sectionTitle, { color: screenStyle.color }]}>About</Text>
        <SettingsCard
          iconName="document-text-outline"
          text="Content Policy"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="lock-closed-outline"
          text="Privacy Policy"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="people-outline"
          text="User Agreement"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="book-outline"
          text="Acknowledgment"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />

        <Text style={[styles.sectionTitle, { color: screenStyle.color }]}>Support</Text>
        <SettingsCard
          iconName="help-circle-outline"
          text="Help Center"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
        <SettingsCard
          iconName="bug-outline"
          text="Report A Bug"
          screenStyle={screenStyle}
          cardStyle={cardStyle}
        />
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
 
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
  },
  icon: {
    marginRight: 16,
  },
  text: {
    flex: 1,
    marginRight: 16,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
};

export default SettingsScreen;
