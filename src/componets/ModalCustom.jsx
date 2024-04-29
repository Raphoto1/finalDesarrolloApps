import { StyleSheet, Text, View, Modal, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";

const ModalCustom = ({ title, mainText, btnGreenActive, btnRedActive, btnAuxActive, handleGreen, handleRed, handleAux, handleModal, modalVisible }) => {
  //set handlers on parent!!!!!!!!
  //Must Use handleModal

  const [btnGreen, setBtnGreen] = useState(false);
  const [btnRed, setBtnRed] = useState(false);
  const [btnAux, setBtnAux] = useState(false);

  useEffect(() => {
    btnGreenActive && handleGreen ? setBtnGreen(true) : null;
    btnRedActive && handleRed ? setBtnRed(true) : null;
    btnAuxActive && handleAux ? setBtnAux(true) : null;
  }, []);

  return (
    <View style={styles.modalGeneral}>
      <Button title={title} onPress={handleModal} />
      <Modal style={styles.modal} visible={modalVisible} animationType='slide' transparent={true}>
        <View style={styles.modalStyles}>
          <View style={styles.modalContainer}>
            <View style={styles.textContainer}>
              <Text>{mainText}</Text>
            </View>
            <View style={styles.btnGroup}>
              {btnGreen ? <Button title={btnGreenActive} onPress={handleGreen} color={"green"} /> : null}
              {btnAux ? <Button title={btnAuxActive} onPress={handleAux} color={"orange"} /> : null}
              {btnRed ? <Button title={btnRedActive} onPress={handleRed} color={"red"} /> : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
    modal: {
        height:100
    },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
    modalGeneral: {
      
    alignItems: "center",
    justifyContent: "center",
  },
  modalStyles: {
    flex: 1,
    width: "80%",
    backgroundColor: colors.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
