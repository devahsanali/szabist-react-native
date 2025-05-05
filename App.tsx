import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './src/Auth/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import FormScreen from './src/FormScreen';
import ProductsScreen from './src/Products/ProductScreen';
import LoginScreen from './src/Auth/LoginScreen';
import SignupScreen from './src/Auth/SignupScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={logout}
        labelStyle={{ color: 'red' }}
      />
    </DrawerContentScrollView>
  );
}

function AppStack() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Product" component={ProductsScreen} />
      <Drawer.Screen name="Details" component={DetailsScreen} />
      <Drawer.Screen name="Form" component={FormScreen} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
