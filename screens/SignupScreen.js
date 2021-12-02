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
  const [precio, setPrecio] = useState('');
  

  const addAMenu = () => {

    Firebase.firestore().collection('Menu').add({
      nombrePlatillo: nombrePlatillo,
      descPlatillo: descPlatillo,
      precio: precio
      
    })
    
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Añadir platillo</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='store'
        placeholder='Nombre del platillo'
        autoCapitalize='none'
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
        leftIcon='map-marker'
        placeholder='Descripción del platillo'
        autoCapitalize='none'
        autoCorrect={true}
        value={descPlatillo}
        onChangeText={text => setDescPlatillo(text)}
      />
       
       <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='file-document'
        placeholder='Precio'
        autoCapitalize='none'
        autoCorrect={true}
        value={precio}
        onChangeText={text => setPrecio(text)}
      />

        

      <Button
        onPress={addAMenu}
        backgroundColor='#467fd0'
        title='Añadir'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Login')}
        title='Volver'
        color='#fd9644'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c83609',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  }
});