import React, { useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Animated,
} from "react-native";
import { AuthContext } from "../Components/context";
import axios from "axios";
import Colors from "../Constants/Colors";
import { ZONES } from "../data/dummyData";
import { CAPTEUR } from "../data/dummyData";
import Card from "../Components/card";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = (props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const { SignOut } = useContext(AuthContext);

  const toZoneHandler = (id, etat) => {
    props.navigation.navigate("ZonesScreen", { id: id, etat: etat });
  };

  const zonesrenderHandler = ({ item, index }) => {
    let itemSize = Dimensions.get("window").width * 0.35;
    const inputRange = [0,itemSize * index, itemSize * (index + 2.5)];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1,1,0]
    })
    const opacity = scrollX.interpolate({
      inputRange: [0, itemSize * index, itemSize * (index + 1)],
      outputRange:[1,1,0]
    })
    let image = require("../assets/vert_degrade.jpg");
    let icon = <Ionicons name="leaf" size={50} color="white" />;
    if (item.etat) {
      image = require("../assets/Ocean_blue.jpg");
      icon = <Ionicons name="water" size={50} color="white" />;
    }
    return (
      <Animated.View style={{opacity,transform:[{scale}]}}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => toZoneHandler(item.id, item.etat)}
       
      >
        <Card
          style={{
            width: itemSize,
            height: Dimensions.get("window").width * 0.5,
            marginRight: 8,
            overflow: "hidden",
            
            
          }}
        >
          <ImageBackground
            source={image}
            style={{ width: "100%", height: "100%" }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.etat && (
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontFamily: "futura-meduim",
                    }}
                  >
                    Irrigation
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontFamily: "futura-meduim",
                      alignSelf: "center",
                    }}
                  >
                    time
                  </Text>
                </View>
              )}
              <View style={styles.cardView}>
                {icon}
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </View>
          </ImageBackground>
        </Card>
      </TouchableOpacity>
      </Animated.View>
    );
  };
  const capteurRanderItem = (itemData) => {
    let icon = <Ionicons name="close-circle" size={45} color={Colors.danger} />;
    if (itemData.item.etat) {
      icon = (
        <Ionicons name="checkmark-circle" size={45} color={Colors.success} />
      );
    }

    return (
      <Card style={styles.secondCard}>
        <View>{icon}</View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Text style={{ fontFamily: "futura-bold" }}>{itemData.item.nom}</Text>
          <Text style={{ fontFamily: "futura-meduim" }}>
            {itemData.item.description}{" "}
          </Text>
        </View>
      </Card>
    );
  };
  const scaleH = scrollY.interpolate({
    inputRange:[0, 70],
    outputRange:[1,0]
  })
  

  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
      <Animated.ScrollView onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: scrollY } } },
              ],
              {useNativeDriver: true}
              )}>
        <View style={styles.header}>
          <Animated.Image
          
            style={{ width: 190, height: 90,transform:[{scale:scaleH}],opacity: scaleH  }}
            source={require("../assets/logoNav.png")}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.list}>
            <Text style={styles.text}>Zones</Text>
            <Animated.FlatList
              horizontal={true}
              data={ZONES}
              renderItem={zonesrenderHandler}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: scrollX } } },
              ],
              {useNativeDriver: true}
              )}
            />
          </View>
          <View style={styles.otherCards}>
            <View
              style={{
                width: "100%",
                backgroundColor: Colors.success,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderWidth: 0.5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "futura-meduim",
                }}
              >
                Capteurs
              </Text>
            </View>
            <FlatList data={CAPTEUR} renderItem={capteurRanderItem} />
          </View>
          <View style={styles.otherCards}>
            <View
              style={{
                width: "100%",
                backgroundColor: Colors.success,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderWidth: 0.5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontFamily: "futura-meduim",
                }}
              >
                Etat du controlleur
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="checkmark-circle"
                size={60}
                color={Colors.success}
              />
              <Text style={{ fontSize: 20, fontFamily: "futura-meduim" }}>
                Tous marche bien
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    elevation: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "100%",
  },
  list: {
    paddingLeft: 5,
    height: Dimensions.get("window").width * 0.5 + 40,
  },
  text: {
    fontFamily: "futura-bold",
    fontSize: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  cardText: {
    color: "white",
    fontSize: 20,
    fontFamily: "futura-meduim",
  },
  cardView: {
    alignItems: "center",
  },
  secondCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.8,
    height: 80,
    marginTop: 10,
    borderRadius: 40,
    backgroundColor: Colors.whiteSmoke,
    paddingHorizontal: 15,
  },
  otherCards: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.silver,
    overflow: "hidden",
    paddingBottom: 10,
  },
});

export default HomeScreen;


// testing github 