import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth } = Dimensions.get("window");

export const ListItemWidth = windowWidth / 2;
export const ListItemHeight = ListItemWidth * 1.5;

const styles = StyleSheet.create({
  // Design ListItem
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

  // Design CircularCarousel
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
});

export default styles;