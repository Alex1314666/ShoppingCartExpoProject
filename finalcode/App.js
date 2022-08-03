import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "HomeScreen"
          component={HomeScreen}
          options={{title:"Shopping Cart Project"}}  
        />

        <Stack.Screen
          name = "ItemDetailScreen"
          component={ItemDetailScreen}
          options={{title:"Item Detail"}} 
        />

        <Stack.Screen
          name = "CartScreen"
          component={CartScreen}
          options={{title:"Cart List"}} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
