import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20202C",
  },

  headerD: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  headerOp: {
    width: 36,
    height: 17,
    marginRight: "70%",
  },

  headerPe: {
    width: 60,
    height: 60,
    marginTop: 32,
  },

  choose: {
    color: "white",
    width: "65%",
    fontSize: 47,
    position: "absolute",
    marginTop: "20%",
    marginLeft: "4%",
  },

  drinkSelection: {
    width: "30%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
  },

  hexagon: {
    width: "50%",
    height: 173,
    marginBottom: -40,
  },

  tabss: {
    backgroundColor: "#00000090",
    width: "60%",
    height: 70,
    position: "absolute",
    bottom: "4%",
    left: "20%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  literlyButton: {
    width: 24,
    height: 24,
    marginTop: -8,
  },

  homeButton: {
    width: "10%",
    height: "14%",
    marginRight: 65,
  },

  favsButton: {
    width: "10%",
    height: "14%",
  },
});

export default styles;