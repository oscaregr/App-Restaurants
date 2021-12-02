import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { IconButton } from "../components";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { db } from "../config/firebase";

const auth = Firebase.auth();

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    db.collection("Restaurantes").onSnapshot((querySnapshot) => {
      const restaurants = [];
      querySnapshot.docs.forEach((doc) => {
        const { direccion, nombre, rfc, tipo, uid } = doc.data();
        restaurants.push({
          id: doc.id,
          direccion,
          nombre,
          rfc,
          tipo,
          uid
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
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
      </View>
      <Button
        onPress={() => navigation.navigate("Foot")}
        backgroundColor="#467fd0"
        title="Agregar restaurante"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
      {restaurants.map((rest) => (
        <Button
          key={rest.id}
          onPress={() => navigation.navigate("Menu")}
          title={rest.nombre}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e93b81",
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
});
