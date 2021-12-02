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

  console.log(selectedRestaurant);
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    db.collection("Menu").onSnapshot((querySnapshot) => {
      const platillos = [];
      querySnapshot.docs.forEach((doc) => {
        const { descPlatillo, nombrePlatillo, precio } = doc.data();
        platillos.push({
          id: doc.id,
          descPlatillo,
          nombrePlatillo,
          precio,
        });
      });
      setPlatillos(platillos);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Agregar a menú</Text>
      {/* <Button
        onPress={() => navigation.goBack()}
        backgroundColor="#467fd0"
        title="Atras"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      /> */}

      <View>
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          // leftIcon="store"
          placeholder="Nombre de platillo"
          autoCapitalize="none"
          autoFocus={true}
          // value={restaurant}
          // onChangeText={(text) => setRestaurant(text)}
        />
        <InputField
          inputStyle={{
            fontSize: 14,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          // leftIcon="store"
          placeholder="Descripción"
          autoCapitalize="none"
          autoFocus={true}
          // value={restaurant}
          // onChangeText={(text) => setRestaurant(text)}
        />
        <Button
          onPress={() => navigation.navigate("Foot")}
          backgroundColor="#467fd0"
          title="Agregar"
          tileColor="#fff"
          titleSize={20}
          containerStyle={{
            marginBottom: 24,
          }}
        />
      </View>
      <View style={styles.platillosContainer}>
        <Text style={styles.headers}>Platillo</Text>
        <Text style={styles.headers}>Descripción</Text>
        {/* <Text>{rest.precio}</Text> */}
      </View>
      <ScrollView>
        {platillos.map((rest) => (
          <View key={rest.id} style={styles.cardPlatillo}>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={styles.textCard}>{rest.nombrePlatillo}</Text>
            </View>
            <View style={{ width: "50%", alignItems: "center"  }}>
              <Text style={styles.textCard}>{rest.descPlatillo}</Text>
            </View>
            {/* <Text>{rest.precio}</Text> */}
          </View>
        ))}
      </ScrollView>
    </View>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    margin: 16,
    paddingTop: 20,
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
    fontSize: 20,
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
    marginTop:8
  },
});
