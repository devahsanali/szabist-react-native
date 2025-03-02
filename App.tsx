/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Greeting from './src/Greeting';
import Counter from './src/Counter';


import {
  View
} from 'react-native';


function App(): React.JSX.Element {
  return (
    <View style={{ padding: 20 }}>
          <Greeting name="John" />
          <Greeting name="Alice" />
          <Counter />
    </View>
  );
};

export default App;
