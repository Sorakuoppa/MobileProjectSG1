import React, {useState} from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { general } from "../../../styles/general";
import { templateStyle } from "../../../styles/trackingScreens/addNewStyle";

export default function MilestoneComponent({text }) {
    const [checked, setChecked] = useState(false)
    const { colors } = useTheme();

        return (
            <View style={{...templateStyle.milestones, backgroundColor: colors.accent, borderColor: colors.primary}}>
                <Text style={{ color: colors.text }}> {text} </Text>
                <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} color={colors.primary} uncheckedColor={colors.text}/>
            </View>
        );
    } 