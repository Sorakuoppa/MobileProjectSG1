import React from "react";
import { View, Text } from "react-native";
import { general } from "../../styles/general";
import { useTheme } from "@react-navigation/native";

export default function AboutUs() {
    const { colors } = useTheme();

    return (
        <View style={general.scaffold}>
            <Text style={{...general.title, color: colors.text}}>About Us</Text>
            <Text style={{...general.text, color: colors.text}}>
                Timo Hyttinen {'\n\n'}
                Severi Jokelainen {'\n\n'}
                Matti Pitkänen {'\n\n'}
                Roosa Rautio {'\n\n'}
                Samuli Ruotsalainen
            </Text>
        </View>
    );
    }
