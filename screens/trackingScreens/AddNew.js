import React from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { general } from "../../styles/general";
import { addNewStyle } from "../../styles/trackingScreens/addNewStyle";

export default function AddNew() {
  const { colors } = useTheme();
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={general.scaffold}>
      <View style={addNewStyle.templatesContainer}>
        {templateList.map((template, index) => (
          <Pressable key={index} onPressIn={fadeIn} onPressOut={fadeOut}>
            <Surface
              elevation={4}
              style={{
                ...addNewStyle.template,
                backgroundColor: colors.background,
              }}
            >
              <Icon name={template.icon} size={40} color={colors.primary} />
              <Text style={{ ...addNewStyle.templateText, color: colors.text }}>
                {template.text}
              </Text>
              <IconButton
                icon="plus"
                iconColor={colors.primary}
                size={30}
                onPress={() => {}}
              />
            </Surface>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const templateList =  [
  {
    name: 'exercise',
    icon: 'dumbbell',
    text: 'Basic exercise template for your workout goals!'
  },
  {
    name: 'read',
    icon: 'book',
    text: 'Trying to be a bookworm? This template is for you!'
  },
  {
    name: 'run',
    icon: 'running',
    text: 'Sprint to your milestones!'
  }
]