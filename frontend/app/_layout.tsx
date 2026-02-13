import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MobileContainer } from "../components/MobileContainer";

export default function Layout() {
  return (
    <MobileContainer>
      <SafeAreaProvider>
        <View className="flex-1 bg-white">
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="promotions/create" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="promotions/eko" options={{ presentation: 'modal', headerShown: false }} />
          </Stack>
        </View>
      </SafeAreaProvider>
    </MobileContainer>
  );
}
