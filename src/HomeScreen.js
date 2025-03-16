import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Greeting from './Greeting';
import Counter from './Counter';
import Details from './DetailsScreen';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     <View>
          <Text style={styles.text}>Welcome to Home Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          />
      </View>
      <Greeting name="John" />
      <Greeting name="Alice" />
      <Counter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
