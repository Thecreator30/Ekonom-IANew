import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserCheck, Send, RefreshCw } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function SubscribersScreen() {
    const router = useRouter();
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadSubscribers = async () => {
        setLoading(true);
        try {
            const data = await api.subscribers.list();
            setSubscribers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubscribers();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
                <View>
                    <Text className="text-2xl font-extrabold text-slate-900">Subscribers</Text>
                    <Text className="text-slate-500">{subscribers.length} total active users</Text>
                </View>
                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={loadSubscribers}
                        className="bg-slate-50 p-3 rounded-full border border-slate-100"
                    >
                        <RefreshCw size={20} color="#64748b" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/notifications/send")}
                        className="bg-blue-50 p-3 rounded-full border border-blue-100"
                    >
                        <Send size={20} color="#2563eb" />
                    </TouchableOpacity>
                </View>
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#2563eb" />
                </View>
            ) : (
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
                                <Text className="font-bold text-slate-900">
                                    {item.phone_number || "Anonymous User"}
                                </Text>
                                <Text className="text-xs text-slate-400">
                                    Last active: {new Date(item.last_active_at).toLocaleDateString()}
                                </Text>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View className="items-center mt-10">
                            <Text className="text-slate-400">No subscribers yet.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}
