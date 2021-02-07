import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  StatusBar,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import CountDown from "react-native-countdown-component";
import Colors from "../Constants/Colors";
import PersoModal from "../Components/persoModal";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
const ZonesScreen = (props) => {
  const [show, setShow] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isPresed, setIsPressed] = useState(false);
  const [time, setTime] = useState(new Date());
  const [irrigationDays, setIrrigationDays] = useState({
    sam: false,
    dim: false,
    lun: false,
    mar: false,
    mer: false,
    jeu: false,
    ven: false,
  });
  const [irrigationProgramme, setIrrigationProgramme] = useState({
    days: "5,6",
    time: "23:30",
    length: "60",
  });
  // const [restTime, setRestTime] = useState(() => {
  //   let today = new Date().getDay();
  //   let hour = new Date().getHours() + 1;
  //   let minuts = new Date().getMinutes();

  //   if (irrigationProgramme.days.indexOf(`${today}` != -1)) {
  //     if (irrigationProgramme.time > `${hour}:${minuts}`) {
  //       return (
  //         (parseInt(irrigationProgramme.time.substring(0, 2)) - hour) * 3600 +
  //         parseInt(irrigationProgramme.time.substring(3) - minuts) * 60
  //       );
  //     }else if (irrigationProgramme.time.substring(0, 2)> `${hour}` && irrigationProgramme.time.substring(3) < `${minuts}`){

  //     }
  //   }
  // });

  const radioHandler = () => {
    setIsPressed(!isPresed);
  };

  // const modalToggel = () => {
  //   setShow(!show);
  // };
  const showTimePicker = () => {
    setShowTimer(true);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowTimer(false);
    setTime(currentDate);
    setIrrigationProgramme({
      ...irrigationProgramme,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
    });
  };

  const selectDateHandler = (event) => {
    let added;
    if (event === 0) {
      setIrrigationDays({ ...irrigationDays, dim: !irrigationDays.dim });
      added = !irrigationDays.dim;
    } else if (event === 1) {
      setIrrigationDays({ ...irrigationDays, lun: !irrigationDays.lun });
      added = !irrigationDays.lun;
    } else if (event === 2) {
      setIrrigationDays({ ...irrigationDays, mar: !irrigationDays.mar });
      added = !irrigationDays.mar;
    } else if (event === 3) {
      setIrrigationDays({ ...irrigationDays, mer: !irrigationDays.mer });
      added = !irrigationDays.mer;
    } else if (event === 4) {
      setIrrigationDays({ ...irrigationDays, jeu: !irrigationDays.jeu });
      added = !irrigationDays.jeu;
    } else if (event === 5) {
      setIrrigationDays({ ...irrigationDays, ven: !irrigationDays.ven });
      added = !irrigationDays.ven;
    } else if (event === 6) {
      setIrrigationDays({ ...irrigationDays, sam: !irrigationDays.sam });
      added = !irrigationDays.sam;
    }
    let prog = "";
    for (const item of Object.entries(irrigationDays)) {
      if (item[0] === "dim" && item[1]) {
        prog = prog + "0" + ",";
      } else if (item[0] === "lun" && item[1]) {
        prog = prog + "1" + ",";
      } else if (item[0] === "mar" && item[1]) {
        prog = prog + "2" + ",";
      } else if (item[0] === "mer" && item[1]) {
        prog = prog + "3" + ",";
      } else if (item[0] === "jeu" && item[1]) {
        prog = prog + "4" + ",";
      } else if (item[0] === "ven" && item[1]) {
        prog = prog + "5" + ",";
      } else if (item[0] === "sam" && item[1]) {
        prog = prog + "6" + ",";
      }
    }
    if (added) {
      prog = prog + event.toString() + ",";
    } else {
      prog = prog.replace(`${event.toString()},`, "");
    }
    setIrrigationProgramme({ ...irrigationProgramme, days: prog });
  };

  return (
    <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
      <ScrollView>
        <View style={styles.header}>
          <ImageBackground
            style={{
              width: screenWidth,
              height: screenWidth,
              marginTop: screenHeight * 0.3,
            }}
            source={require("../assets/werd.png")}
          >
            <TouchableOpacity
              style={{
                marginTop: screenHeight * 0.07,
                width: screenWidth * 0.15,
              }}
              onPress={() => {
                props.navigation.navigate("HomeScreen");
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left-drop-circle"
                size={screenWidth * 0.1}
                color={Colors.dark_grey}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.container}>
          <Text style={styles.boldText}>Zone {props.route.params.id}</Text>
          <Text style={styles.mediumText}>Type de produit</Text>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.smallText}>Controler l'irrigation</Text>
            {props.route.params.etat ? (
              <View style={styles.monitor}>
                <TouchableOpacity disabled>
                  <SimpleLineIcons
                    name="control-play"
                    size={screenWidth * 0.1}
                    color={Colors.grey_fade}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SimpleLineIcons
                    name="control-pause"
                    size={screenWidth * 0.1}
                    color={Colors.dark_grey}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SimpleLineIcons
                    name="info"
                    size={screenWidth * 0.1}
                    color={Colors.dark_grey}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.monitor}>
                <TouchableOpacity>
                  <SimpleLineIcons
                    name="control-play"
                    size={screenWidth * 0.1}
                    color={Colors.dark_grey}
                  />
                </TouchableOpacity>
                <TouchableOpacity disabled>
                  <SimpleLineIcons
                    name="control-pause"
                    size={screenWidth * 0.1}
                    color={Colors.grey_fade}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SimpleLineIcons
                    name="info"
                    size={screenWidth * 0.1}
                    color={Colors.dark_grey}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.boldText}>Programme d'Irrigation</Text>
            <View style={{ marginTop: 10, marginBottom: 17 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.smallText}>Heure:</Text>
                  <TouchableOpacity onPress={showTimePicker}>
                    <View style={styles.input}>
                      <Text
                        style={{
                          color: Colors.dark_grey,
                        }}
                      >
                        {irrigationProgramme.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.smallText}>Durée:</Text>

                  <View style={styles.input}>
                    <TextInput
                      value={irrigationProgramme.length}
                      onChangeText={(e) => {
                        setIrrigationProgramme({
                          ...irrigationProgramme,
                          length: `${e}`,
                        });
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.days}>
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor: irrigationDays.dim
                      ? Colors.successFade
                      : "white",
                  }}
                  onPress={() => selectDateHandler(0)}
                >
                  <Text style={styles.dayText}>Dim.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor: irrigationDays.lun
                      ? Colors.successFade
                      : "white",
                  }}
                  onPress={() => selectDateHandler(1)}
                >
                  <Text style={styles.dayText}>Lun.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor: irrigationDays.mar
                      ? Colors.successFade
                      : "white",
                  }}
                  onPress={() => selectDateHandler(2)}
                >
                  <Text style={styles.dayText}>Mar.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor: irrigationDays.mer
                      ? Colors.successFade
                      : "white",
                  }}
                  onPress={() => selectDateHandler(3)}
                >
                  <Text style={styles.dayText}>Mer.</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  ...styles.days,
                  ...{ width: screenWidth * 0.6, alignSelf: "center" },
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor: irrigationDays.jeu
                      ? Colors.successFade
                      : "white",
                  }}
                  onPress={() => selectDateHandler(4)}
                >
                  <Text style={styles.dayText}>Jeu.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor: irrigationDays.ven
                      ? Colors.successFade
                      : "white",
                  }}
                  onPress={() => selectDateHandler(5)}
                >
                  <Text style={styles.dayText}>Ven.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.day,
                    backgroundColor: irrigationDays.sam
                      ? Colors.successFade
                      : "white",
                  }}
                  onPress={() => selectDateHandler(6)}
                >
                  <Text style={styles.dayText}>Sam.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.boldText}>Irrigation intéligente</Text>
            <Text style={styles.description}>
              Le systéme vas manager Votre irrigation celon une étude bien
              précise. Cliquez sur le bouton ci-dessous pour activer cette
              option
            </Text>
            <TouchableOpacity
              onPress={radioHandler}
              style={{
                ...styles.radio,
                ...{
                  alignItems: isPresed ? "flex-end" : "flex-start",
                  backgroundColor: isPresed ? Colors.successFade : "white",
                },
              }}
            >
              <View
                style={{
                  ...styles.but,
                  ...{
                    backgroundColor: !isPresed ? Colors.silver : Colors.success,
                  },
                }}
              ></View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.smallText}>Prochaine irrigation dans: </Text>
            <CountDown
              until={2450}
              digitStyle={{ backgroundColor: "transparent" }}
              digitTxtStyle={{
                ...styles.smallText,
                ...{ color: Colors.danger },
              }}
              timeLabels={{ d: null, h: null, m: null, s: null }}
              showSeparator
              separatorStyle={{ color: Colors.danger }}
              // onFinish={() => alert("finished")}
              size={15}
            />
          </View>
        </View>
        <View>
          {/* <PersoModal visible={show} closeModal={modalToggel}>
          </PersoModal> */}
          {showTimer && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: screenHeight * 0.12,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    elevation: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  boldText: {
    fontFamily: "futura-meduim",
    fontSize: screenWidth * 0.065,
    fontWeight: "bold",
    alignSelf: "center",
  },
  mediumText: {
    fontSize: screenWidth * 0.055,
    color: "black",
  },
  smallText: {
    fontFamily: "futura-meduim",
    fontSize: screenWidth * 0.035,
    alignSelf: "center",
    color: Colors.dark_grey,
  },
  dayText: {
    fontSize: screenWidth * 0.05,
    fontWeight: "bold",
    color: Colors.dark_grey,
  },

  description: {
    fontFamily: "futura-meduim",
    fontSize: screenWidth * 0.04,
    textAlign: "center",
    marginVertical: 13,
    color: Colors.dark_grey,
  },
  monitor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
    width: screenWidth * 0.4,
  },
  days: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.silver,
    borderRadius: screenWidth * 0.05,
    width: screenWidth * 0.2,
    height: screenWidth * 0.09,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.silver,
    width: screenWidth * 0.14,
    height: screenWidth * 0.14,
    borderRadius: screenWidth * 0.07,
  },
  radio: {
    width: 70,
    height: 36,
    borderWidth: 2,
    borderRadius: 18,
    borderColor: Colors.grey_fade,
    justifyContent: "center",
  },
  but: {
    height: 32,
    width: 32,
    borderRadius: 15,
  },
});

export default ZonesScreen;
