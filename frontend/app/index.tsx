import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Bot } from "lucide-react-native";
import { AuthService } from "../services/auth";
import { saveTokens } from "../services/storage";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await AuthService.login(email, password);
            await saveTokens(response.accessToken, response.refreshToken);
            router.replace("/(tabs)/dashboard");
        } catch (err: any) {
            setError(err.message || "Échec de la connexion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-slate-900">
            <StatusBar style="light" />

            {/* Background elements */}
            <View className="absolute top-0 left-0 right-0 h-[500px] opacity-30">
                <LinearGradient
                    colors={['#7c3aed', 'transparent']}
                    style={{ flex: 1 }}
                />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center p-8"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View className="items-center mb-10">
                        {/* Logo placeholder */}
                        <View className="w-20 h-20 bg-white/10 rounded-3xl items-center justify-center mb-6 border border-white/20">
                            <Text className="text-4xl">🚀</Text>
                        </View>
                        <Text className="text-4xl font-bold text-white mb-2 tracking-tight">Ekonom-IA</Text>
                        <Text className="text-slate-400 text-center">Gestion de fidélité intelligente</Text>
                    </View>

                    <View className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                        {error && (
                            <View className="bg-red-500/20 p-3 rounded-xl mb-4 border border-red-500/30">
                                <Text className="text-red-300 text-center">{error}</Text>
                            </View>
                        )}

                        <View className="space-y-4">
                            <View>
                                <Text className="text-slate-300 mb-2 ml-1 text-sm font-medium">Email</Text>
                                <TextInput
                                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:border-purple-500"
                                    placeholder="nom@entreprise.com"
                                    placeholderTextColor="#475569"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                />
                            </View>

                            <View>
                                <Text className="text-slate-300 mb-2 ml-1 text-sm font-medium">Mot de passe</Text>
                                <TextInput
                                    className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:border-purple-500"
                                    placeholder="••••••••"
                                    placeholderTextColor="#475569"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity
                                className="bg-purple-600 py-4 rounded-xl items-center mt-4 shadow-lg shadow-purple-500/20 active:opacity-90"
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                <Text className="text-white font-bold text-lg">
                                    {loading ? "Connexion..." : "Se connecter"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mt-8 items-center">
                        <Text className="text-slate-500">Pas encore de compte ?</Text>
                        <TouchableOpacity onPress={() => router.push("/register")}>
                            <Text className="text-purple-400 font-bold mt-1">Créer un compte marchand</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

<View className="mt-12 items-center opacity-50">
    <Text className="text-slate-500 text-xs tracking-widest uppercase">Secured by Stitch • v2.0</Text>
</View>
            </SafeAreaView >
        </View >
    );
}
