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
  header: {
    textAlign: 'center',
    color: '#ffe8d3',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: "Gantari"
  },
  progressText: {
    textAlign: 'center',
    color: '#ffe8d3',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Gantari"
  },
  progressLine: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressCard: {
    padding: 15,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderWidth: 1,
    width: "90%",
  },
  progressDate: {
    fontSize: 20,
    fontFamily: "Gantari",
    textAlign: "right",
  },
  progressName: {
    fontSize: 20,
    fontFamily: "Gantari",
    fontWeight: "bold",
  },
  progressMilestone: {
    fontSize: 18,
    fontFamily: "Gantari",
  },
  progressPercent: {
    fontSize: 14,
    fontFamily: "Gantari",
  },
  progressBottomInfo: {
    fontSize: 20,
    fontFamily: "Gantari",
    textAlign: "right",
  },
});
