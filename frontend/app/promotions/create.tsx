import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Sparkles, ArrowRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CreatePromotionScreen() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-100">
                <Text className="text-xl font-bold text-slate-900">New Promotion</Text>
                <TouchableOpacity onPress={() => router.back()} className="bg-slate-50 p-2 rounded-full">
                    <X size={24} color="#334155" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-6">
                {/* AI Banner */}
                <TouchableOpacity
                    onPress={() => router.push("/promotions/oxy")}
                    className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex-row items-center mb-8"
                >
                    <View className="bg-purple-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                        <Sparkles size={20} color="#7c3aed" />
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-purple-900">Need inspiration?</Text>
                        <Text className="text-purple-600 text-xs">Let Oxy write the perfect offer for you.</Text>
                    </View>
                    <ArrowRight size={20} color="#7c3aed" />
                </TouchableOpacity>

                <View className="mb-6">
                    <Text className="font-bold text-slate-700 mb-2">Campaign Title</Text>
                    <TextInput
                        className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-900 font-semibold"
                        placeholder="e.g. Summer Flash Sale"
                        placeholderTextColor="#94a3b8"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View className="mb-6">
                    <Text className="font-bold text-slate-700 mb-2">Description</Text>
                    <TextInput
                        className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-900 h-32 text-start"
                        placeholder="Describe your offer details..."
                        placeholderTextColor="#94a3b8"
                        multiline
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>

                <View className="mb-6">
                    <Text className="font-bold text-slate-700 mb-2">Discount Type</Text>
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-xl items-center">
                            <Text className="text-white font-bold">Percentage</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-slate-50 py-3 rounded-xl items-center border border-slate-200">
                            <Text className="text-slate-600 font-bold">Fixed Amount</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <View className="p-6 border-t border-slate-100">
                <TouchableOpacity
                    className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-lg shadow-slate-200"
                    onPress={() => router.back()}
                >
                    <Text className="text-white font-bold text-lg">Create Campaign</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
