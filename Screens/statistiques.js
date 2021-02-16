import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  PanResponder,
} from "react-native";

const Stat = (props) => {
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  //   Animated.timing(position, {
  //     toValue: { x: 300, y: 500 },
  //     duration: 2000,
  //     useNativeDriver: true,
  //   }).start();

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, ges)=>{
        position.setValue({x:ges.dx,y:ges.dy})
    },
    // Animated.event([
    //   null,
    //   { dx: position.x, dy: position.y },
    // ]),
    onPanResponderRelease:()=>{
        // position.setValue({x:0,y:0}) or 
        Animated.spring(position,{
            toValue:{x:0,y:0},
            useNativeDriver:true
         
        }).start()
    }
  });

  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "180deg"],
  });
  return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Animated.View
      {...pan.panHandlers}
      style={{
        paddingTop: StatusBar.currentHeight,
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        backgroundColor: "yellow",
        transform: [
          { translateX: position.x },
          { translateY: position.y },
          { rotate: rotate },
        ],
      }}
    >
      <Text>hi </Text>
    </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Stat;
