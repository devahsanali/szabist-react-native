import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import FormScreen from './src/FormScreen';
import ProductsScreen from './src/Products/ProductScreen'; // Ensure this path is correct

import { NavigationContainer } from '@react-navigation/native';

function ProductsScreens() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Product" component={ProductsScreens} />
          <Drawer.Screen
            name="Details"
            component={DetailsScreen}
            initialParams={{ message: "Hello from Drawer!" }}
          />
          <Drawer.Screen name="Form" component={FormScreen} />
          <Drawer.Screen name="Products" component={ProductsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
}