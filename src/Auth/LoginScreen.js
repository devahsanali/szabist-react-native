import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import Toast from './../component/Toast';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const validateAndLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await login(email, password);

      // Show success toast
      setToastType('success');
      setToastMessage('Login successful!');
      setToastVisible(true);

      // Navigate to the next screen after a slight delay to show the toast
      setTimeout(() => {
        navigation.navigate('Home'); // You can replace 'Home' with your next screen
      }, 3000); // Adjust time based on how long you want the toast to appear
    } catch (err) {
      // Show error toast
      setToastType('error');
      setToastMessage('Invalid credentials. Please try again.');
      setToastVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Login</Text>

      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

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

      <Button title="Login" onPress={validateAndLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ marginTop: 15, color: 'blue' }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>

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
