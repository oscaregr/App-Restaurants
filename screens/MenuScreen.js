import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

import { IconButton, InputField } from "../components";
import Firebase from "../config/firebase";
import { db } from "../config/firebase";
import { FullWindowOverlay } from "react-native-screens";

const auth = Firebase.auth();

export default function MenuScreen({ navigation }) {
  const { selectedRestaurant } = useContext(AuthenticatedUserContext);
  const [nombrePlatillo, setNombrePlatillo] = useState("");
  const [descPlatillo, setDescPlatillo] = useState("");
  const [precio, setPrecio] = useState("");
  const [idRestaurante, setIdRestaurante] = useState("");

  const [platillos, setPlatillos] = useState([]);

  useEffect(async () => {
    db.collection("Menu").onSnapshot((querySnapshot) => {
      const platillos = [];
      querySnapshot.docs.forEach((doc) => {
        const { descPlatillo, nombrePlatillo, precio, idRestaurante } =
          doc.data();
        platillos.push({
          id: doc.id,
          descPlatillo,
          nombrePlatillo,
          precio,
          idRestaurante,
        });
      });
      setPlatillos(platillos);
    });
    setIdRestaurante(selectedRestaurant.idRestaurante);
  }, []);

  const addAMenu = () => {
    Firebase.firestore().collection("Menu").add({
      nombrePlatillo: nombrePlatillo,
      descPlatillo: descPlatillo,
      precio: precio,
      idRestaurante: idRestaurante,
    });
    setNombrePlatillo("");
    setDescPlatillo("");
    setPrecio("");
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark-content" />
      <View style={styles.row}>
        <IconButton
          name="back"
          size={24}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View>
        <Text style={styles.title}>
          Añadir platillo a menu de: {selectedRestaurant.nombre}
        </Text>

        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          leftIcon="silverware-fork-knife"
          placeholder="Nombre del platillo"
          autoCapitalize="none"
          autoFocus={true}
          value={nombrePlatillo}
          onChangeText={(text) => setNombrePlatillo(text)}
        />
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          leftIcon="silverware"
          placeholder="Descripción del platillo"
          autoCapitalize="none"
          autoCorrect={true}
          value={descPlatillo}
          onChangeText={(text) => setDescPlatillo(text)}
        />

        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          leftIcon="currency-usd"
          placeholder="Precio"
          autoCapitalize="none"
          autoCorrect={true}
          value={precio}
          onChangeText={(text) => setPrecio(text)}
        />

        <Button
          onPress={addAMenu}
          backgroundColor="#467fd0"
          title="Añadir"
          tileColor="#fff"
          titleSize={20}
          containerStyle={{
            marginBottom: 24,
          }}
        />
      </View>
      <View style={styles.platillosContainer}>
        <View style={{ width: "33%", alignItems: "center" }}>
          <Text style={styles.headers}>Platillo</Text>
        </View>
        <View style={{ width: "33%", alignItems: "center" }}>
          <Text style={styles.headers}>Descripción</Text>
        </View>
        <View style={{ width: "33%", alignItems: "center" }}>
          <Text style={styles.headers}>Precio</Text>
        </View>

        {/* <Text>{rest.precio}</Text> */}
      </View>
      <ScrollView>
        {platillos.map((rest) => (
          <View key={rest.id}>
            {rest.idRestaurante === selectedRestaurant.idRestaurante ? (
              <View style={styles.cardPlatillo}>
                <View style={{ width: "33%", alignItems: "center" }}>
                  <Text style={styles.textCard}>{rest.nombrePlatillo}</Text>
                </View>
                <View style={{ width: "33%", alignItems: "center" }}>
                  <Text style={styles.textCard}>{rest.descPlatillo}</Text>
                </View>
                <View style={{ width: "33%", alignItems: "center" }}>
                  <Text style={styles.textCard}>${rest.precio}</Text>
                </View>
              </View>
            ) : null}
            {/* <Text>{rest.precio}</Text> */}
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ed9209",
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    margin: 16,
    // paddingTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
  cardPlatillo: {
    // width: "98%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    margin: 4,
    borderRadius: 8,
    height: 48,
    alignItems: "center",
  },
  headers: {
    color: "#ffffff",
    fontSize: 16,
  },
  textCard: {
    color: "#000000",
  },
  platillosContainer: {
    width: "98%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    backgroundColor: "#9c6f2d",
    margin: 4,
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    marginTop: 8,
  },
});
