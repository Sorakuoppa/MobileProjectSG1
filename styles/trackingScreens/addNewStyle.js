import { StyleSheet } from "react-native";

export const addNewStyle = StyleSheet.create({
    template: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        height: 'auto',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    templateText: {
        fontSize: 15,
        width: "50%"
    },
    templatesContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#645454",
    },
});
