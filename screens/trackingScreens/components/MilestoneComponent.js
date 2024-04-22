import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function MilestoneComponent({
  text,
  onCheck,
  onUncheck,
  numeric,
  isDone,
  type,
}) {
  const [checked, setChecked] = useState(false);
  const [numericMilestone, setNumericMilestone] = useState(numeric);
  const [numericAmount, setNumericAmount] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    setChecked(isDone);
  }, [isDone]);

  const handleCheck = () => {
    setChecked(!checked);
    if (!checked) {
      onCheck();
    } else {
      onUncheck();
    }
  };

  if (numericMilestone && type === "undefined") {
    return (
      <TouchableOpacity
        onPress={handleCheck}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...templateStyle.milestones,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
          }}
        >
          <Text style={{ color: colors.text }}> {text} </Text>
          <View style={templateStyle.icons}>
            <Icon
              name="minus"
              color={colors.primary}
              style={{ marginRight: 10 }}
            />
            <Icon
              name="plus"
              color={colors.primary}
              style={{ marginRight: 10 }}
            />
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={handleCheck}
              color={colors.primary}
              uncheckedColor={colors.text}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (numericMilestone === true && type === "tracker") {
    return (
      <TouchableOpacity
        onPress={handleCheck}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...templateStyle.milestones,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
          }}
        >
          <Text style={{ color: colors.text }}> {text} </Text>
          <View style={templateStyle.icons}>
            {/* THIS HERE NEEDS BACKEND FUNCTIONALITY */}
            <IconButton
              icon="minus"
              iconColor={colors.primary}
              style={{ marginRight: 10 }}
              onPress={() => setNumericAmount(numericAmount - 1)}
            />
            <TextInput
              mode="outlined"
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              dense={true}
              style={{ width: 50, height: 40}}
            >
              {" "}
              {numericAmount}{" "}
            </TextInput>
            <IconButton
              icon="plus"
              iconColor={colors.primary}
              style={{ marginRight: 10 }}
              onPress={() => setNumericAmount(numericAmount + 1)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (!numericMilestone && type === "tracker") {
    return (
      <TouchableOpacity
        onPress={handleCheck}
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...templateStyle.milestones,
            backgroundColor: colors.accent,
            borderColor: colors.primary,
          }}
        >
          <Text style={{ color: colors.text }}> {text} </Text>
          <View style={templateStyle.icons}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={handleCheck}
              color={colors.primary}
              uncheckedColor={colors.text}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleCheck}
      style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          ...templateStyle.milestones,
          backgroundColor: colors.accent,
          borderColor: colors.primary,
        }}
      >
        <Text style={{ color: colors.text }}> {text} </Text>
        <View style={templateStyle.icons}>
          <Icon
            name="check"
            size={20}
            color={colors.primary}
            style={{ marginRight: 20 }}
          />
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={handleCheck}
            color={colors.primary}
            uncheckedColor={colors.text}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
