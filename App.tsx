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
import { NavigationContainer } from '@react-navigation/native';
function ProductsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const DetailsScreenWrapper = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setParams({
      message: 'Hello from Drawer!',
    });
  }, [navigation]);

  return <DetailsScreen />;
};

export default function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Products" component={ProductsScreen} />
          <Drawer.Screen name="Details"  component={() => <DetailsScreen message="Hello from Drawer!" />}  />
        </Drawer.Navigator>
      </NavigationContainer>
    );
}