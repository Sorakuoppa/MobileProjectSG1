import React from "react";
import { View, Text } from "react-native";
import { general } from "../styles/general";

export default function Settings() {

    return (
        <View style={general.scaffold}>
            <Text style={general.title}>Settings</Text>
        </View>
    );
}