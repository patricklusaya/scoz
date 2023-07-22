import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import TopTabNavigator from './components/TopTabNavigator';
import Stats  from './components/Stats';
import Fixtures from './components/Fixtures';
import SettingsScreen from './components/SettingsScreen';
import { Provider,  useDispatch } from 'react-redux';

import store from "./components/redux/store";
const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  const isDarkModeEnabled = useSelector((state) => state.isDarkModeEnabled);

  return (
    <Provider store={store}>
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'ios-analytics' : 'ios-analytics-outline';
          } else if (route.name === 'Fixtures') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }

          return <Ionicons name={iconName} size={24} color="tomato" />;
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={TopTabNavigator}
      />
      <BottomTab.Screen name="Stats" component={Stats} />
      <BottomTab.Screen name="Fixtures" component={Fixtures} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
    </BottomTab.Navigator>
    </Provider>
  );
};

export default BottomTabs;
