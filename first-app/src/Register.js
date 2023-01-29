import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function Register() {
    const navigation = useNavigation();

    const [firstNmae, setFirstNmae] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    // const handleLogin = () => {
    //   // Perform login logic here
    //   console.log(`Username: ${firstNmae} Password: ${secondName}`);
    // };

    const regissterClient = async (e) => {
      e.preventDefault()
      try {
          await axios.post("http://localhost:8000/api/v1/user/register",{
              firstNmae,
              secondName,
              email,
              password
          }).then((res)=>{
            setFirstNmae('')
            setSecondName('')
            setEmail('')
            setPassword('')
            navigation.navigate('Login');
        })
      } catch (error) {
        console.log(error)
        setErrorMessage(error.response.data.message)
      }
  }

  return (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
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
          placeholder="First Name"
          onChangeText={(text) => setFirstNmae(text)}
          value={firstNmae}
        />
        <TextInput
          style={styles.input}
          placeholder="Second Name"
          onChangeText={(text) => setSecondName(text)}
          value={secondName}
        />
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
        <TouchableOpacity style={styles.buttonContainer} onPress={regissterClient}>
          <Text style={styles.buttonText}>Register</Text>
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