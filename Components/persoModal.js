import React from "react";
import { View, Modal, StyleSheet, Dimensions,TouchableOpacity } from "react-native";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const PersoModal = (props) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <TouchableOpacity activeOpacity={0.9} style={styles.modalBackground} onPress={props.closeModal}>
          <View style={styles.modalContent}>{props.children}</View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent:{
    backgroundColor:"white",
    // width:screenWidth * 0.9,
    // height:screenHeight * 0.35,
    borderRadius:25,
    alignItems:"center",
    justifyContent:"center",

  },
});

export default PersoModal;
