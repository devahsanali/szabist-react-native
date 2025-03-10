import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Greeting from './Greeting';
import Counter from './Counter';
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
     <View>
          <Text style={styles.text}>Welcome to Home Screen</Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details', { message: 'Hello from Home!' })}
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
