import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


export default function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.title}>{title}</Text>
        <Entypo name="cross" size={24} color="black" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
  },
});
