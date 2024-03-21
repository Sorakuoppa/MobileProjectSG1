import React from "react";
import { View, Text } from "react-native";
import { general } from "../styles/general";
import { ScreenStack } from "../components/ScreenStack";

export default function Account() {

    return (
        <View style={general.scaffold}>
            <Text style={general.title}>Account</Text>
        </View>
    );
}