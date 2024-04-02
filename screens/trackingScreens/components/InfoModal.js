import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Modal, Portal, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { modalStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function InfoModal({ text1, text2, icon1, icon2, icon3 }) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          dismissable={true}
          onDismiss={() => setVisible(false)}
          dismissableBackButton={true}
          contentContainerStyle={{ ...modalStyle.modalContent, backgroundColor: colors.accent }}
        >
          <IconButton
            icon="close"
            iconColor={colors.primary}
            size={20}
            onPress={() => setVisible(false)}
          />
            <Icon name={icon1} size={30} color={colors.primary} />
            <Text style={{ color: colors.text }}>{text1}</Text>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={icon2}
                size={20}
                color={colors.primary}
                style={{ marginRight: 5 }}
              />
              <Icon
                name={icon3}
                size={20}
                color={colors.primary}
                style={{ marginRight: 5 }}
              />
            <Text style={{ color: colors.text }}>{text2}</Text>
          </View>
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
