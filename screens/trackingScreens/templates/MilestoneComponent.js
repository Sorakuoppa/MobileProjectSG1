import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function MilestoneComponent({text, type }) {
    const { colors } = useTheme();

    if (type === "checkbox") {
        return (
            <View style={templateStyle.milestones}>
                <Text style={{ color: colors.text }}> {text} </Text>
                <Checkbox status="checked" color={colors.primary} />
            </View>
        );
    } else if (type === "count") {
        return (
            <View style={templateStyle.milestones}>
                <Text style={{ color: colors.text }}> {text} </Text>
                <Text style={{ color: colors.text, fontSize: 18 }}> 0 </Text>
            </View>
        );
    }
}