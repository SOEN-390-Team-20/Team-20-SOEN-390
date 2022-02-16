import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './views/HomePage';
import LoginScreen from './views/LoginScreen';
import Dashboard from './views/Dashboard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  return (
    <View style={styles.container}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <StatusBar style="auto" />
    </View>
  );
}

export default App;
