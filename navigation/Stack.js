import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Movie from "../screens/Movie";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    return (
        <NativeStack.Navigator>
            <NativeStack.Screen name="Home" component={Movie} />
        </NativeStack.Navigator>
    );
}

export default Stack;