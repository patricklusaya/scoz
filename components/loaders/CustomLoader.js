import React from "react";
import { Text, View, StyleSheet, ActivityIndicator ,Image} from "react-native";
export default CustomLoader = () => {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color="tomato" /> */}
        <Image source={require('../../assets/images/loader4.gif')} style={styles.loader} />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:40
    },
    loader: {
        width:50,
        height:50
        // Add any additional styling as needed
      },
  });
    