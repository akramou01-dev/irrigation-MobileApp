import React, { useState, useMemo, useEffect } from "react";
import { View, ActivityIndicator, Image, StyleSheet,Alert } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";

import { AuthContext } from "./Components/context";
import Colors from "./Constants/Colors";
import HomeScreen from "./Screens/homeScreen";
import ZonesScreen from "./Screens/zonesScreen";
import Stat from "./Screens/statistiques";
import Notifications from "./Screens/notifications";
import Weather from "./Screens/weather";
import Profile from "./Screens/profile";
import Login from "./Screens/login";
import Signup from "./Screens/signup";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Axios from "axios";

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "futura-bold": require("./assets/fonts/futura_md_bt_bold.ttf"),
    "futura-meduim": require("./assets/fonts/FuturaMediumBT.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontsLoaded] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authentificationHandlers = useMemo(
    () => ({
      SignIn: (idToken) => {
        setToken(idToken);
      },
      // Signup: () => {
      //   setIsLoged(true);
      //   setIsLoading(false);
      // },
      SignOut: () => {
        // setIsLoading(false);
      },
    }),
    []
  );

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={() => {
          setFontsLoaded(true);
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.Green_logo} />
      </View>
    );
  }

  const HomeNavigator = createStackNavigator();
  const LoginNavigator = createStackNavigator();
  const ButtomTab = createBottomTabNavigator();

  const HomeStackNavigator = () => (
    <HomeNavigator.Navigator
      headerMode="none"
      initialRouteName="HomeScreen"
      screenOptions={{
        cardStyle: {
          backgroundColor: "white",
        },
        // headerStyle: {
        //   backgroundColor: "white",
        // },
        // headerTintColor: Colors.Green_grean,
      }}
    >
      <HomeNavigator.Screen
        name="HomeScreen"
        options={{
          headerTitle: () => (
            <Image
              style={{ width: 160, height: 130 }}
              source={require("./assets/logoNav.png")}
            />
          ),
        }}
        component={HomeScreen}
      />
      <HomeNavigator.Screen name="ZonesScreen" component={ZonesScreen} />
    </HomeNavigator.Navigator>
  );

  return (
    <AuthContext.Provider value={authentificationHandlers}>
      <NavigationContainer>
        {!token ? (
          <ButtomTab.Navigator
            tabBarOptions={{
              activeTintColor: Colors.dark_grey,
              inactiveTintColor: Colors.grey_fade,
              labelStyle: styles.tabText,
              style: styles.tab,
            }}

            // labeled={false}
          >
            <ButtomTab.Screen
              name="Home"
              component={HomeStackNavigator}
              options={{
                tabBarColor: "white",
                tabBarIcon: ({ color }) => {
                  return <Ionicons name="home" size={30} color={color} />;
                },
              }}
            />
            <ButtomTab.Screen
              name="Stats"
              component={Stat}
              options={{
                tabBarColor: "white",
                tabBarIcon: ({ color }) => {
                  return (
                    <Ionicons name="stats-chart" size={30} color={color} />
                  );
                },
              }}
            />
            <ButtomTab.Screen
              name="Weather"
              component={Weather}
              options={{
                tabBarColor: "white",
                tabBarIcon: ({ color }) => {
                  return (
                    <Ionicons name="partly-sunny" size={30} color={color} />
                  );
                },
              }}
            />
            <ButtomTab.Screen
              name="Notifications"
              component={Notifications}
              options={{
                tabBarColor: "white",
                tabBarIcon: ({ color }) => {
                  return (
                    <Ionicons name="notifications" size={30} color={color} />
                  );
                },
              }}
            />
            <ButtomTab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarColor: "white",
                tabBarIcon: ({ color }) => {
                  return <FontAwesome name="user" size={30} color={color} />;
                },
              }}
            />
          </ButtomTab.Navigator>
        ) : (
          <LoginNavigator.Navigator headerMode="none">
            <LoginNavigator.Screen
              name="Login"
              component={Login}
              // onLog={() => {
              //   setIsLoged(true);
              // }}
            />
            <LoginNavigator.Screen name="Signup" component={Signup} />
          </LoginNavigator.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 13,
    fontFamily: "futura-bold",
  },
  tab: {
    borderTopColor: Colors.whiteSmoke,
    borderTopWidth: 0.3,
    height: 55,
    paddingVertical: 5,
    elevation: 10,
    overflow: "hidden",
  },
});
