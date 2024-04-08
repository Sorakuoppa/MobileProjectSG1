import React from "react";


import Create from "./templates/Create";
import Exercise from "./templates/Exercise";
import Reading from "./templates/Reading";
import Running from "./templates/Running";



export default function Templates({ route, navigation }) {
  const { template } = route.params;

    switch (template.name) {
    case "create": 
      return <Create template={template} navigation={navigation} />;
    case "exercise":
        return <Exercise template={template} navigation={navigation} />;
    case "read":
        return <Reading template={template} navigation={navigation} />;
    case "run":
        return <Running template={template} navigation={navigation} />;
    }
}
