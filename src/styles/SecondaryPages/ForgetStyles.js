import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ajusta a imagem de fundo
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(80, 48, 30, 0.3)",
  },

  title: {
    fontSize: 25,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },

  highlight: {
    color: "#FFC700",
    textAlign: "center",
    marginTop: 15,
  },

  input: {
    backgroundColor: "#333",
    color: "#FFF",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  message: {
    color: "#FFF",
    marginTop: 20,
    textAlign: "center",
  },

  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Fundo semitransparente mais escuro
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#222", // Fundo do modal para combinar com o tema escuro
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  codeInput: {
    width: "80%",
    backgroundColor: "#333",
    color: "#FFD700", // Texto dourado para destaque
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 24, // Destaque do tamanho do texto
    letterSpacing: 10, // Espaçamento entre os números
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default styles;
