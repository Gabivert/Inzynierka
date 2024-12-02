import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssignEmployeeScreen from './AssignEmployeeScreen';
import UnfinishedOrdersScreen from './UnfinishedOrdersScreen';
import CompletedOrdersScreen from './CompletedOrdersScreen';
import AssignedOrdersScreen from './AssignedOrdersScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function ManagerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'AssignEmployee':
              iconName = 'person-add-outline';
              break;
            case 'UnfinishedOrders':
              iconName = 'clipboard-outline';
              break;
            case 'CompletedOrders':
              iconName = 'checkmark-done-outline';
              break;
            case 'AssignedOrders':
              iconName = 'log-out-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE', // Kolor aktywnej ikony
        tabBarInactiveTintColor: 'gray', // Kolor nieaktywnej ikony
        headerShown: false, // Wyłączamy nagłówek globalnie
      })}
    >
      <Tab.Screen
        name="AssignEmployee"
        component={AssignEmployeeScreen}
        options={{
          title: 'Przypisz pracownika',
        }}
      />
      <Tab.Screen
        name="UnfinishedOrders"
        component={UnfinishedOrdersScreen}
        options={{
          title: 'Nieukończone zlecenia',
        }}
      />
      <Tab.Screen
        name="CompletedOrders"
        component={CompletedOrdersScreen}
        options={{
          title: 'Historia zleceń',
        }}
      />
      <Tab.Screen
        name="AssignedOrders"
        component={AssignedOrdersScreen}
        options={{
          title: 'Wyloguj',
        }}
      />
    </Tab.Navigator>
  );
}
