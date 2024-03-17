import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { DoesTokenExist, SaveToken, notifyMessage } from "../utils";
import { AuthLogin } from "../api";

export default function LoginPage() {
  useEffect(() => {
    (async () => {
      if (!DoesTokenExist()) {
        router.replace("/Home/");
        notifyMessage("Already logged in");
      }
    })();
  }, []);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async () => {
    // Check if the phone number is valid
    if (!__DEV__) {
      if (phoneNumber.length < 10) {
        notifyMessage("Please enter a valid phone number");
        return;
      }
      // Check if the name is valid
      if (name.length < 3) {
        notifyMessage("Please enter a valid name");
        return;
      }
    }


    notifyMessage("Logging in");
    try {
      
      var response = await AuthLogin(name, phoneNumber);
      
    } catch (error) {
      console.log(error);
      notifyMessage("Error logging in");
      return
    }
    const token = response.token;
    await SaveToken(token);
    notifyMessage("Redirecting...");
    router.replace("/Home/");
  };

  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Login Page
      </Text>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          marginTop: 5,
          color: "gray",
        }}
      >
        Enter your name and phone number to login
      </Text>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View style={styles.inputCont}>
          <Text style={styles.labels}>Your Phone Number</Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.inputElem}
            placeholder="eg. 809856..."
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View style={styles.inputCont}>
          <Text style={styles.labels}>Your Full name</Text>
          <TextInput
            autoComplete="name"
            style={styles.inputElem}
            placeholder="eg. Himanshu Bhat"
            onChangeText={(text) => setName(text)}
          />
        </View>
        {/* Button for logging in */}

        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button title="Login/Signup" onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputCont: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  labels: {
    fontSize: 12,
    color: "gray",
  },
  inputElem: {
    padding: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});
