import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssignTasksScreen from './AssignTasksScreen';
import ScheduleScreen from './ScheduleScreen';
import InvoicesScreen from './InvoicesScreen';
import PartsListScreen from './PartsListScreen';

const Tab = createBottomTabNavigator();

export default function ManagerTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AssignTasks" component={AssignTasksScreen} options={{ title: 'Przypisz zadania' }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Terminarz', headerShown: false }} />
      <Tab.Screen name="Invoices" component={InvoicesScreen} options={{ title: 'Faktury' }} />
      <Tab.Screen name="Parts" component={PartsListScreen} options={{ title: 'Części' }} />
    </Tab.Navigator>
  );
}
