import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1c1b29",
    },
    buttonIdioma:{
      backgroundColor: '#4c4a64', // Cor do botão
      borderRadius:10, // Bordas arredondadas
      padding: 15, // Margem dentro do botão
      margin: 5,// Margem ao redor do botão
    },
    iconeSair: {
      marginTop: -360,
      right: 193,
    },
    iconeEditar: {
      marginTop: -360,
      left: 17,
    },
    buttonSair: {
      backgroundColor: '#20202c',  // Cor do botão
      paddingVertical: 20,  // Altura do botão
      paddingHorizontal: 20,  // Largura do botão
      borderRadius: 10,  // Bordas arredondadas
      margin: 10,  // Margem ao redor do botão
      right: 150,  // Define a posição do botão 
      top: -180,  // Ajuste a partir do topo do container
    },
    buttonEditar: {
      backgroundColor: '#20202c',  // Cor do botão
      paddingVertical: 20,  // Altura do botão
      paddingHorizontal: 20,  // Largura do botão
      borderRadius: 10,  // Bordas arredondadas
      margin: 10,  // Margem ao redor do botão
      left: 60,  // Define a posição do botão
      top: -180,  // Alinhado na mesma altura que o outro botão
      right: 40,  // Ajuste a partir da direita
    },
    

    containerQ: {
      flex: 1,  // Faz o container ocupar a tela toda
      alignItems: 'center',  // Centraliza horizontalmente
    },
    square: {
      width: 1500,  // Largura do quadrado
      height: 130,  // Altura do quadrado (mesmo valor para ser um quadrado)
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Cor semi-transparente (50%)
      marginTop: 341, //posição do quadrado
    },
  
    header: {
      flexDirection: "row",
      padding: 20,
      alignItems: "center",
      backgroundColor: "#252239",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  
    profileImage: {
      width: 380,
      height: 460,
      marginTop:10,
      marginLeft: -15,
    },
  
    userInfo: {
      marginLeft: -370,
      marginTop:360,
    },
  
    userName: {
      color: "#fff",
      fontSize: 22,
      fontWeight: "bold",
    },
  
    email: {
      color: "#ccc",
    },
  
    rating: {
      color: "#ffd700",
      fontSize: 14,
      marginLeft: 10,
    },
  
    scrollViewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    feedbacks: {
      justifyContent: 'center',
      borderRadius: 20,
    },
  
    sectionTitle: {
      color: "#fff",
      fontSize: 11,
      marginTop: 10,
      marginBottom: 10,
      paddingRight: 250,
      color: "#ccc",
      padding: 11,
    },
  
    reviewCard: {
      width: '90%',  
      marginHorizontal: '5%',  
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 20,  
      padding: 10,  
      marginBottom: 20,  
      backgroundColor: '#252239',
    },
  
    drinkImage: {
      width: 90,  
      height: 120,  
      borderRadius: 10,  
      marginRight: 15,  
    },
  
    reviewTextContainer: {
      flex: 1,  
      flexDirection: 'column',
    },
  
    titleAndRating: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    drinkTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      flex: 1,
    },
  
    textReview: {
      color: "#AFABAB",
      textAlign: "justify",
      marginTop: 5,
    },
  
    settings: {
      borderRadius: 20,
    },
  
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      backgroundColor: '#4c4a64',
      color: '#cfcfcf',
      textAlign: 'left',
    },


    //Idioma
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
});

export default styles;