import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  
  posterImage: {
    width: "100%",
    height: CONTAINER_WIDTH * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 20,
    paddingTop: 100,
    zIndex: 2,
  },

  button: {
    width: 60,
    height: 60,
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedButton: {
    backgroundColor: "#FFD700",
  },

  tabss: {
    backgroundColor: "#00000090", // cor com transparência
    width: "90%", // aumenta a largura para cobrir mais a tela
    height: 70,
    position: "absolute",
    bottom: "4%", // ajuste para garantir que fique no rodapé
    left: "5%", // ajusta para centralizar a barra
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around", // espaçamento igual entre os ícones
    flexDirection: "row",
    paddingHorizontal: 20, // adiciona padding interno
  },

  homeButton: {
    width: 50, // ajusta o tamanho dos ícones
    height: 50,
    marginHorizontal: 20, // espaçamento entre botões
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