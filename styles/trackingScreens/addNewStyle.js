import { StyleSheet } from "react-native";

export const addNewStyle = StyleSheet.create({
  template: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: "auto",
    padding: 10,
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
  ripple: {
    borderRadius: 20,
    margin: 10,
    borderRadius: 15,
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
  exerciseTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  milestones: {
    width: "95%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const modalStyle = StyleSheet.create({
  modal: {
    width: "70%",
    height: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    
  },
  modalContent: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: 30,
    margin: 10,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});