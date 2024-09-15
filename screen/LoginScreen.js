import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';   


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');   

  const [responseMessage, setResponseMessage] = useState(null); // Tambahkan state untuk pesan respons

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.160.137:8000/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'   
 
        }
      });

      // Periksa respons dari Axios
      console.log('Axios response:', response.data);
      setResponseMessage('Login successful!');

      await AsyncStorage.setItem('jwtToken', response.data.token);
      navigation.navigate('Home');
    } catch (error) {
      // Handle error, misalnya tampilkan pesan error
      if (error.response) {
        // Server merespons dengan status code selain 2xx
        console.error('Error response:', error.response.data);
        setResponseMessage('Error: ' + error.response.data.message || 'Something went wrong');
      } else {
        console.error('Error:', error.message);
        setResponseMessage('Error: ' + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password"   
 secureTextEntry={true} onChangeText={setPassword} />
      <Button style={styles.button} title="Login" onPress={handleLogin}   
 />

      {/* Tampilkan pesan respons jika ada */}
      {responseMessage && <Text>{responseMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',   
    padding: 20,
  },
  input: {
    height: 40,
    width:   
 '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius:5,
    marginTop: 20,
  },
 

});


export default LoginScreen;