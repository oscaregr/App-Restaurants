import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function FootupScreen({ navigation }) {
  const [restaurant, setRestaurant] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rfc, setRFC] = useState('');
  const [tipo, setTipo] = useState('');

  const saveNewRestaurant = () => {

    Firebase.firestore().collection('Restaurantes').add({
      direccion: direccion,
      nombre: restaurant,
      rfc: rfc,
      tipo: tipo
    })
    
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Rigistrar Restaurante</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Nombre del restaurante'
        autoCapitalize='none'
        autoFocus={true}
        value={restaurant}
        onChangeText={text => setRestaurant(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Direccion'
        autoCapitalize='none'
        autoCorrect={true}
        value={direccion}
        onChangeText={text => setDireccion(text)}
      />
       
       <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='RFC'
        autoCapitalize='none'
        autoCorrect={true}
        value={rfc}
        onChangeText={text => setRFC(text)}
      />

        <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Tipo'
        autoCapitalize='none'
        autoCorrect={true}
        value={tipo}
        onChangeText={text => setTipo(text)}
      />

      <Button
        onPress={saveNewRestaurant}
        backgroundColor='#467fd0'
        title='Crear'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Home')}
        title='Volver'
        color='#fd9644'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42ba96',
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