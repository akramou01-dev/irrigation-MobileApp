import React, { useReducer, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import PersoButton from "../Components/persoButton";
import Colors from "../Constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../Components/context";
import Axios from "axios";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    const updatedTouches = {
      ...state.inputValidities,
      [action.input]: action.isTouched,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputTuched: updatedTouches,
      inputValues: updatedValues,
    };
  }
  return state;
};

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { SignIn } = useContext(AuthContext);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    inputTuched: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (inputIdentifier == "email" && emailRegex.test(text.toLowerCase())) {
      isValid = true;
    } else if (
      inputIdentifier == "password" &&
      text.trim().length > 0 &&
      text.length > 6
    ) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      isTouched: true,
      input: inputIdentifier,
    });
  };

  const loginHandler = async () => {
    if (formState.formIsValid) {
      setIsLoading(true);

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHnNeM0JF6uNUBLSc3pSV4J80LL7kVQB8",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formState.inputValues.email,
            password: formState.inputValues.password,
            returnSecureToken: true,
          }),
        }
      );
      setIsLoading(false);
      if (!response.ok) {
        Alert.alert("prblm", "prblm de cnx");
      } else {
        const resData = await response.json();
       
        SignIn(resData.idToken);
      }
    } else {
      Alert.alert(
        "Invalid E-mail or password",
        "Please inter a valid E-mail or Password",
        [{ text: "ok", style: "cancel" }]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.Green_logo} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require("../assets/logo.png")} style={styles.img} />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.text}>Login to your account.</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="E-mail or phone number"
            onChangeText={textChangeHandler.bind(this, "email")}
          />
          {!formState.inputValidities.email &&
            formState.inputValues.email.length != 0 &&
            formState.inputTuched.email && (
              <Text style={styles.alertText}>Please enter a valid E-mail!</Text>
            )}
          <TextInput
            style={styles.input}
            secureTextEntry
            textContentType="password"
            placeholder="Password"
            onChangeText={textChangeHandler.bind(this, "password")}
          />
          {!formState.inputValidities.password &&
            formState.inputValues.password.length != 0 &&
            formState.inputTuched.password && (
              <Text style={styles.alertText}>
                Please enter a password longer than 6 characters
              </Text>
            )}
          <View style={styles.buttonContainer}>
            <PersoButton style={{ paddingVertical: 18 }} onPress={loginHandler}>
              Sign in
            </PersoButton>
          </View>
        </View>
        <View style={styles.media}>
          <Text style={{ fontFamily: "futura-meduim", fontSize: 19 }}>
            Or sign in with
          </Text>
          <View style={styles.mediaIcons}>
            <Entypo name="facebook" size={50} color="#3b5998" />
            <AntDesign name="instagram" size={50} color="#F56040" />
            <Entypo name="twitter" size={50} color="#1DA1F2" />
          </View>
          <View style={{ marginTop: 20, flexDirection: "row" }}>
            <Text style={{ fontSize: 17, fontFamily: "futura-meduim" }}>
              Don't have an account!{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.push("Signup");
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "futura-bold",
                  color: Colors.primary2,
                }}
              >
                {" "}
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imgContainer: {
    marginTop: 50,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  media: {
    marginTop: 40,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.6,
  },
  mediaIcons: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
  },
  inputs: {
    width: Dimensions.get("window").width * 0.8,
    alignItems: "flex-start",
  },
  text: {
    fontSize: 22,
    fontFamily: "futura-meduim",
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: Colors.grey_fade,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  alertText: {
    color: Colors.danger,
    fontFamily: "futura-meduim",
  },
});

export default Login;
