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
    borderRadius: 50,
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
    left: "15%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  homeButton: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  favsButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;