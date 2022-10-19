import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { DARK_BG_COLOR, LIGHT_BG_COLOR, DARK_PINK, LIGHT_PINK } from "../colors";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === "dark";
    return (
      <NativeStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: isDark ? DARK_BG_COLOR : LIGHT_BG_COLOR,
          },
          headerTitleStyle: {
            color: isDark ? LIGHT_PINK : DARK_PINK,
          },
        }}
      >
        <NativeStack.Screen name="Detail" component={Detail} />
      </NativeStack.Navigator>
    );
  };

export default Stack;