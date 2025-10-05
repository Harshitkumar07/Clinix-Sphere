import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/Home/HomeScreen';
import DoctorDetailsScreen from '../screens/Home/DoctorDetailsScreen';
import BookAppointmentScreen from '../screens/Appointment/BookAppointmentScreen';
import AppointmentsScreen from '../screens/Appointment/AppointmentsScreen';
import PrescriptionsScreen from '../screens/Prescription/PrescriptionsScreen';
import PrescriptionDetailsScreen from '../screens/Prescription/PrescriptionDetailsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

import { colors } from '../theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="DoctorDetails" 
      component={DoctorDetailsScreen}
      options={{ 
        title: 'Doctor Details',
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen 
      name="BookAppointment" 
      component={BookAppointmentScreen}
      options={{ 
        title: 'Book Appointment',
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const PrescriptionStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="PrescriptionsMain" 
      component={PrescriptionsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="PrescriptionDetails" 
      component={PrescriptionDetailsScreen}
      options={{ 
        title: 'Prescription Details',
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Appointments') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Prescriptions') {
          iconName = focused ? 'document-text' : 'document-text-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray[400],
      headerShown: false,
      tabBarStyle: {
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Appointments" component={AppointmentsScreen} />
    <Tab.Screen name="Prescriptions" component={PrescriptionStack} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
