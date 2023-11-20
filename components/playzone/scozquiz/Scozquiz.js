import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
export default function Scozquiz({ navigation }) {
  // Mock data for categories
  const categories = [
    {
      name: 'General Football',
      icon: 'football',
      quizCount: 10,
    },
    {
      name: 'Historical Football',
      icon: 'library',
      quizCount: 15,
    },
    {
        name: 'Data & Stats',
        icon: 'analytics',
        quizCount: 15,
      },
      {
        name: 'Guess The Player',
        icon: 'walk',
        quizCount: 15,
      },
      {
        name: 'Awards & Nominations',
        icon: 'trophy',
        quizCount: 18,
      },
      {
        name: 'African Football',
        icon: 'help',
        quizCount: 50,
      },
    // Add more categories here
  ];


  // Drawer toggle function
  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleCategoryNavigation = (category) => {
    // Navigate to the Quiz component and pass the selected category as a parameter
    navigation.navigate('Quiz', { category });
  };

const renderCategoryCard = ({ name, icon, quizCount }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryNavigation({ name, icon, quizCount })}>
      <View style={styles.categoryIconContainer}>
        <Ionicons name={icon} size={20} color="tomato" />
      </View>
      <View style={styles.categoryInfoContainer}>
        <Text style={styles.categoryName}>{name}</Text>
        <Text style={styles.quizCount}>{quizCount} Quizzes</Text>
      </View>
    </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Drawer icon */}
        <TouchableOpacity style={styles.drawerIconContainer} onPress={toggleDrawer}>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
        {/* Profile image and name */}
        <View style={styles.profileContainer}>
         
          <Image
            source={require('../../../assets/images/b2.png')}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Choose Category text */}
        <Text style={styles.profileName}>Hi Patrick, </Text>
        <Text style={styles.chooseCategoryText}>Please Choose Category</Text>
        {/* Category cards */}
        {categories.map((category, index) => (
          <View key={index}>
            {/* Use TouchableOpacity to make the category card pressable */}
            <TouchableOpacity onPress={() => handleCategoryNavigation(category)}>
              {renderCategoryCard(category)}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:40,
    padding: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'tomato',
  },
  drawerIconContainer: {
    padding: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  chooseCategoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 8,
  },
  categoryIconContainer: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    borderRadius: 50,
    padding: 12,
    marginRight: 16,
  },
  categoryInfoContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quizCount: {
    fontSize: 14,
    color: 'gray',
  },
});