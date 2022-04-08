import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyleSheet, View } from 'react-native';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import DailyCheckIn from './views/DailyCheckIn';
import ListUsers from './views/ListUsers';
import HistorySymptoms from './views/HistorySymptoms';
import Dashboard from './views/Dashboard';
import DoctorDashboard from './views/DoctorDashboard';
import Appointments from './views/Appointments';
import PatientsList from './views/patientsList';
import QRcode from './views/Qrcode';

// React-Native (will be deleted)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// MUI global styles in file
const theme = createTheme({
  palette: {
    primary: {
      main: '#00296B',
    },
    secondary: {
      main: '#FDC500',
    },
  },
});

function App() {
  return (
    <View style={styles.container}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checkIn" element={<DailyCheckIn />} />
            <Route path="/listUsers" element={<ListUsers />} />
            <Route path="/doctorDashboard" element={<DoctorDashboard />} />
            <Route path="/historySymptoms" element={<HistorySymptoms />} />
            <Route path="/appointment" element={<Appointments />} />
            <Route path="/patientlist" element={<PatientsList />} />
            <Route path="/QRcode" element={<QRcode />} />

          </Routes>
        </Router>
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}

export default App;
