import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "80%",
    borderWidth: 2,
    borderRadius: 10,
  },
  progress: {
    flex: 0.2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "80%",
  },
  progressDate: {
    fontSize: 20,
    fontFamily: "Gantari",
    textAlign: "right",
  },
  progressName: {
    fontSize: 20,
    fontFamily: "Gantari",
  },
  progressMilestone: {
    fontSize: 20,
    fontFamily: "Gantari",
  },
  progressBottomInfo: {
    fontSize: 20,
    fontFamily: "Gantari",
    textAlign: "right",
  },
});
