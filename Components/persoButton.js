import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";

import Colors from "../Constants/Colors";

const PersoButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.Button, ...props.style }}
      activeOpacity={0.6}
      onPress={props.onPress}
    >
      <Text style={styles.text}> {props.children} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    borderRadius: 2,
    paddingVertical: 10,
    backgroundColor: Colors.Green_grean,
    alignItems: "center",
    
  },
  text: {
    fontSize: Dimensions.get("window").width * 0.05,
    color: "white",
  },
});

export default PersoButton;
