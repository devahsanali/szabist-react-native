import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from './../component/Toast'; // Import your Toast component

export const AuthContext = createContext({
  userToken: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) setUserToken(token);
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://10.0.2.2:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const data = await res.json();
      const token = data.token;

      await AsyncStorage.setItem('token', token);
      setUserToken(token);
    } catch (err) {
      throw new Error(err);
    }
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setUserToken(null);
        setToastType('success');
        setToastMessage('User logged out successfully');
        setToastVisible(true);
        return;
      }

      const response = await fetch('http://10.0.2.2:3000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok || response.status === 400 || response.status === 401) {
        await AsyncStorage.removeItem('token');
        setUserToken(null);

        setToastType('success');
        setToastMessage('User logged out successfully');
        setToastVisible(true);
      } else {
        setToastType('error');
        setToastMessage('Logout failed, please try again.');
        setToastVisible(true);
      }
    } catch (error) {
      setToastType('error');
      setToastMessage('Error during logout, please try again.');
      setToastVisible(true);
    }
  };

  const register = async (name, email, password) => {
   const res = await fetch('http://10.0.2.2:3000/api/users/register', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ name, email, password }),
   });

   const data = await res.json();

   if (!res.ok) {
     const errorMsg = data?.message || 'Registration failed. Please try again.';
     throw new Error(errorMsg);
   }

   return data.message || 'Registration successful';
  };


  return (
    <AuthContext.Provider value={{ userToken, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
