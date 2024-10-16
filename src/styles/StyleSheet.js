import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get("window");

export const ListItemWidth = windowWidth / 2;
export const ListItemHeight = ListItemWidth * 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20202C",
  },

  test: {
    color: "#FFFFFF",
    fontSize: 20,
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

  homeButton: {
    width: "10%",
    height: "14%",
    marginRight: 65,
  },

  favsButton: {
    width: "10%",
    height: "14%",
  },

  literlyButton: {
    width: 24,
    height: 24,
    marginTop: -8,
  },

  hexagon: {
    width: "50%",
    height: 173,
    marginBottom: -40,
  },

  drinkSelection: {
    width: "30%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
  },

  choose: {
    color: "white",
    width: "65%",
    fontSize: 47,
    position: "absolute",
    marginTop: "20%",
    marginLeft: "4%",
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

  // // Aqui começa o Design da tela de Favoritos
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   justifyContent: "center",
  // },
  // posterImage: {
  //   width: "100%",
  //   height: CONTAINER_WIDTH * 1.2,
  //   resizeMode: "cover",
  //   borderRadius: 24,
  //   margin: 0,
  //   marginBottom: 10,
  // },

  // Aqui começa o Design da tela de Perfil

  containerIII: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191266",
  },

  button: {
    backgroundColor: "#6258e8",
    padding: 10,
    borderRadius: 3,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
  },

  text: {
    marginBottom: 100,
    fontSize: 18,
    color: "white",
  },

  languagesList: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#6258e8",
  },

  languageButton: {
    padding: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },

  lngName: {
    fontSize: 16,
    color: "white",
  },

  // Aqui começa o Design da tela ListItem

  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    top: "-80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  characteristic: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Belleza",
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },

  animatedView: {
    width: ListItemWidth,
    height: ListItemHeight,
    elevation: 5,
    boxShadowOpacity: 0.2,
    boxShadowOffset: {
      width: 0,
      height: 0,
    },
    boxShadowRadius: 20,
  },

  imageD: {
    flex: 1,
    borderRadius: 20,
  },

  // Aqui começa o Design da tela CircularCarousel
  listPosition: {
    position: "relative",
    left: "30%",
    paddingTop: "30%",
  },

  conConStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: ListItemWidth / 2,
  },

  // Aqui começa o Design da tela DrinkDetails
  

});

export default styles;
