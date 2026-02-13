import { View, Text, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut, ChevronRight, Store, Bell, Shield } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <View className="px-6 py-6 bg-white mb-6">
                <Text className="text-2xl font-extrabold text-slate-900 mb-1">Store Settings</Text>
                <Text className="text-slate-500">Manage your merchant account</Text>
            </View>

            <View className="px-6">
                {/* Account Section */}
                <Text className="text-sm font-bold text-slate-400 uppercase mb-3">Account</Text>
                <View className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                    <TouchableOpacity className="flex-row items-center p-4 border-b border-slate-50">
                        <Store size={20} color="#64748b" className="mr-3" />
                        <Text className="flex-1 font-semibold text-slate-700">Store Details</Text>
                        <ChevronRight size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center p-4">
                        <Shield size={20} color="#64748b" className="mr-3" />
                        <Text className="flex-1 font-semibold text-slate-700">Security & Privacy</Text>
                        <ChevronRight size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                </View>

                {/* Preferences Section */}
                <Text className="text-sm font-bold text-slate-400 uppercase mb-3">Preferences</Text>
                <View className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                    <View className="flex-row items-center p-4 justify-between">
                        <View className="flex-row items-center">
                            <Bell size={20} color="#64748b" className="mr-3" />
                            <Text className="font-semibold text-slate-700">Push Notifications</Text>
                        </View>
                        <Switch value={true} trackColor={{ true: "#2563eb" }} />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => router.replace("/")}
                    className="flex-row items-center justify-center p-4 bg-red-50 rounded-xl border border-red-100"
                >
                    <LogOut size={20} color="#ef4444" className="mr-2" />
                    <Text className="text-red-600 font-bold">Log Out</Text>
                </TouchableOpacity>

                <Text className="text-center text-slate-400 text-xs mt-6">Version 1.0.0 (Build 42)</Text>
            </View>
        </SafeAreaView>
    );
}
