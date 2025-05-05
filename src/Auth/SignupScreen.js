import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import Toast from './../component/Toast';

export default function SignupScreen() {
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const validateAndRegister = async () => {
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const message = await register(name, email, password);

      // Show success toast
      setToastType('success');
      setToastMessage(message);
      setToastVisible(true);

      // Navigate to login after toast
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000); // Adjust the time based on your preference
    } catch (err) {
      // Show error toast
      setToastType('error');
      setToastMessage(err.message);
      setToastVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Sign Up</Text>

        {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{
            borderBottomWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 8,
            marginBottom: 20,
          }}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderBottomWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 8,
            marginBottom: 20,
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderBottomWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 8,
            marginBottom: 20,
          }}
        />

        <Button title="Register" onPress={validateAndRegister} />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ marginTop: 15, color: 'blue' }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>

      {/* Toast for success or error */}
      <Toast
        message={toastMessage}
        type={toastType}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </View>
  );
}
