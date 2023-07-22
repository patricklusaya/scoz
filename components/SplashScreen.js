 import React, { Component } from 'react'
 import { StyleSheet, Text, View, Button, TextInput, ScrollView  } from 'react-native';
 export default class SplashScreen extends Component {
   render() {
     return (
       <View style={styles. contentContainer}>
          <Text>Hello this is splash </Text>
       </View>
     )
   }
 }
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTabContainer: {
    height: 40,
    marginTop:50,
    marginLeft:30,
    marginRight:30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


