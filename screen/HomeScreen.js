import React, { useEffect, useState } from 'react';
import { Button, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ServiceHistoryCard from './ServicesHistoryCard';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Menambahkan state untuk loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          navigation.navigate('Login');
          return; 
        }

        const response = await axios.get('http://192.168.160.137:8000/api/user', { 
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, misalnya tampilkan pesan error atau arahkan ke halaman login
      } finally {
        setIsLoading(false); // Selesai loading setelah berhasil atau error
      }
    };

    fetchUserData();
  }, [navigation]); 

  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    navigation.navigate('Login');
  };

  // Tampilkan indikator loading saat data sedang dimuat
  if (isLoading) {
    return <ActivityIndicator size="large" />; 
  }

  return (
    <View>
      {/* Hanya render jika userData sudah ada */}
      {userData && (
        <>
          <Text>Ahoy, {userData.name.toUpperCase()}! Welcome to the treasure cove!</Text>
          <Text>Id Anda Adalah, {userData.id}! Welcome to the treasure cove!</Text>
          {userData && <ServiceHistoryCard userId={userData.id} />}
        </>
      )}
      <Button title="Abandon Ship (Logout)" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;