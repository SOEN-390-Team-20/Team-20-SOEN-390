/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  ImageBackground, View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  let initialName = 'N/A';
  let initialRole = 'N/A';
  const { state } = useLocation();
  if (useLocation()?.state) {
    const { name, role } = state;
    initialName = name;
    initialRole = role;
  }

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

  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState(`Welcome ${initialName}. Your role is ${initialRole}.`);
  const getMessage = () => message;

  return (
    // eslint-disable-next-line global-require
    <ImageBackground source={require('../public/images/login-background.png')} style={styles.image}>
      <View style={styles.card}>
        <Text style={styles.heading}>Dashboard</Text>
        <Text style={styles.message}>{getMessage()}</Text>

      </View>
    </ImageBackground>
  );
}

export default Dashboard;
