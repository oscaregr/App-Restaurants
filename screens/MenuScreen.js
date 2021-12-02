import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { IconButton } from "../components";
import Firebase from "../config/firebase";
import { db } from "../config/firebase";

const auth = Firebase.auth();

export default function MenuScreen({ navigation }) {
  
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
            precio
          });
        });
  
        setPlatillos(platillos);
      });
    }, []);
  
    return (
      <ScrollView style={styles.container}>
        <StatusBar style='dark-content' />
        
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
          <View
            key={rest.id}
            >
                <Text>{rest.descPlatillo}</Text>
                <Text>{rest.nombrePlatillo}</Text>
                <Text>{rest.precio}</Text>
            </View>
        ))}
      </View>
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