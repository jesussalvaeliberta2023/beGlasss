import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1b29",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  ButtonQuadrados: {
    backgroundColor: "#1c1b29",
    borderRadius: 15,
    marginTop: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  containerCima: {
    flex: 3,
  },
  containerBaixo: {
    flex: 2,
    backgroundColor: "#1c1b29",
  },
  ImagemFundo: {
    height: 500,
    width: "100%",
    position: "relative",
    justifyContent: "flex-end", // Posiciona o quadrado cinza no final da imagem
  },
  quadradocinza: {
    height: 175,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Cor cinza com opacidade
    padding: 20,
  },
  UserName: {
    fontSize: 30,
    color: "white",
    paddingBottom: 10,
  },
  useremail: {
    color: "#808080",
    fontSize: 18,
  },
  reviewCard: {
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#252239",
  },
  reviewList: {
    paddingHorizontal: 20,
  },
  reviewText: {
    marginLeft: 10,
    flex: 1,
  },
  drinkImage: {
    height: 150,
    width: 125,
    borderRadius: 10
  },
  textReview: {
    color: "#AFABAB",
    textAlign: "justify",
    marginTop: 5,
  },
  drinkTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  drinkTitle: {
    color: "#fff",
    fontSize: 20,
  },
  ratingContainer: {
 flexDirection: "row"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },


  //Idioma
  containerIII: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // fundo suave para todo o layout
    padding: 20,
    width: 36,
    height: 39,
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
    marginVertical: 5,
    borderRadius: 50,
    alignItems: "left",
  },
  lngName: {
    fontSize: 15,
    color: "#333333",
  },
  textModal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  square2: {
    width: 265, // Largura do quadrado
    height: 45, // Altura do quadrado (mesmo valor para ser um quadrado)
    backgroundColor: "#42405a", // Cor semi-transparente (50%)
    marginTop: 37, //posição do quadrado
    justifyContent: "space-around",
  },
  modalText: {
    fontSize: 12,
    color: "#afabab",
    textAlign: "center",
    alignItems: "center",
    top: -30,
  },
  modalText3: {
    fontSize: 12,
    color: "#cfcfcf",
    textAlign: "center",
    alignItems: "center",
    top: 30,
  },
  modalText4: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    alignItems: "center",
    top: 1,
    margin: -10,
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

  //Modal configuração

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // fundo semitransparente para destacar o modal
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#4c4a64",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText1: {
    fontSize: 12,
    color: "#cfcfcf",
    right: 55,
    margin: 10,
  },
  modalText2: {
    fontSize: 12,
    color: "#cfcfcf",
    right: 110,
    margin: 10,
  },
  inputField: {
    width: "100%",
    padding: 2,
    backgroundColor: "#39374e",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 15,
  },
  modalButton: {
    backgroundColor: "#cfcfcf",
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  modalButtonText: {
    color: "#4c4a64",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default styles;
