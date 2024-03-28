import React, {useRef} from "react";
import { View, Text, Animated } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { general } from "../../styles/general";
import { addNewStyle } from "../../styles/trackingScreens/addNewStyle";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AddNew({ navigation }) {
  const { colors } = useTheme();
 const fadeAnims = useRef(
   templateList.map(() => new Animated.Value(1))
 ).current;


  const handlePress = ( index ,templateName) => {
    const fadeAnim = fadeAnims[index];

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200, 
      useNativeDriver: true,
    }).start(() => {
      templatePress(templateName);
      fadeAnim.setValue(1);
    });
  };

  const templatePress = (templateName) => {
    const routeObject = templateList.find(
      (template) => template.name === templateName
    );
    navigation.navigate("Templates", { template: routeObject });
  };

  return (
    <View style={general.scaffold}>
      <View style={addNewStyle.templatesContainer}>
        {templateList.map((template, index) => (
          <TouchableOpacity
            key={index}
            onPressIn={() => handlePress(index, template.name)}
          >
            <Animated.View
              style={{
                opacity: fadeAnims[index],
                transform: [{ scale: fadeAnims[index] }],
              }}
            >
            <Surface
              elevation={3}
              style={{
                ...addNewStyle.template,
                backgroundColor: colors.accent,
                borderColor: colors.primary,
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
          </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const templateList = [
  {
    name: "exercise",
    icon: "dumbbell",
    text: "Basic exercise template for your workout goals!",
  },
  {
    name: "read",
    icon: "book",
    text: "Trying to be a bookworm? This template is for you!",
  },
  {
    name: "run",
    icon: "running",
    text: "Sprint to your milestones!",
  },
  {
    name: "create",
    icon: "plus-circle",
    text: "Create your own template!",
  },
];
