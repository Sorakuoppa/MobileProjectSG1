import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { general } from "../../styles/general";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import TimoImage from "../../assets/about/Timo.png";
import SeveriImage from "../../assets/about/Sepi.png";
import MattiImage from "../../assets/about/Matti.png";
import RoosaImage from "../../assets/about/Roosa.png";
import SamuliImage from "../../assets/about/Samuli.png";

export default function AboutUs({ navigation }) {
  const { colors } = useTheme();

  const members = [
    {
      name: "Timo Hyttinen",
      fname: "Timo",
      role: "UI/UX Designer",
      image: TimoImage,
      link: "",
    },
    {
      name: "Severi Jokelainen",
      fname: "Severi",
      role: "Lead Developer",
      image: SeveriImage,
      link: "https://www.linkedin.com/in/severi-jokelainen-4783a024b/",
    },
    {
      name: "Matti Pitkänen",
      fname: "Matti",
      role: "Lead Developer",
      image: MattiImage,
      link: "https://www.linkedin.com/in/matti-pitk%C3%A4nen-963552244/",
    },
    {
      name: "Roosa Rautio",
      fname: "Roosa",
      role: "UI/UX Designer",
      image: RoosaImage,
      link: "https://www.linkedin.com/in/roosa-r-02630610a/",
    },
    {
      name: "Samuli Ruotsalainen",
      fname: "Samuli",
      role: "Lead Developer",
      image: SamuliImage,
      link: "",
    },
  ];

  const handleMemberPress = (memberName, memberFname, memberImage, memberLink) => {
    navigation.navigate("MoreAboutUs", { name: memberName, fname: memberFname, image: memberImage, link: memberLink});
  };
  


  return (
    <View style={general.scaffold}>
      <Text style={{ ...general.title, color: colors.primary }}>About Us</Text>
      <Text
        style={{
          color: colors.text,
          marginBottom: 20,
          paddingLeft: 10,
          paddingRight: 10,
          textAlign: "center",
          fontFamily: "Gantari",
        }}
      >
        Welcome to Team 2's school project: On Track. We've developed a mobile
        application aimed at simplifying your life. On Track allows you to
        effortlessly monitor your daily activities, academic progress, fitness
        routines, and hobbies. Stay organized, stay motivated with On Track.
      </Text>
      <ScrollView style={{ backgroundColor: colors.background }}>
        {/* Display images, names, and roles */}
        {members.map((member, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMemberPress(member.name, member.fname, member.image, member.link)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image
                source={member.image}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ color: colors.primary, fontWeight: "bold", fontFamily: 'Gantari' }}>
                  {member.name}
                </Text>
                <Text style={{ color: colors.text, fontFamily: "Gantari", }}>{member.role}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
