import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "black",
    },
    title: {
      fontSize: 25,
      color: "#FFF",
      textAlign: "center",
      marginBottom: 20,
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

})

    

export default styles;