import React from "react";


import Create from "./templates/Create";
import Exercise from "./templates/Exercise";
import Reading from "./templates/Reading";
import Running from "./templates/Running";



export default function TemplateTracker({ route }) {
  const { template } = route.params;

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
