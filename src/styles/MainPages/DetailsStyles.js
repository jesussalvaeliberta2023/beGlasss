import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
  },

  background: {
    width: "100%",
    height: "100%",
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

  informations: {
    paddingLeft: 15,
    width: "85%",
  },

  drink: {
    fontSize: 40,
    fontFamily: "Belleza",
    color: "#FFFFFF",
  },

  description: {
    fontSize: 17,
    color: "#FFFFFF",
  },

  stars: {
    fontSize: 22,
    color: "#FFDD66",
    paddingRight: 15,
  },

  imageView: {
    alignSelf: "center",
    margin: 25,
  },

  image: {
    width: 350,
    height: 350,
    borderRadius: 20,
  },

  igredientsImages: {
    width: 130,
    height: 170,
    margin: 6,
    borderRadius: 20,
  },

  darkPart: {
    flex: 2,
    backgroundColor: "#20202C",
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  yellowPart: {
    flex: 1,
    backgroundColor: "#FFDD66",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },

  igredients: {
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 7,
  },

  amount: {
    fontSize: 13,
    marginStart: 7,
  },

  titleOne: {
    color: "white",
    fontSize: 25,
    marginStart: 25,
    marginBottom: 10,
    fontFamily: "Belleza",
  },

  settings: {
    padding: 25,
    marginTop: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#2A2A3999",
  },

  feedbacks: {
    justifyContent: "center",
    marginTop: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#2A2A3999",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 11,
    marginTop: 20,
    marginBottom: 10,
    paddingRight: 250,
    color: "#ccc",
    padding: 11,
  },

  reviewCard: {
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#20202C",
  },

  drinkImage: {
    width: 45,
    height: 45,
    borderRadius: 45,
    marginRight: 15,
  },

  ratingContainer: {
    flexDirection: "row",
  },

  starFilled: {
    color: "#FFD700",
    fontSize: 14,
  },

  starEmpty: {
    color: "#555",
    fontSize: 14,
  },

  reviewTextContainer: {
    flex: 1,
    flexDirection: "column",
  },

  titleAndRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  stepContainer: {
    marginTop: "20",
    flexDirection: "row",
    paddingHorizontal: 25,
    marginVertical: 5,
  },

  textMethod: {
    fontSize: 14,
    color: "#FFFFFF",

    marginStart: 0,
    margiN: 0,
    textAlign: "justify",
  },

  uncheckedBox: {
    width: 20,
    height: 20,

    borderColor: "#888888",
    borderWidth: 2,
    marginRight: 10,
    marginTop: 6,
  },

  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: "#888888",
    borderColor: "#8888888",
    borderWidth: 2,
    marginRight: 10,
    marginTop: 6,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo transparente com opacidade
  },

  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",

    elevation: 10, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },

  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  modalButton: {
    width: 120,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmButton: {
    backgroundColor: "#ff6347",
    marginBottom: 20,
  },

  cancelButton: {
    backgroundColor: "#ccc",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  reviewContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  feedbacks: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  titleOne: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  reviewsContainer: {
    marginTop: 10,
  },

  reviewCard: {
    flexDirection: "row",
    backgroundColor: "#20202C",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Sombra suave para um efeito de profundidade
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  drinkImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },

  drinkText: {
    fontSize: 14,
    color: "#555",
  },

  reviewText: {
    flex: 1,
    justifyContent: "center",
  },

  drinkTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },

  stars: {
    fontSize: 18,
    color: "#f1c40f", // Cor de ouro para as estrelas
    marginRight: 3,
  },
});

export default styles;