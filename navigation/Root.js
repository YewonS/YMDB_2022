import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./Tabs";
import Stack from "./Stack";

const RootStack = createNativeStackNavigator();

const Root = () => {
    return (
        <RootStack.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
            <RootStack.Screen name="Tabs" component={BottomNav} />
            <RootStack.Screen name="Stack" component={Stack} />
        </RootStack.Navigator>
    );
}

export default Root;