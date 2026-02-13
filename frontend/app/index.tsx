import { View, Text, TouchableOpacity, TextInput, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Store, ArrowRight, Mail, Lock } from "lucide-react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View className="flex-1 bg-background">
            <StatusBar style="light" />
            {/* Background Gradient Mesh */}
            <View className="absolute top-0 left-0 right-0 h-[500px] opacity-30">
                <LinearGradient
                    colors={['#7c3aed', '#c026d3', 'transparent']}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </View>

            <SafeAreaView className="flex-1 justify-center px-8">
                {/* Header / Logo */}
                <View className="items-center mb-12">
                    <View className="w-20 h-20 rounded-3xl items-center justify-center mb-6 rotate-3 overflow-hidden bg-white/10 border border-white/20 shadow-2xl shadow-primary/50">
                        <LinearGradient
                            colors={['#7c3aed', '#c026d3']}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                        />
                        <Store size={40} color="white" />
                    </View>
                    <Text className="text-4xl font-extrabold text-white text-center tracking-tight">EKONOM-IA</Text>
                    <Text className="text-slate-400 text-center mt-3 px-4 font-medium tracking-wide">
                        MERCHANT CONSOLE
                    </Text>
                </View>

                {/* Form Card */}
                <View className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                    <View className="space-y-5">
                        <View>
                            <Text className="text-slate-300 font-semibold mb-2 ml-1 text-sm tracking-wide uppercase">Email Professionnel</Text>
                            <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary transition-all">
                                <Mail size={20} color="#94a3b8" className="mr-3" />
                                <TextInput
                                    className="flex-1 text-white font-medium text-base h-full placeholder:text-slate-600"
                                    placeholder="nom@entreprise.com"
                                    placeholderTextColor="#475569"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    style={Platform.OS === 'web' ? { outlineStyle: 'none' } : {}}
                                />
                            </View>
                        </View>

                        <View>
                            <Text className="text-slate-300 font-semibold mb-2 ml-1 text-sm tracking-wide uppercase">Mot de passe</Text>
                            <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary transition-all">
                                <Lock size={20} color="#94a3b8" className="mr-3" />
                                <TextInput
                                    className="flex-1 text-white font-medium text-base h-full placeholder:text-slate-600"
                                    placeholder="••••••••"
                                    placeholderTextColor="#475569"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    style={Platform.OS === 'web' ? { outlineStyle: 'none' } : {}}
                                />
                            </View>
                            <TouchableOpacity className="self-end mt-3">
                                <Text className="text-accent font-semibold text-sm">Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Actions */}
                    <View className="mt-8 space-y-4">
                        <TouchableOpacity
                            className="w-full rounded-xl flex-row justify-center items-center shadow-lg shadow-primary/30 overflow-hidden group"
                            onPress={() => router.replace("/(tabs)/dashboard")}
                        >
                            <LinearGradient
                                colors={['#7c3aed', '#c026d3']}
                                style={{ position: 'absolute', width: '100%', height: '100%' }}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                            />
                            <View className="py-4 flex-row items-center">
                                <Text className="text-white font-bold text-lg mr-2 tracking-wide">Accéder au Console</Text>
                                <ArrowRight size={20} color="white" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-full bg-white/5 py-4 rounded-xl flex-row justify-center items-center border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <Text className="text-white font-semibold text-lg tracking-wide">Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-12 items-center opacity-50">
                    <Text className="text-slate-500 text-xs tracking-widest uppercase">Secured by Stitch • v2.0</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}
