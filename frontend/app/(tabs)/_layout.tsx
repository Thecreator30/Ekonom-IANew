import { Tabs } from "expo-router";
import { LayoutDashboard, Users, Tag, ScanLine, Store, QrCode } from "lucide-react-native";
import { View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    borderTopWidth: 1,
                    borderTopColor: "#f1f5f9",
                    height: 90,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: "#2563eb",
                tabBarInactiveTintColor: "#94a3b8",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginBottom: 10,
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="promotions"
                options={{
                    title: "Promos",
                    tabBarIcon: ({ color, size }) => <Tag size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="qr" // Changed from 'scan' to 'qr' to match folder name
                options={{
                    title: "QR Code",
                    tabBarIcon: ({ color }) => (
                        <View className="bg-blue-600 p-4 rounded-full -mt-8 shadow-lg shadow-blue-300 border-4 border-white">
                            <QrCode size={24} color="white" />
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen
                name="subscribers"
                options={{
                    title: "Users",
                    tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <Store size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
