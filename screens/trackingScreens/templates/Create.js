import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  Button,
  TextInput,
  RadioButton,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function Create({ template }) {
  const [value, setValue] = useState("Check");
  const { colors } = useTheme();

  return (
    <View style={{ ...general.scaffold, justifyContent: "flex-start" }}>
      <Icon name={template.icon} size={40} color={colors.primary} />
      <Text style={{ ...general.title, color: colors.text }}>
        Create your own tracker
      </Text>
      <Text
        style={{ color: colors.text, alignSelf: "flex-start", marginLeft: 20 }}
      >
        Tracker name:
      </Text>
      <TextInput
        label=""
        mode="outlined"
        style={{ width: "95%", margin: 10 }}
      />
      <Text style={{ ...general.title, color: colors.text }}>Milestones</Text>
      <Text
        style={{ color: colors.text, alignSelf: "flex-start", marginLeft: 20 }}
      >
        Milestone name:
      </Text>
      <TextInput
        label=""
        mode="outlined"
        style={{ width: "95%", margin: 10 }}
      />
      <Text style={{color: colors.text}}>Milestone type:</Text>
      <RadioButton.Group
        onValueChange={(value) => setValue(value)}
        value={value}
      >
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ color: colors.text }}>Check</Text>
          <RadioButton value="Check" color={colors.primary} />
          <Text style={{ color: colors.text }}>Numeric</Text>
          <RadioButton value="Numeric" color={colors.primary} />
        </View>
      </RadioButton.Group>
      <Button
        children="Add Milestone"
        mode="contained"
        buttonColor={colors.primary}
        style={{ width: "95%", margin: 10 }}
        onPress={() => {}}
        />
        <View style={createOwnStyle.milestoneList}></View>
    </View>
  );
}
