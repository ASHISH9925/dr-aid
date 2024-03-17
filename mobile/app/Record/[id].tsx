import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RecordToHTML, notifyMessage } from "../../utils";
import * as Print from "expo-print";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";
import { Buffer } from "buffer";

export default function Record() {
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log("ID", id);

  // Changing base64 to string
  const data = JSON.parse(Buffer.from(id, "base64").toString("utf-8"));
  return (
    <View>
      <Navbar />
      <View style={{ padding: 5 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Record from Dr. Vishwesh Bhat
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Patient's name */}
          <View>
            <Text style={styles.label}>Patient's Name:</Text>
            <Text>{data.name}</Text>
          </View>
          {/* Next Visit */}
          <View>
            <Text style={styles.label}>Next Visit date:</Text>
            <Text>{data.next_visit}</Text>
          </View>
          {/* Diagnosis */}
          <View>
            <Text style={styles.label}>Diagnosis:</Text>
            <Text>{data.diagnosis}</Text>
          </View>

          {/* Prescription */}
          <View>
            <Text style={styles.label}>Prescription:</Text>
            <Text>{data.prescription}</Text>
          </View>

          {/* Bill */}
          <View>
            <Text style={styles.label}>Bill:</Text>
            <Text>{data.bill}</Text>
          </View>

          {/* Notes */}
          <View>
            <Text style={styles.label}>Comments:</Text>
            <Text>{data.notes}</Text>
          </View>

          {/* Button For Export to PDF */}
          <TouchableOpacity
            onPress={async () => {
              notifyMessage("Download will start shortly");
              const htmlText = RecordToHTML(
                data.name,
                data.doctor_name,
                data.number,
                data.diagnosis,
                data.prescription,
                data.next_visit,
                data.notes,
                data.bill
              );
              const pdf = await Print.printToFileAsync({ html: htmlText });
              console.log(pdf);
              const url = pdf.uri;
              try {
                const shareRes = await Sharing.shareAsync(url);
                console.log(shareRes);
              } catch (error) {
                console.error("An error occurred", error);
              }
            }}
          >
            <View
              style={{
                backgroundColor: "lightgray",
                padding: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="document-text-outline" size={24}></Ionicons>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Share as PDF
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Navbar() {
  return (
    <TouchableOpacity onPress={router.back}>
      <View
        style={{
          padding: 5,
        }}
      >
        <Ionicons name="arrow-back-outline" size={28} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
