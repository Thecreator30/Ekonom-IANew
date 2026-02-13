import { Tabs } from "expo-router";
import { View } from "react-native";
import { GlassDock } from "../../components/ui/GlassDock";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
    return (
        <View className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <Tabs
                tabBar={(props) => <GlassDock {...props} />}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                }}
            >
                <Tabs.Screen
                    name="dashboard"
                    options={{ title: "Home" }}
                />
                <Tabs.Screen
                    name="coupons"
                    options={{ title: "Coupons" }}
                />
                <Tabs.Screen
                    name="assistant"
                    options={{ title: "Eko" }}
                />
                <Tabs.Screen
                    name="scan"
                    options={{ title: "Scan" }}
                />
                <Tabs.Screen
                    name="promotions"
                    options={{ title: "Promos" }}
                />
                {/* Hidden screens that exist as files but shouldn't show in tabs */}
                <Tabs.Screen
                    name="subscribers"
                    options={{ href: null }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{ href: null }}
                />
            </Tabs>
        </View>
    );
}
