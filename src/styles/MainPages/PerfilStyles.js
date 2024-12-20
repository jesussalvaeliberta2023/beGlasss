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

  imagemPerfil:{
    width: 250,
    height: 250,
    borderRadius: 25,
    left: 80,
    margin: 30,
  },

  ButtonQuadrados: {
    backgroundColor: "#1c1b29",
    borderRadius: 15,
    marginTop: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  ButtonQuadrados1: {
    backgroundColor: "#1c1b29",
    borderRadius: 15,
    marginTop: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    left: -30,
  },

  containerCima: {
    
  },

  containerBaixo: {},

  textIdentificarPage: {
    color: "#afabab",
    marginTop: 20,
    fontSize: 16,
    right: 149,
    margin: 15,
  },

  textIdentificarPage2: {
    color: "#afabab",
    marginTop: -10,
    fontSize: 16,
    right: 200,
    margin: 15,
  },

  linhaPage1:{
    left: 190,
    marginTop: -30,
  },

  linhaPage2:{
    left: 160,
    marginTop: 10,
  },

  ImagemFundo: {
    height: 950,
    width: 500,
    left: -20,
    position: "relative",
    justifyContent: "flex-end", // Posiciona o quadrado cinza no final da imagem
  },

  quadradocinza: {
    height: 550,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Cor cinza com opacidade
    padding: 20,
    width: 430,
    left: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },

  UserName: {
    fontSize: 30,
    color: "white",
    paddingBottom: 10,
  },

  useremail: {
    color: "#808080",
    fontSize: 14,
  },

  reviewCard: {
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    right: 20,
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
    borderRadius: 10,
  },

  textReview: {
    color: "#AFABAB",
    textAlign: "justify",
    marginTop: 5,
  },

  drinkText: {
    color: "#afabab",
    fontSize: 13,
  },

  drinkTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },

  drinkTitle: {
    color: "#fff",
    fontSize: 15,
  },

  ratingContainer: {
    flexDirection: "row",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
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
    fontSize: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 96,
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
    backgroundColor: "#cfcfcf",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },

  buttonText: {
    color: "#4c4a64",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semitransparente
  },

  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#4c4a64",
    borderRadius: 10,
    alignItems: "center",
  },

  modalText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  modalButtonYes: {
    backgroundColor: "#39374e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
  },

  modalButtonNo: {
    backgroundColor: "#cfcfcf",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
  },

  modalButtonTextYes: {
    color: "#cfcfcf",
    fontSize: 15,
    fontWeight: "600",
  },

  modalButtonTextNo: {
    color: "#2a2a39",
    fontSize: 15,
    fontWeight: "600",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semitransparente
  },

  modalContent: {
    width: "85%",
    padding: 20,
    backgroundColor: "#2a2a39",
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  modalLabel: {
    fontSize: 12,
    color: "#cfcfcf",
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
  },

  modalCurrentEmail: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 20,
    backgroundColor: "#39374e",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    width: "100%",
  },

  inputField: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#39374e",
    borderRadius: 10,
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 15,
  },

  modalButton: {
    backgroundColor: "#2a2a39",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    width: "90%",
    right: 62,
  },
  modalButtonConcluir: {
    backgroundColor: "#cfcfcf",
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "90%",
  },

  modalButtonText: {
    color: "#4c4a64",
    fontSize: 15,
    fontWeight: "600",
  },

  text:{
    color: "white",
    right: 2,
    fontSize: 15,
    },

    textIdenticicacao:{
      color: "#afabab",
      left: 250,
      marginTop: -20,
      },
});

export default styles;
