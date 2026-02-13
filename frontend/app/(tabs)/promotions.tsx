import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Tag, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function PromotionsScreen() {
    const router = useRouter();

    const promotions = [
        { id: "1", title: "Summer Sale", status: "Active", views: 120, conversions: 12 },
        { id: "2", title: "Welcome Offer", status: "Active", views: 450, conversions: 89 },
        { id: "3", title: "Flash Deal", status: "Expired", views: 80, conversions: 5 },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
                <Text className="text-2xl font-extrabold text-slate-900">Promotions</Text>
            </View>

            <FlatList
                data={promotions}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <TouchableOpacity className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4 flex-row items-center">
                        <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${item.status === 'Active' ? 'bg-blue-50' : 'bg-slate-100'}`}>
                            <Tag size={20} color={item.status === 'Active' ? '#2563eb' : '#94a3b8'} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-slate-900">{item.title}</Text>
                            <Text className={`text-sm font-medium ${item.status === 'Active' ? 'text-green-600' : 'text-slate-400'}`}>
                                {item.status} • {item.views} views
                            </Text>
                        </View>
                        <View className="items-end">
                            <Text className="text-xl font-bold text-slate-900">{item.conversions}</Text>
                            <Text className="text-xs text-slate-400">Claims</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Floating Action Button */}
            <TouchableOpacity
                onPress={() => router.push("/promotions/create")}
                className="absolute bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full shadow-xl shadow-blue-300 items-center justify-center"
            >
                <Plus size={32} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
