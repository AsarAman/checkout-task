// Importing a few package and components
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { heightPercentageToDP as heightToDp } from "react-native-responsive-screen";

export default function InputField({placeholder, onChangeText,disabled }: {placeholder: string, onChangeText: any, disabled?: boolean}) {

  return (
    // Creating a view to hold the user's input
    <View style={styles.container}>
      {/* Creating a text input for the user's first name */}
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        editable={!disabled}
        

      />
      
    </View>
  );
}

// Creating a stylesheet to style the view
const styles = StyleSheet.create({
  container: {
    marginTop: heightToDp(2),
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
  },
});