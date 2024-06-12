import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as widthToDp
} from "react-native-responsive-screen";
const RadioButton = ({ onPress, selected, children }:any) => {
  return (
    <View style={styles.radioButtonContainer}>
     
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginRight: 45,
  },
  radioButton: {
    height: 14,
    width: 14,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "black",
  },
  radioButtonText: {
    fontSize: widthToDp(3.5),
  },
});
export default RadioButton;