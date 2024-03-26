import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconButton, Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import Create from "./templates/Create";
import Exercise from "./templates/Exercise";
import Reading from "./templates/Reading";
import Running from "./templates/Running";

import { general } from "../../styles/general";
import { templateStyle } from "../../styles/trackingScreens/addNewStyle";

export default function TemplateTracker({ route }) {
  const { template } = route.params;
  const { colors } = useTheme();

    switch (template.name) {
    case "create":
      return <Create template={template} />;
    case "exercise":
        return <Exercise template={template} />;
    case "read":
        return <Reading template={template} />;
    case "run":
        return <Running template={template} />;
    }
}


//   return (
//     <View style={general.scaffold}>
//       <Icon name={template.icon} size={40} color={colors.primary} />
//       <Text>Template: {template.name} </Text>
//       <View style={templateStyle.milestones}>
//         <Text> Book read? </Text>
//         <Checkbox status="checked" color={colors.primary} />
//       </View>
//     </View>
//   );
// }
