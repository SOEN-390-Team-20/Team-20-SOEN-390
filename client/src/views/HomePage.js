/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  ImageBackground, View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const Login = () => {
    navigate('/login', { state: { isLogin: true } });
  };
  const Signup = () => {
    navigate('/login', { state: { isLogin: false } });
  };

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      paddingBottom: '10%',
    },
    card: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      width: '80%',
      marginTop: '10%',
      borderRadius: 20,
      paddingBottom: '10%',
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      marginLeft: '10%',
      marginTop: '5%',
      color: 'black',
    },
    form: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: '5%',
    },
    inputs: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '10%',
    },
    input: {
      width: '80%',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      paddingLeft: '1%',
      fontSize: 16,
      minHeight: 40,
      borderRadius: 5,
    },
    button: {
      width: '80%',
      backgroundColor: 'black',
      height: 40,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '400',
    },
    buttonAlt: {
      width: '80%',
      borderWidth: 1,
      height: 40,
      borderRadius: 50,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    buttonAltText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '400',
    },
    message: {
      fontSize: 16,
    },
  });

  return (
    // eslint-disable-next-line global-require
    <ImageBackground source={require('../public/images/login-background.png')} style={styles.image}>
      <View style={styles.card}>
        <Text style={styles.heading}>JeVaisBienAller</Text>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <TouchableOpacity style={styles.button} onPress={Login}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAlt} onPress={Signup}>
              <Text style={styles.buttonAltText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomePage;
