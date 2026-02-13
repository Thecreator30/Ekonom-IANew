import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Sparkles, Copy, RefreshCw } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function OxyScreen() {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = () => {
        if (!prompt) return;
        setLoading(true);
        // Simulate AI generation
        setTimeout(() => {
            setResult("🚀 Exclusive Flash Sale! Get 50% OFF all pastries this weekend only. Treat yourself to the best croissants in town! 🥐✨");
            setLoading(false);
        }, 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 flex-row justify-between items-center bg-white">
                <View className="flex-row items-center gap-2">
                    <Sparkles size={24} color="#7c3aed" />
                    <Text className="text-xl font-bold text-slate-900">Oxy Assistant</Text>
                </View>
                <TouchableOpacity onPress={() => router.back()} className="bg-slate-50 p-2 rounded-full">
                    <X size={24} color="#334155" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 p-6">
                <Text className="text-slate-500 mb-6 font-medium">
                    Tell me what you want to promote, and I'll write the perfect copy for you.
                </Text>

                <TextInput
                    className="bg-purple-50 p-5 rounded-2xl border border-purple-100 text-purple-900 text-lg mb-6 h-40"
                    placeholder="e.g. 3 croissants for the price of 2 today only..."
                    placeholderTextColor="#a78bfa"
                    multiline
                    textAlignVertical="top"
                    value={prompt}
                    onChangeText={setPrompt}
                />

                {result && (
                    <View className="bg-white p-6 rounded-2xl border-2 border-slate-100 mb-6 relative">
                        <Text className="text-slate-800 text-lg leading-7 font-medium">{result}</Text>
                        <View className="flex-row justify-end mt-4 gap-4">
                            <TouchableOpacity className="flex-row items-center bg-slate-100 px-3 py-2 rounded-lg">
                                <RefreshCw size={16} color="#64748b" className="mr-2" />
                                <Text className="text-slate-600 font-bold text-xs">Try Again</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="flex-row items-center bg-blue-50 px-3 py-2 rounded-lg"
                                onPress={() => router.push({ pathname: "/promotions/create", params: { description: result } })}
                            >
                                <Copy size={16} color="#2563eb" className="mr-2" />
                                <Text className="text-blue-600 font-bold text-xs">Use This</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {!result && (
                    <TouchableOpacity
                        className={`w-full py-4 rounded-xl items-center shadow-lg shadow-purple-200 flex-row justify-center ${loading || !prompt ? 'bg-purple-300' : 'bg-purple-600'}`}
                        onPress={handleGenerate}
                        disabled={loading || !prompt}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <Sparkles size={20} color="white" className="mr-2" />
                                <Text className="text-white font-bold text-lg">Generate Magic</Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}
