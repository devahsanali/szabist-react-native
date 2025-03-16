import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ message }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details Screen</Text>
      <Text style={styles.message}>Message: {message}</Text>
        <Button
           title="Go back home"
           onPress={() => navigation.navigate('Home')}
         />
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
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
});

export default DetailsScreen;
