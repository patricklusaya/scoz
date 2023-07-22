import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function NetworkErrorCard() {
  return (
    // <View style={styles.errorcontainer}>
    <View style={styles.errorCard}>
      <Ionicons name="alert-circle-outline" size={24} color="red" style={styles.errorIcon} />
      <Text style={styles.errorText}>Sorry, Check your Internet Connection.</Text>
    </View>
    // </View>
  )
}

const styles = StyleSheet.create({
 
    errorCard: {
        // backgroundColor: 'white',
        // borderRadius: 8,
    
        padding: 16,
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
        // elevation: 2,
      },
      errorIcon: {
        marginRight: 8,
      },
      errorText: {
        fontSize: 12,
        color: 'red',
      },
})