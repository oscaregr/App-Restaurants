import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function addMenuScreen({ navigation }) {
  const [nombrePlatillo, setNombrePlatillo] = useState('');
  const [descPlatillo, setDescPlatillo] = useState('');
  const [precio, setPrecio] = useState('');
  const [idRestaurante, setIdRestaurante] = useState('');
  

  const addAMenu = () => {

    Firebase.firestore().collection('Menu').add({
      nombrePlatillo: nombrePlatillo,
      descPlatillo: descPlatillo,
      precio: precio,
      idRestaurante: idRestaurante
      
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
        leftIcon='silverware-fork-knife'
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
        leftIcon='silverware'
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
        leftIcon='currency-usd'
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
      <Button
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
    backgroundColor: '#D2E6AA',
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