import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  
  const [nombrePlatillo, setNombrePlatillo] = useState('');
  const [descPlatillo, setDescPlatillo] = useState('');
  const [precio, setPrecio] = useState('')
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (nombrePlatillo !== '' && descPlatillo !== '' && precio !== '') {
        await Firebase.collection("Platillos").add({nombrePlatillo, descPlatillo, precio});
        alert('Cambios Guardados');
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Registrar nuevo platillo</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='silverware-fork-knife'
        placeholder='Nombre del platillo'
        autoCapitalize='none'
       // keyboardType='email-address'
        textContentType='text'
        autoFocus={true}
        value={nombrePlatillo}
        onChangeText={text => setNombrePlatillo(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='silverware'
        placeholder='Descripción del platillo'
        autoCapitalize='none'
        autoCorrect={false}
        //secureTextEntry={passwordVisibility}
        textContentType='text'
        //rightIcon={rightIcon}
        value={descPlatillo}
        onChangeText={text => setDescPlatillo(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='currency-usd'
        placeholder= 'Precio'
        autoCapitalize='none'
       
        textContentType='text'
        autoFocus={true}
        value={precio}
        onChangeText={text => setPrecio(text)}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <Button
        onPress={onHandleSignup}
        backgroundColor='#467fd0'
        title='Agregar a menú '
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Login')}
        title='Regresar'
        color='#ffc107'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#88E8F8',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    alignSelf: 'center',
    paddingBottom: 24
  }
});