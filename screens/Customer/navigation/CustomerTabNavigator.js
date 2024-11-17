import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importy ekranów
import HomeScreen from '../HomeScreen';
import OrdersScreen from '../OrdersScreen';
import VehiclesScreen from '../VehiclesScreen';
import AccountScreen from '../AccountScreen';

const Tab = createBottomTabNavigator();

const CustomerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Orders':
              iconName = 'list-outline';
              break;
            case 'Vehicles':
              iconName = 'car-outline';
              break;
            case 'Account':
              iconName = 'person-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          let label;
          switch (route.name) {
            case 'Home':
              label = 'Home';
              break;
            case 'Orders':
              label = 'Zlecenia';
              break;
            case 'Vehicles':
              label = 'Pojazdy';
              break;
            case 'Account':
              label = 'Konto';
              break;
            default:
              label = 'Nieznany';
          }
          return <Text style={{ color: focused ? '#6200EE' : 'gray' }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Vehicles" component={VehiclesScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default CustomerTabNavigator;
