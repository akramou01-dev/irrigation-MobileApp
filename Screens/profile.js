import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  StatusBar,

} from "react-native";
import Colors from "../Constants/Colors";
import Card from "../Components/card";
import PersoButton from "../Components/persoButton";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const Profile = (props) => {
  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
      <ScrollView>
        <Text style={{ ...styles.boldText, marginTop: screenHeight * 0.03 }}>
          Informations de la terre
        </Text>
        <ScrollView
          centerContent={true}
          horizontal={true}
          style={styles.ScrollView}
        >
          <Card style={styles.card}>
            <Text style={styles.mediumText}>Superficie</Text>
            <Text style={styles.mediumText}>50 km carré</Text>
          </Card>
          <Card
            style={{ ...styles.card, marginHorizontal: screenHeight * 0.05 }}
          >
            <Text style={styles.mediumText}>emplacement</Text>
            <Text style={styles.mediumText}>
              lat: 100.234 {"\n"}lon: 32.2301
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text style={styles.mediumText}>Type de terre</Text>
            <Text style={styles.mediumText}>50 km carré</Text>
          </Card>
        </ScrollView>
        <View style={{ marginBottom: screenHeight * 0.03 }}>
          <Text style={styles.boldText}>Mes informations</Text>
        </View>
        <View>
          <Card style={styles.persoInfoCard}>
            <Text
              style={{
                ...styles.mediumText,
                ...{
                  color: Colors.dark_grey,
                  fontSize: screenWidth * 0.045,
                },
              }}
            >
              NOM & PRENOM
            </Text>
            <Text style={{ ...styles.boldText, ...{fontSize: screenWidth * 0.04,color:"black",textAlign:"left"} }}>
              akram ouardas abd el ilah 
            </Text>
          </Card>
          <Card style={styles.persoInfoCard}>
            <Text
              style={{
                ...styles.mediumText,
                ...{
                  color: Colors.dark_grey,
                  fontSize: screenWidth * 0.045,
                },
              }}
            >
              NUM DE COMPTE
            </Text>
            <Text style={{ ...styles.boldText, ...{fontSize: screenWidth * 0.04, marginLeft: 0,color:"black"} }}>
              12345678
            </Text>
          </Card>
        </View>
        <View style={{marginTop:screenHeight * 0.03}}>
        <Card style={styles.persoInfoCard}>
            <Text
              style={{
                ...styles.mediumText,
                ...{
                  color: Colors.dark_grey,
                  fontSize: screenWidth * 0.045,
                },
              }}
            >
              NUM TEL
            </Text>
            <Text style={{ ...styles.boldText, ...{fontSize: screenWidth * 0.04, marginLeft: 0,color:"black"} }}>
              +213 552 77 60 96
            </Text>
          </Card>
          <Card style={styles.persoInfoCard}>
            <Text
              style={{
                ...styles.mediumText,
                ...{
                  color: Colors.dark_grey,
                  fontSize: screenWidth * 0.045,
                },
              }}
            >
              E-MAIL
            </Text>
            <Text style={{ ...styles.boldText, ...{fontSize: screenWidth * 0.04, marginLeft: 0,color:"black"} }}>
              a.ouardas@esi-sba.dz
            </Text>
          </Card>
          <Card style={styles.persoInfoCard}>
            <Text
              style={{
                ...styles.mediumText,
                ...{
                  color: Colors.dark_grey,
                  fontSize: screenWidth * 0.045,
                },
              }}
            >
              MOT DE PASS
            </Text>
            <Text style={{ ...styles.boldText, ...{fontSize: screenWidth * 0.04, marginLeft: 0,color:"black"} }}>
              melissa
            </Text>
          </Card>
          <Card style={styles.persoInfoCard}>
            <Text
              style={{
                ...styles.mediumText,
                ...{
                  color: Colors.dark_grey,
                  fontSize: screenWidth * 0.045,
                },
              }}
            >
              TYPE DE PAIEMENT
            </Text>
            <Text style={{ ...styles.boldText, ...{fontSize: screenWidth * 0.04, marginLeft: 0,color:"black"} }}>
              Carte visa
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    marginVertical: screenHeight * 0.05,
  },
  card: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
  },
  persoInfoCard: {
    flexDirection: "row",
    borderRadius: 0,
    width: screenWidth,
    height: screenHeight * 0.08,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: Colors.whiteSmoke,
    borderBottomWidth: 2,
    paddingHorizontal: 15,
  },
  boldText: {
    fontFamily: "futura-meduim",
    fontSize: screenWidth * 0.06,
    fontWeight: "bold",
    marginLeft: 15,
  },
  mediumText: {
    fontSize: screenWidth * 0.052,
    color: "black",
    fontFamily: "futura-meduim",
  },
  smallText: {
    fontFamily: "futura-meduim",
    fontSize: screenWidth * 0.035,
    alignSelf: "center",
    color: Colors.dark_grey,
  },
});

export default Profile;
