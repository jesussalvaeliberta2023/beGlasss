import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { useFonts } from "@expo-google-fonts/belleza";
import PressComponent from "../components/PressableComponent";

export default function DesignDetails() {
  const [fontsLoaded] = useFonts({
    Belleza: require("../assets/fonts/Belleza/Belleza-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  const { width } = Dimensions.get("window");

  return (
    <ImageBackground
      source={require("../assets/images/Drinks/Caipirinha.png")}
      style={styles.background}
      blurRadius={10}
    >
      <View style={styles.container}>
        <StatusBar style="light" translucent />
        <View style={styles.header}>
          <PressComponent
            onPress={() => navigation.navigate("Perfil", { token })}
            source={require("../assets/images/Bars.png")}
            styleI={styles.headerTab}
          />
          <PressComponent
            onPress={() => navigation.navigate("Login")}
            source={require("../assets/images/Person.png")}
            styleI={styles.headerPerson}
          />
        </View>

        <View style={styles.informations}>
          <Text style={styles.drink}>Caipirinha</Text>
          <Text style={styles.description}>
            Uma versão sem álcool da mais famosa bebida brasileira.
          </Text>
          <Text style={styles.stars}>★★★☆☆</Text>
        </View>

        <View style={styles.imageView}>
          <Image
            source={require("../assets/images/Drinks/Caipirinha.png")}
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.titleOne}>
            Ingredientes:
            </Text>
          <ScrollView horizontal>
            <View style={[{ marginStart: 25 }, styles.igredientsImages]}>
              <View style={styles.darkPart}>
                <Image
                  source={require("../assets/images/Igredients/Lemon.png")}
                  style={{ width: 140, height: 140 }}
                />
              </View>

              <View style={styles.yellowPart}>
                <Text style={styles.igredients}>Limão</Text>
                <Text style={styles.amount}>1</Text>
              </View>
            </View>

            <View style={styles.igredientsImages}>
              <View style={styles.darkPart}>
                <Image
                  source={require("../assets/images/Igredients/SparklingWater.png")}
                  style={{ width: 140, height: 140 }}
                />
              </View>

              <View style={styles.yellowPart}>
                <Text style={styles.igredients}>Água com Gás</Text>
                <Text style={styles.amount}>250 ml</Text>
              </View>
            </View>

            <View style={styles.igredientsImages}>
              <View style={styles.darkPart}>
                <Image
                  source={require("../assets/images/Igredients/Sugar.png")}
                  style={{ width: 140, height: 140 }}
                />
              </View>

              <View style={styles.yellowPart}>
                <Text style={styles.igredients}>Açúcar (à gosto)</Text>
                <Text style={styles.amount}>1 colher de chá</Text>
              </View>
            </View>

            <View style={[{ marginEnd: 25 }, styles.igredientsImages]}>
              <View style={styles.darkPart}>
                <Image
                  source={require("../assets/images/Igredients/Ice.png")}
                  style={{ width: 140, height: 140 }}
                />
              </View>

              <View style={styles.yellowPart}>
                <Text style={styles.igredients}>Gelo (à gosto)</Text>
                <Text style={styles.amount}>Quantidade que desejar</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >

            <View style={[styles.feedbacks, { width }]}>
              <Text style={styles.sectionTitle}>Suas avaliações</Text>
              <ScrollView>
                {reviews.map((item) => (
                  <View key={item.id} style={styles.reviewCard}>
                    <View>
                      <Image source={item.image} style={styles.drinkImage} />
                    </View>

                    <View style={styles.reviewTextContainer}>
                      <View style={styles.titleAndRating}>
                        <Text style={styles.drinkTitle}>{item.drink}</Text>
                        <Text style={styles.rating}>{item.rating} ★★★☆☆</Text>
                      </View>
                      <Text style={styles.textReview}>{item.review}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

        <View style={[styles.settings, { width }]}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <Text style={styles.text}>Idioma</Text>
          <Text style={styles.text}>Trocar email</Text>
          <Text style={styles.text}>Trocar senha</Text>
          <Text style={styles.text}>Excluir conta</Text>
        </View>
      </ScrollView>
      </View>

      </View>
    </ImageBackground>
  );
}

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
  },

  imageView: {
    alignSelf: "center",
    margin: 25,
  },

  image: {
    width: 400,
    height: 400,
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
});
