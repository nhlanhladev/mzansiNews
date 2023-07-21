import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { TextInput, Button, Input } from "react-native-paper";
import React, { useState } from "react";
import { db } from "../config";
import { doc, setDoc } from "firebase/firestore";
import "firebase/firestore";
import "firebase/auth";

// import * as firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import "firebase/storage";
// import { getStorage, ref } from "firebase/storage";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
// import { AsyncStorage } from "react-native";

import { storage } from "../config";
import * as ImagePicker from "expo-image-picker";

import { launchCamera, launchImageLibrary } from "expo-image-picker";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const AddNewsScreen = () => {
  // const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [newsWriter, setNewsWriter] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    // const storage = getStorage();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    try {
      await ref;
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
    Alert.alert("Photo uploaded!!!");
    setImage(result.uri);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  // const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
  // //   var ref = firebase.storage().ref().child(filename).put(blob);

  // const storage = getStorage();
  // // const files = image.target.files;
  // const storageRef = ref(storage, pickImage);

  // uploadBytes(storageRef, filename).then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  // });

  const submitData = () => {
    setDoc(doc(db, "members", "LA"), {
      title: title,
      newsWrite: newsWriter,
      image: image,
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <ScrollView style="{style.container}">
      <Text
        style={{
          marginTop: 20,
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          color: "#00bfff",
        }}>
        ADD NEWS YOU SAW
      </Text>
      <Text
        style={{
          marginTop: 20,
          fontWeight: "bold",
        }}>
        Title News
      </Text>
      <TextInput
        value={title}
        onChangeText={(title) => setTitle(title)}
        style={styles.titleNews}
        label="enter title news"
      />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Add Mzansi News</Text>
      <TextInput
        value={newsWriter}
        onChangeText={(newsWriter) => setNewsWriter(newsWriter)}
        style={styles.contentNews}
        multiline={true}
        numberOfLines={4}
        label="write here mzansi Journalist"
      />

      <Text
        style={{
          textAlign: "center",
          justifyContent: "center",
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 10,
          color: "#00bfff",
        }}>
        UPLOAD IMAGES HERE
      </Text>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 500, height: 300 }}
        />
      )}

      {/* <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload image</Text>
      </TouchableOpacity> */}

      <Button mode="outlined" onPress={pickImage} style={{ marginTop: 20 }}>
        Pick An Image
      </Button>

      <Button
        Icon="upload-outline"
        mode="outlined"
        onPress={uploadImage}
        style={{ marginTop: 20 }}>
        Upload Image
      </Button>

      <Button mode="contained" onPress={submitData} style={{ marginTop: 20 }}>
        Submit News
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleNews: {
    marginTop: 20,
    fontWeight: "bold",
  },
  contentNews: {
    marginTop: 20,
  },

  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    borderRadius: 5,
    width: 200,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
});

export default AddNewsScreen;
