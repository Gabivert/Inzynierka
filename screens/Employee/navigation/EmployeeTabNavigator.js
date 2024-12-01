import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Importy ekranów dla pracownika
import EmployeeHomeScreen from './EmployeeHomeScreen';
import TasksScreen from './EmployeeOrderScreen'; //chyba nie potrzebne bo juz jest EmployeeOrderScreen
import AccountEmployeeScreen from './EmployeeAccountScreen';
import ProtocolOrdersScreen from './ProtocolOrdersScreen';
import EmployeeOrderScreen from './EmployeeOrderScreen';

const Tab = createBottomTabNavigator();

const EmployeeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Tasks':
              iconName = 'clipboard-outline';
              break;
            case 'Profile':
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
            case 'Tasks':
              label = 'Zlecenia';
              break;
            case 'Profile':
              label = 'Profil';
              break;
            default:
              label = 'Protocols';
          }
          return <Text style={{ color: focused ? '#6200EE' : 'gray' }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={EmployeeHomeScreen} />
      <Tab.Screen name="Tasks" component={EmployeeOrderScreen} />
      <Tab.Screen name="Profile" component={AccountEmployeeScreen} />
      <Tab.Screen
        name="HandOverProtocol"
        component={ProtocolOrdersScreen}
        options={{
          tabBarLabel: 'Protokół',
          tabBarIcon: ({ color, size }) => (
            <Icon name="document-text-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default EmployeeTabNavigator;
