import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { GetUserDataFromToken, notifyMessage } from "../../utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatientRecords } from "../../api";
import { Buffer } from "buffer";

export default function HomePage() {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["records"],
    queryFn: getPatientRecords,
  });
  // if (isPending) {
  //   return <Text>Loading...</Text>;
  // }
  // if (isError) {
  //   return <Text>Error: {error.message}</Text>;
  // }

  const [name, setName] = useState("...");
  useEffect(() => {
    console.log("Getting Name");
    GetUserDataFromToken()
      .then((data) => {
        setName(data.name);
      })
      .catch((err) => {
        console.log(err);
        notifyMessage("Error getting name");
      });
  }, []);
  if (isPending) {
    return <Text>Loading...</Text>;
  }
  console.log("Records", data.data);
  var records: any[] = data.data.reverse();
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={() => {
              queryClient.invalidateQueries("records");
            }}
          />
        }
      >
        <Text
          style={{
            fontSize: 24,
            paddingTop: 8,
            paddingLeft: 8,
          }}
        >
          Hello {name},
        </Text>
        <Text style={{ paddingLeft: 8, fontSize: 14, color: "#595959" }}>
          You have total {records.length} record(s)
        </Text>
        <View
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {records.map((record, index) => {
            return (
              <Record
                key={index}
                name={record.doctor_name}
                date={record.date}
                description={record.diagnosis}
                record={record}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function Record({
  name = "Dr. Vishwesh Sharma",
  date = "1 day(s) ago",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, fugit...",
  record,
}) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          record = Buffer.from(JSON.stringify(record)).toString("base64");
          router.push("/Record/" + record);
        }}
      >
        <View style={styles.recordBgr}>
          <View style={styles.lineFlex}>
            <Text style={styles.bold}>Dr. {name}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View>
            <Text>{description.slice(0, 30)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  recordBgr: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 5,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  bold: {
    fontWeight: "bold",
    fontSize: 14,
  },
  lineFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
