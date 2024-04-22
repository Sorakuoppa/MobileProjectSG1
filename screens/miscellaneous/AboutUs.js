import React from "react";
import { View, Text } from "react-native";
import { general } from "../../styles/general";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function AboutUs() {
    const { colors } = useTheme();

    return (
        <View style={general.scaffold}>
            <Text style={{ ...general.title, color: colors.text }}>About Us</Text>
            <Text style={{ color: colors.text, marginBottom: 20 }}>Tää nyt oli tällänen projekti.</Text>
            <ScrollView style={{ backgroundColor: colors.background }}>
                <View style={{ backgroundColor: colors.accent, padding: 20, marginBottom: 10 }}>
                    <Text style={{ color: colors.text }}>Name: Timo Hyttinen</Text>
                </View>
                <View style={{ backgroundColor: colors.accent, padding: 20, marginBottom: 10 }}>
                    <Text style={{ color: colors.text }}>Name: Severi Jokelainen</Text>
                </View>
                <View style={{ backgroundColor: colors.accent, padding: 20, marginBottom: 10 }}>
                    <Text style={{ color: colors.text }}>Name: Matti Pitkänen</Text>
                </View>
                <View style={{ backgroundColor: colors.accent, padding: 20, marginBottom: 10 }}>
                    <Text style={{ color: colors.text }}>Name: Roosa Rautio</Text>
                </View>
                <View style={{ backgroundColor: colors.accent, padding: 20, marginBottom: 10 }}>
                    <Text style={{ color: colors.text }}>Name: Samuli Ruotsalainen</Text>
                </View>
            </ScrollView>
        </View>
    );
}
