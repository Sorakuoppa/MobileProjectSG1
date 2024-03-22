import React from "react";
import { View, Text} from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { general } from "../../styles/general";
import { addNewStyle } from "../../styles/trackingScreens/addNewStyle";

export default function AddNew() {
    const { colors } = useTheme();


    return (
        <View style={{...general.scaffold}}>
            <Text style={general.title}>Add New</Text>
            <View style={addNewStyle.templates}>
               <Surface elevation={4}>
                    <IconButton
                        icon={({ color, size }) => (
                            <Icon name="plus" color={color} size={size} />
                        )}
                        color={colors.primary}
                        size={50}
                        onPress={() => console.log("Pressed")}
                    />
               </Surface>
            </View>
        </View>
    );
}