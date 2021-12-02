import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button as RNButton,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";
import { db } from "../config/firebase";

const auth = Firebase.auth();
console.log(db);

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  //? to date picker
  const onChange = (event, selectedDate) => {
    const currentData = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentData);

    let tempDate = new Date(currentData);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    console.log(name, phoneNumber, text, email, password);
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      db.collection("users").doc(cred.user.uid).set({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        date: date,
      });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Crear cuenta nueva.</Text>
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="account"
        placeholder="Nombre"
        autoCapitalize="none"
        keyboardType="default"
        textContentType="name"
        autoFocus={true}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="phone"
        placeholder="Teléfono"
        autoCapitalize="none"
        keyboardType="number-pad"
        textContentType="telephoneNumber"
        value={phoneNumber}
        maxLength={10}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="calendar-account"
        placeholder="Fecha nacimiento"
        autoCapitalize="none"
        autoCorrect={false}
        // secureTextEntry={passwordVisibility}
        // textContentType="password"
        // rightIcon={rightIcon}
        value={text}
        onChangeText={onChange}
        onFocus={() => setShow("date")}
        // handlePasswordVisibility={handlePasswordVisibility}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="email"
        placeholder="Correo electrónico"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="lock"
        placeholder="Contraseña"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />

      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}

      <Button
        onPress={onHandleSignup}
        backgroundColor="#3b6e58"
        title="Registrarse"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />

      <RNButton
        onPress={() => navigation.navigate("Login")}
        title="Ir a Inicar sesión"
        color="#99681d"
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
});
