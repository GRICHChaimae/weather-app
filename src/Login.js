import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

export default function Login() {
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = () => {
      // Perform login logic here
      console.log(`Email: ${email} Password: ${password}`);
    };

    const loginClient = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/api/users/login",{
                email,
                password
            }).then((res)=>{
                navigation.navigate('Weather');
          })
        } catch (error) {
          console.log(error)
          setErrorMessage(error.response.data.message)
          Alert.alert(
            {errorMessage},
            [ { text: "Understood", onPress: () => console.log("OK Pressed") }]
          );
        }
    }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image 
          source={require('path/to/your/logo.png')}
          style={styles.logo}
        /> */}
        <Text style={styles.logoText}>Your App Name</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={loginClient}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50
    },
    logo: {
      width: 100,
      height: 100,
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 10
    },
    formContainer: {
      width: '80%',
    },
    input: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.7)',
      marginBottom: 20,
      padding: 10,
      color: '#000',
      borderRadius: 5,
    },
    buttonContainer: {
      backgroundColor: '#2980b9',
      paddingVertical: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });