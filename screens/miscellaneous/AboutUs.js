import React from "react";
import { View, Text, Image } from "react-native";
import { general } from "../../styles/general";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import TimoImage from "../../assets/about/Timo.png";
import SeveriImage from "../../assets/about/Sepi.png";
import MattiImage from "../../assets/about/Matti.png";
import RoosaImage from "../../assets/about/Roosa.png";
import SamuliImage from "../../assets/about/Samuli.png";

export default function AboutUs() {
    const { colors } = useTheme();

    const members = [
        { name: "Timo Hyttinen", role: "UI/UX Designer", image: TimoImage },
        { name: "Severi Jokelainen", role: "Lead Developer", image: SeveriImage },
        { name: "Matti Pitkänen", role: "Lead Developer", image: MattiImage },
        { name: "Roosa Rautio", role: "UI/UX Designer", image: RoosaImage },
        { name: "Samuli Ruotsalainen", role: "Lead Developer", image: SamuliImage }
    ];

    return (
        <View style={general.scaffold}>
            <Text style={{ ...general.title, color: colors.primary }}>About Us</Text>
            <Text style={{ color: colors.text, marginBottom: 20, paddingLeft: 10, paddingRight: 10, textAlign: 'center' }}>Welcome to Team 2's school project: On Track. We've developed a mobile application aimed at simplifying your life. On Track allows you to effortlessly monitor your daily activities, academic progress, fitness routines, and hobbies. Stay organized, stay motivated with On Track.</Text>
            <ScrollView style={{ backgroundColor: colors.background }}>
                {/* Display images, names, and roles */}
                {members.map((member, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Image source={member.image} style={{ width: 80, height: 80, borderRadius: 40, marginRight: 10 }} />
                        <View>
                            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{member.name}</Text>
                            <Text style={{ color: colors.text }}>{member.role}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
