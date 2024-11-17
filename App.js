import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Customer/HomeScreen';
import WelcomeScreen from './screens/Shared/WelcomeScreen';
import LoginScreen from './screens/Customer/LoginScreen';
import RegisterScreen from './screens/Shared/RegisterScreen';
import EmployeeLoginScreen from './screens/Employee/EmployeeLoginScreen';
import CustomerTabNavigator from './screens/Customer/navigation/CustomerTabNavigator';
import VehiclesEditScreen from './screens/Customer/VehiclesEditScreen';
import OrderDetailsScreen from './screens/Customer/OrderDetailsScreen';
import PasswordEditScreen from './screens/Customer/PasswordEditScreen';
import AddOrderScreen from './screens/Customer/AddOrderScreen';
import AddVehicleScreen from './screens/Customer/AddVehicleScreen';
import './global.css';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CustomerTabNavigator">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="EmployeeLogin" options={{ headerShown: false }} component={EmployeeLoginScreen} />
        <Stack.Screen
          name="CustomerTabNavigator"
          options={{ headerShown: false }}
          component={CustomerTabNavigator} // Dodanie dolnej nawigacji klienta
        />
        <Stack.Screen
          name="VehiclesEdit"
          options={{
            headerShown: false,
            title: 'Edycja pojazdu',
          }}
          component={VehiclesEditScreen}
        />
        <Stack.Screen
          name="OrderDetails"
          options={{
            headerShown: false,
            title: 'Szczegóły zlecenia',
          }}
          component={OrderDetailsScreen}
        />
        <Stack.Screen
          name="PasswordEdit"
          component={PasswordEditScreen}
          options={{ title: 'Zmiana hasła', headerShown: true }}
        />
        <Stack.Screen
          name="AddOrder"
          component={AddOrderScreen}
          options={{ title: 'Dodaj zlecenie', headerShown: true }}
        />
        <Stack.Screen
          name="AddVehicle"
          component={AddVehicleScreen}
          options={{ title: 'Dodaj pojazd', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}