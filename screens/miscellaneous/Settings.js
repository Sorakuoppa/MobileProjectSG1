import React, {useState, useContext} from "react";
import { ThemeContext } from "../../components/Context";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { general } from "../../styles/general";
import { settingStyle}  from "../../styles/miscellaneous/settingStyle";

export default function Settings() {
    const [switchOn, setSwitchOn] = useState(true);
    const { colors } = useTheme();
    const theme = useContext(ThemeContext);
    
    const toggleSwitch = () => {
        setSwitchOn(!switchOn);
        theme.setTheme(switchOn ? "light" : "dark");
    };

    return (
        <View style={general.scaffold}>
            <Text style={general.title}>Settings</Text>
            <View style={settingStyle.setting}>
                <Text style={{...general.text, color: colors.text, fontSize: 16}}>Dark mode</Text>
                <Switch value={switchOn} onValueChange={toggleSwitch} color={colors.primary} />
                </View>
        </View>
    );
}