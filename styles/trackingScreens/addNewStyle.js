import { StyleSheet } from "react-native";

export const addNewStyle = StyleSheet.create({
  template: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "auto",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6e6e6e",
  },
  templateText: {
    fontSize: 15,
    width: "50%",
  },
  templatesContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
});

export const templateStyle = StyleSheet.create({
  exerciseContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  exercise: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    margin: 5,
  },
  milestones: {
    width: "90%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6e6e6e",
  },
});
