import React from "react";
import { API_KEY } from "@env";
import { useColorScheme } from 'react-native';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import BottomNav from "./navigation/Tabs";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "react-query";


export default function App() {
  const [assets] = useAssets([require("./assets/movies_img1.jpg")]); 
  const [loaded] = Font.useFonts(Ionicons.font);

  const isDarkMode = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    // theme={isDarkMode ? DarkTheme : DefaultTheme} 
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <NavigationContainer >
          <Root />
          {/* <BottomNav /> */}
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
