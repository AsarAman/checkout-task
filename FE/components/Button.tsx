import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as widthToDp } from "react-native-responsive-screen";

export default function Button({ title, onPress, style, textSize, large,bg }: any) {
  return (
    <View style={[styles.container, style, large && styles.large,{backgroundColor:bg}]}>
      <Text
        style={[
          styles.text,
          { fontSize: textSize ? textSize : widthToDp(3.5) },
          ,
        ]}
        onPress={onPress}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#444755",
    borderStartColor:'black',
    padding: 3,
    width: widthToDp(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  large: {
    width: "100%",
    marginTop: 10,
    height: widthToDp(12),
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});