import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Sparkles, ArrowRight, Save, DollarSign, Percent } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function CreatePromotionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discountValue, setDiscountValue] = useState("");
    const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED'>('PERCENTAGE');
    const [loading, setLoading] = useState(false);

    // Pre-fill from Oxy
    useEffect(() => {
        if (params.description) {
            setDescription(params.description as string);
        }
    }, [params.description]);

    const handleCreate = async () => {
        if (!title || !description || !discountValue) {
            Alert.alert("Missing Fields", "Please fill in all fields to create a promotion.");
            return;
        }

        setLoading(true);
        try {
            await api.promotions.create({
                title,
                description,
                discount_value: parseFloat(discountValue),
                discount_type: discountType,
                target_segment: 'ALL', // Default for now
                scheduled_at: new Date(), // Now
            });
            Alert.alert("Success", "Promotion created successfully!", [
                { text: "OK", onPress: () => router.replace("/(tabs)/dashboard") }
            ]);
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to create promotion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>
                <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-100 bg-white z-10">
                    <Text className="text-xl font-bold text-slate-900">New Promotion</Text>
                    <TouchableOpacity onPress={() => router.back()} className="bg-slate-50 p-2 rounded-full">
                        <X size={24} color="#334155" />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
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
                            <Text className="font-bold text-slate-700 mb-2">Discount Value</Text>
                            <View className="flex-row gap-3">
                                <View className="flex-1 relative">
                                    <TextInput
                                        className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-900 font-bold text-lg pl-10"
                                        placeholder="20"
                                        keyboardType="numeric"
                                        value={discountValue}
                                        onChangeText={setDiscountValue}
                                    />
                                    <View className="absolute left-4 top-4">
                                        {discountType === 'PERCENTAGE' ? <Percent size={20} color="#64748b" /> : <DollarSign size={20} color="#64748b" />}
                                    </View>
                                </View>

                                <View className="flex-row bg-slate-100 p-1 rounded-xl">
                                    <TouchableOpacity
                                        className={`px-4 justify-center rounded-lg ${discountType === 'PERCENTAGE' ? 'bg-white shadow-sm' : ''}`}
                                        onPress={() => setDiscountType('PERCENTAGE')}
                                    >
                                        <Percent size={20} color={discountType === 'PERCENTAGE' ? '#0f172a' : '#94a3b8'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className={`px-4 justify-center rounded-lg ${discountType === 'FIXED' ? 'bg-white shadow-sm' : ''}`}
                                        onPress={() => setDiscountType('FIXED')}
                                    >
                                        <DollarSign size={20} color={discountType === 'FIXED' ? '#0f172a' : '#94a3b8'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </ScrollView>

                    <View className="p-6 border-t border-slate-100 bg-white">
                        <TouchableOpacity
                            className={`w-full py-4 rounded-xl items-center shadow-lg flex-row justify-center ${loading ? 'bg-slate-700 opacity-80' : 'bg-slate-900 shadow-slate-200'}`}
                            onPress={handleCreate}
                            disabled={loading}
                        >
                            <Text className="text-white font-bold text-lg mr-2">
                                {loading ? "Creating..." : "Create Campaign"}
                            </Text>
                            {!loading && <ArrowRight size={20} color="white" />}
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}
