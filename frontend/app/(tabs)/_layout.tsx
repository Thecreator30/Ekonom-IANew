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
                    name="subscribers"
                    options={{ title: "Users" }}
                />
                <Tabs.Screen
                    name="promotions"
                    options={{ title: "Promos" }}
                />

                {/* 
                  Hidden tabs or other configurations if needed.
                  The design had: Dashboard, Coupons, Eko, Subscribers, Promotions.
                  We need to ensure these files exist or link to placeholders.
                */}
            </Tabs>
        </View>
    );
}
