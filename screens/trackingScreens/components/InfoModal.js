import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Modal, Portal, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { modalStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function InfoModal({text, icon1, icon2}) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();



  return (
    <>
      <Portal style={{ ...general.scaffold, justifyContent: "center" }}>
        <Modal
          visible={visible}
          style={{ ...modalStyle.modal, backgroundColor: colors.background }}
        >
          <IconButton
            icon="close"
            iconColor={colors.primary}
            size={20}
            onPress={() => setVisible(false)}
          />
          <Text style={{ color: colors.text }}>{text}</Text>
        </Modal>
      </Portal>
      <IconButton
        icon="information-outline"
        iconColor={colors.primary}
        size={20}
        onPress={() => setVisible(true)}
      />
    </>
  );
}
