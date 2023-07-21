import { View, Text, StyleSheet } from "react-native";
import React, { useSate } from "react";
import { TextInput, Button } from "react-native-paper";
import { Config } from "../config";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
import { NativeBaseProvider, Input, Stack, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [show, setShow] = React.useState(false);

  const loginEmailPassword = async () => {
    const auth = getAuth();
    if (email !== "" && password !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigation.navigate("Home");
      } catch (error) {
        console.log(error.message);
        alert("please fill in the form or wrong password");
      }
    } else {
      alert("please fill in the form  or wrong password");
    }
  };

  // sign out form
  // const auth = getAuth()
  // signOut(auth)
  //   .then(() => {
  //     // Sign-out successful.
  //     console.log("Sign-out successful");
  //   })
  //   .catch((error) => {
  //     // An error happened.
  //     console.log("An error occurred", error);
  //   });

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 40,
          justifyContent: "center",
          textAlign: "center",
          fontSize: 50,
          fontWeight: "bold",
          color: "#00bfff",
        }}>
        Login Here
      </Text>

      <TextInput
        mode="flat"
        style={{
          marginTop: 100,
          justifyContent: "center",
          textAlign: "center",
        }}
        placeholder="enter your email address"
        onChangeText={(email) => setEmail(email)}
        value={email}
        KeyboardType="email-address"
      />

      <TextInput
        mode="flat"
        style={{ marginTop: 30, justifyContent: "center", textAlign: "center" }}
        onChangeText={(password) => setPassword(password)}
        value={password}
        autoCompleteType="password"
        secureTextEntry
        placeholder="enter password"
      />

      <Button
        style={{ marginTop: 30, color: "#00bfff" }}
        label="uppercase"
        mode="contained"
        onPress={loginEmailPassword}>
        Login
      </Button>

      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
        }}>
        Forgot Password
      </Text>

      <Button mode="contained" onPress={() => navigation.navigate("Register")}>
        Register your account
      </Button>
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

export default LoginScreen;
