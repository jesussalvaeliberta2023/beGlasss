import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerIII: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // fundo suave para todo o layout
    padding: 20,
  },

  languagesList: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 20,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },

  languageButton: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },

  lngName: {
    fontSize: 18,
    color: "#333333",
  },

  textModal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    backgroundColor: "#f8f8f8",
  },

  homeButton: {
    padding: 10,
  },

  favsButton: {
    padding: 10,
  },

  profileButton: {
    padding: 10,
  },
  
  literlyButton: {
    width: 30,
    height: 30,
    resizeMode: "contain", // ajuste automático de imagem
  },
});

export default styles;
