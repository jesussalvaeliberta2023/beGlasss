import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1c1b29",
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
      marginTop: 20,
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
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
  
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      backgroundColor: '#FFFFFF',
    },
});

export default styles;