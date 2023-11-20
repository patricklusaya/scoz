import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";


const SignUp = () => {
const navigation = useNavigation();
const handleSignUp = ( )=>{
  // signInWithPopup(auth, googleProvider)
  // .then((userCredential) => {
  //   const user = userCredential.user;
  //   const u = auth.currentUser.displayName;
  //   console.log(u);
  //   console.log(user);
  //   navigation.navigate("Select Zone");
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
  navigation.navigate("Select Zone");
}
  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Image source={require('../../assets/scozlogo2.png')} style={styles.logo} />

      {/* "Sign up for Scoz" text */}
      <Text style={styles.title}>Sign up for Scoz</Text>

      {/* "Start earning money..." text */}
      <Text style={styles.description}>Start earning money today by leveraging your football knowledge</Text>

      {/* "Continue with Google" button */}
      <TouchableOpacity style={styles.googleButton}  onPress={handleSignUp}>
        {/* <Ionicons name="logo-google" size={24} color="white" /> */}
        <Image  source={require('../../assets/images/google.png')} style={styles.img} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* "Already have an Account?" and "Sign In" link */}
      <View style={styles.signInContainer}>
        <Text style={styles.alreadyHaveAccountText}>Already have an Account?</Text>
        <TouchableOpacity onPress={() => { /* Handle Sign In click */ }}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* "By signing up you agree..." text */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up you agree to our{' '}
          <Text style={styles.termsLink} onPress={() => Linking.openURL('url-to-terms')}>Terms of Service</Text>{' '}
          and{' '}
          <Text style={styles.termsLink} onPress={() => Linking.openURL('url-to-privacy-policy')}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
    marginTop:50
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DB4437',
    padding: 15,
    width: '100%', // Cover most of the screen width
    borderRadius: 8,
  },
  img:{
    width:24,
    height:24
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  signInContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  alreadyHaveAccountText: {
    fontSize: 16,
  },
  signInLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 5,
  },
  termsContainer: {
    marginVertical: 10,
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
  },
  termsLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
