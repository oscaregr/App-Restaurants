import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import { IconButton } from "../components";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { db } from "../config/firebase";

const auth = Firebase.auth();

export default function HomeScreen({ navigation }) {
  const { setSelectedRestaurant } = useContext(AuthenticatedUserContext);

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    db.collection("Restaurantes").onSnapshot((querySnapshot) => {
      const restaurants = [];
      querySnapshot.docs.forEach((doc) => {
        const { direccion, nombre, rfc, tipo, uid } = doc.data();
        restaurants.push({
          idRestaurante: doc.id,
          direccion,
          nombre,
          rfc,
          tipo,
          uid,
        });
      });

      setRestaurants(restaurants);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <View style={styles.restaurantButton}>
        <Button
          onPress={() => navigation.navigate("Foot")}
          backgroundColor="#3b6e58"
          title="Agregar restaurante"
          tileColor="#fff"
          titleSize={20}
          // containerStyle={{
          //   marginBottom: 24,
          // }}
        />
      </View>

      {restaurants.map((rest) => (
        <View key={rest.idRestaurante} style={styles.restaurantButton}>
          <Button
            onPress={() => {
              navigation.navigate("Menu"), setSelectedRestaurant(rest);
            }}
            color="#99681d"
            //467fd0
            title={rest.nombre}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ed9209",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
  restaurantButton: {
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: "#99681d",
  },
});
