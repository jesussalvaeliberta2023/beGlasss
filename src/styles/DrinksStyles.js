import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20202C",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  headerTab: {
    marginLeft: 15,
  },

  headerPerson: {
    width: 60,
    height: 60,
    marginRight: 15,
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