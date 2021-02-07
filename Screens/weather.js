import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import axios from "axios";

const Weather = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState();

  //   useEffect(() => {
  //     getLocation();
  //   }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("can't get location", "you need to allow location", [
        { text: "ok" },
      ]);
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 6000,
      });
      setPosition({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
      getWeather(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      Alert.alert(
        "could not fetch position",
        "please verify your location service is enabled",
        [{ text: "ok" }]
      );
    }
    setIsFetching(false);
  };

  const getWeather = async (lat, lon) => {
    if (lon === null || lat === null) {
      Alert.alert(
        "No position defined",
        "set your possition to have the weather",
        [{ text: "ok" }]
      );
    } else {
      setIsFetching(true);
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=87e46ac56650170bdc42cc871e3df4fd`
        );
        setWeather(response);
      } catch (err) {
        Alert.alert("cnx err", "verifier votre cnx", [{ text: "ok" }]);
      }
    }
    setIsFetching(false);
  };

  if (isFetching) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.Green_logo} />
      </View>
    );
  }
  console.log(weather);
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image
          style={{ width: 190, height: 90, marginTop: 30 }}
          source={require("../assets/logoNav.png")}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.firsView}>
          <View style={{ alignItems: "center"}}>
            <Text style={{  fontSize: 40 }}>
              15 °
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Ionicons name="caret-up" size={20} color="black" />
              <Text style={{  fontSize: 20 }}>
                20 ° /
              </Text>

              <Ionicons name="caret-down" size={20} color="black" />
              <Text style={{  fontSize: 20 }}>
                {" "}
                10 °
              </Text>
            </View>
          </View>
          <View>
          <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:8}}>
              <Fontisto name="wind" size={24} color="black" />
              <Text style={{  fontSize: 20 }}>{" "}30 M/S</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Ionicons name="cloud-outline" size={24} color="black" />
              <Text style={{  fontSize: 20 }}>30 %</Text>
            </View>
          </View>
        </View>
        <View style={styles.img}>
          <Image
            source={require("../assets/sun.jpg")}
            style={{ width: "100%", height: "100%",  }}
          />
        </View>
      </View>
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
    elevation: 30,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
    height: Dimensions.get("window").height,
  },
  firsView: {
    marginTop: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: Dimensions.get("window").width,
  },
  img: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default Weather;
