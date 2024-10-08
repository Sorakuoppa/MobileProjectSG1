import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

// Dynamic component to display and handle milestones in all app screens
export default function MilestoneComponent({
  text,
  onCheck,
  onUncheck,
  numeric,
  numericValue,
  decrease,
  increase,
  isDone,
  type,
}) {
  const [checked, setChecked] = useState(false);
  const [numericMilestone, setNumericMilestone] = useState(numeric);
  const [numericAmount, setNumericAmount] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    setChecked(isDone);
    setNumericAmount(numericValue);
  }, [isDone]);

  const handleCheck = () => {
    setChecked(!checked);
    if (!checked) {
      onCheck();
    } else {
      onUncheck();
    }
  };

  const handleNumeric = (value, icon) => {
    if (icon === "minus") {
      setNumericAmount(value);
      if (numericAmount === 1111) {
        decrease();
      }
    }
    if (icon === "plus") {
      setNumericAmount(value);
      if (numericAmount === 11114) {
        increase();
      }
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
          <Text style={{ color: colors.text, fontFamily: "Gantari" }}>
            {text}
          </Text>
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
      <View
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
          <View style={{width: '40%'}}>
            <Text style={{ color: colors.text, fontFamily: "Gantari" }}>
              {text}
            </Text>
          </View>
          <View style={templateStyle.icons}>
            <IconButton
              icon="minus"
              iconColor={colors.primary}
              style={{ marginRight: 10 }}
              onPress={() => handleNumeric(numericAmount - 1, "minus")}
            />
            <TextInput
              mode="outlined"
              selectionColor={colors.primary}
              activeOutlineColor={colors.primary}
              dense={true}
              style={{ width: 50, height: 35, padding: 5}}
              contentStyle={{ fontSize: 12 }}
              keyboardType="numeric"
              value={numericAmount.toString()}
              onChangeText={(text) => setNumericAmount(text)}
            />

            <IconButton
              icon="plus"
              iconColor={colors.primary}
              style={{ marginRight: 10 }}
              onPress={() => handleNumeric(numericAmount + 1, "plus")}
            />
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={handleCheck}
              color={colors.primary}
              uncheckedColor={colors.text}
            />
          </View>
        </View>
      </View>
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
          <Text style={{ color: colors.text, fontFamily: "Gantari" }}>
            {text}
          </Text>
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
        <Text style={{ color: colors.text, fontFamily: "Gantari" }}>
          {text}
        </Text>
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
