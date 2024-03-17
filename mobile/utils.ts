import { Platform, ToastAndroid, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Buffer } from "buffer";

export function notifyMessage(msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}

export async function DoesTokenExist() {
  const token = await SecureStore.getItemAsync("token");
  return token;
}

export async function SaveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}
function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export async function GetUserDataFromToken() {
  const token = await SecureStore.getItemAsync("token");
  return parseJwt(token);
}

export function RecordToHTML(
  PATIENT_NAME,
  DOCTOR_NAME,
  PHONE_NUMBER,
  DIAGNOSIS,
  PRESCRIPTION,
  NEXT_VISIT,
  NOTES,
  BILL,

) {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dr. Aid Medical Record for ${PATIENT_NAME}</title>
  </head>
  <body>
    <h1>Medical report</h1>
    <h3>By Dr. ${DOCTOR_NAME}</h3>
    <p>
      <strong>Patient Name:</strong> ${PATIENT_NAME} <br />
      <strong>Phone Number:</strong> ${PHONE_NUMBER} <br />
      <strong>Diagnosis:</strong> ${DIAGNOSIS} <br />
      <strong>Prescription:</strong> ${PRESCRIPTION} <br />
      <strong>Next Visit:</strong> ${NEXT_VISIT} <br />
      <strong>Notes:</strong> ${NOTES} <br />
      <strong>Bill:</strong> ${BILL} <br />

    </p>

    <footer>
      <p>Dr. Aid Medical Record</p>
      <p>
        This is a digital document exported from Dr. Aid
      </p>
    </footer>
  </body>
</html>

  `;
}
