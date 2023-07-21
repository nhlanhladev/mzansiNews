import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { db } from "../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc, addDoc, collection } from "firebase/firestore";

import { initializeApp } from "firebase/app";

// const image = { uri: "https://reactjs.org/logo-og.png" };

// const image = "uri:../assets/splash.png";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  // register a new user
  const auth = getAuth();

  const signInButton = async () => {
    if (email !== "" && password !== "" && password == confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        //  const user = userCredential.user;
        navigation.navigate("Home");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter equal password or fill in the form");
      // alert("Please fill in the form");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          justifyContent: "center",
          textAlign: "center",
          fontSize: 40,
          marginBottom: 40,
          fontWeight: "bold",
          color: "#00bfff",
        }}>
        Register Here
      </Text>

      {/* <TextInput
        style={{
          marginTop: 10,
          borderWidth: 1,
        }}
        mode="flat"
        label="Enter Your FirstName"
        value={firstName}
        onChangeText={(firstName) => setFirstName(firstName)}
      /> */}

      <TextInput
        style={{
          marginTop: 10,
          borderWidth: 1,
        }}
        mode="flat"
        label="Enter Email Address"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        style={{
          marginTop: 10,
          borderWidth: 1,
        }}
        mode="flat"
        label=" Enter Your Password"
        value={password}
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
        right={<TextInput.Icon icon="eye" />}
      />

      <TextInput
        style={{
          marginTop: 10,
          borderWidth: 1,
        }}
        mode="flat"
        label="confirm password"
        value={confirmPassword}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />

      <Button
        style={{ marginTop: 20, fontSize: 30 }}
        mode="contained"
        onPress={signInButton}>
        Register
      </Button>
      <Text>
        Already have an account ?
        <Text
          onPress={() => navigation.navigate("Login")}
          style={{ color: "#00bfff", fontSize: 18 }}>
          {" "}
          LogIn{" "}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    textAlign: "center",

    justifyContent: "center",
  },
});

export default RegisterScreen;
