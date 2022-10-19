import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movie";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { LIGHT_PINK, DARK_PINK, DARK_BG_COLOR, PINK_BG_COLOR, LIGHT_BG_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
    const isDarkMode = useColorScheme() === "dark";

    return (
        <Tab.Navigator 
            initialRouteName="Movies"
            sceneContainerStyle={{
                backgroundColor: isDarkMode ? DARK_BG_COLOR : LIGHT_BG_COLOR
            }}
            screenOptions={{
                unmountOnBlur: true,
                tabBarStyle: { backgroundColor: isDarkMode ? "black" : DARK_BG_COLOR },
                tabBarActiveTintColor: isDarkMode ? DARK_PINK : LIGHT_PINK,
                tabBarInactiveTintColor: "white",
                headerStyle: {
                    backgroundColor: isDarkMode ? DARK_BG_COLOR : PINK_BG_COLOR,
                },
                headerTitleStyle: {
                    color: isDarkMode ? "white" : "black",
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                }
            }}
        >
            <Tab.Screen 
                name="Movies" 
                component={Movies} 
                options={{
                    tabBarIcon: ({ focused, color, size }) => { 
                        return <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size} />
                }
            }} />
            <Tab.Screen name="TV" component={TV} options={{
                tabBarIcon: ({ focused, color, size }) => { 
                    return <Ionicons name={focused ? "tv" : "tv-outline"} color={color} size={size} />
                }
            }} />
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ focused, color, size }) => { 
                    return <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
                }
            }} />
        </Tab.Navigator>
    );
}

export default BottomNav;