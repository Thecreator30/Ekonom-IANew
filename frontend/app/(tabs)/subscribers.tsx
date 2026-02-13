import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCheck, Send } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function SubscribersScreen() {
    const router = useRouter();
    const subscribers = Array.from({ length: 10 }).map((_, i) => ({
        id: i.toString(),
        name: `User ${i + 1}`,
        joined: "Today",
    }));

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
                <View>
                    <Text className="text-2xl font-extrabold text-slate-900">Subscribers</Text>
                    <Text className="text-slate-500">1,240 total active users</Text>
                </View>
                <TouchableOpacity
                    onPress={() => router.push("/notifications/send")}
                    className="bg-blue-50 p-3 rounded-full border border-blue-100"
                >
                    <Send size={20} color="#2563eb" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={subscribers}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 24 }}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3 flex-row items-center">
                        <View className="w-10 h-10 bg-purple-50 rounded-full items-center justify-center mr-3">
                            <UserCheck size={20} color="#7c3aed" />
                        </View>
                        <View>
                            <Text className="font-bold text-slate-900">{item.name}</Text>
                            <Text className="text-xs text-slate-400">Joined {item.joined}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
