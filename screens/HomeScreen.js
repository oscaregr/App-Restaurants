import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'


import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    Firebase.firestore().collection('Restaurantes').onSnapshot(querySnapshot => {

      const restaurants = [];

      querySnapshot.docs.forEach(doc => {
        const { direccion, nombre, rfc, tipo } = doc.data()
        restaurants.push({
          direccion,
          nombre,
          rfc,
          tipo
        })
      });

      setRestaurants(restaurants)
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        />
        
      </View>
      <Button
        onPress={() => navigation.navigate('Foot')}
        backgroundColor='#467fd0'
        title='crear negocio'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />

      {
        restaurants.map(restaurant => {
          return (

          )
        })
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  }
});