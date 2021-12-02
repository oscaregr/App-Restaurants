import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";

import { useState } from "react";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";

import { Button, InputField, ErrorMessage, IconButton } from "../components";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const auth = Firebase.auth();

export default function FootupScreen({ navigation }) {
  const [restaurant, setRestaurant] = useState("");
  const [direccion, setDireccion] = useState("");
  const [rfc, setRFC] = useState("");
  const [tipo, setTipo] = useState("");
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const saveNewRestaurant = () => {
    if (
      direccion.length > 0 &&
      restaurant.length > 0 &&
      rfc.length > 0 &&
      tipo.length > 0 &&
      user.uid.length > 0
    ) {
      Firebase.firestore().collection("Restaurantes").add({
        direccion: direccion,
        nombre: restaurant,
        rfc: rfc,
        tipo: tipo,
        uid: user.uid,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <IconButton
          name="back"
          size={24}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text style={styles.title}>Registrar Restaurante</Text>
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="store"
        placeholder="Nombre del restaurante"
        autoCapitalize="none"
        autoFocus={true}
        value={restaurant}
        onChangeText={(text) => setRestaurant(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="map-marker"
        placeholder="Direccion"
        autoCapitalize="none"
        autoCorrect={true}
        value={direccion}
        onChangeText={(text) => setDireccion(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="file-document"
        placeholder="RFC"
        autoCapitalize="none"
        autoCorrect={true}
        value={rfc}
        onChangeText={(text) => setRFC(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="typewriter"
        placeholder="Tipo"
        autoCapitalize="none"
        autoCorrect={true}
        value={tipo}
        onChangeText={(text) => setTipo(text)}
      />

      <Button
        onPress={saveNewRestaurant}
        backgroundColor="#467fd0"
        title="Crear"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ed9209",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 24,
  },
});
