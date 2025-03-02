import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text style={{ fontSize: 24 }}>Count: {count}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Button title="Increase" onPress={() => setCount(count + 1)} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Button title="Decrease" onPress={() => setCount(count - 1)} />
        </View>
      </View>

    </View>
  );
};

export default Counter;
