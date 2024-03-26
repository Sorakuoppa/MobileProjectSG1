import React from "react";


import Create from "./templates/Create";
import Exercise from "./templates/Exercise";
import Reading from "./templates/Reading";
import Running from "./templates/Running";



export default function Templates({ route }) {
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
