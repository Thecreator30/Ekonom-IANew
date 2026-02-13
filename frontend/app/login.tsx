import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react-native';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { GlassPanel } from '../components/ui/GlassPanel';
import { EkoBot } from '../components/EkoBot';
import Animated, { FadeInUp, FadeIn, FadeInDown } from 'react-native-reanimated';
import { api } from '../services/api';
import { saveTokens } from '../services/storage';

export default function LoginScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.auth.login(email, password);
            await saveTokens(response.accessToken, response.refreshToken);
            router.replace("/(tabs)/dashboard");
        } catch (err: any) {
            Alert.alert(
                "Échec de la connexion",
                err?.response?.data?.message || err.message || "Une erreur est survenue"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <AnimatedBackground />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(400)} className="px-6 pt-14 pb-2 flex-row justify-between items-center z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/10 items-center justify-center"
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={20} color="white" />
                </TouchableOpacity>
                <GlassPanel className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full">
                    <ShieldCheck size={12} color="#22c55e" />
                    <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sécurisé</Text>
                </GlassPanel>
            </Animated.View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    className="px-6 pb-10"
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Eko Bot + Title */}
                    <Animated.View entering={FadeInUp.duration(800)} className="items-center mb-8">
                        {/* Eko avatar */}
                        <View className="relative mb-5">
                            <View className="absolute w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                            <GlassPanel
                                intensity={25}
                                className="w-24 h-24 rounded-full items-center justify-center border border-white/15"
                            >
                                <EkoBot scale={0.9} />
                            </GlassPanel>
                        </View>

                        <Text className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                            Espace Pro
                        </Text>
                        <Text className="text-gray-400 text-sm text-center max-w-[280px] leading-5">
                            Connectez-vous pour piloter vos campagnes avec Eko.
                        </Text>
                    </Animated.View>

                    {/* Login Form */}
                    <Animated.View entering={FadeInUp.delay(200).duration(800)}>
                        <GlassPanel className="rounded-3xl p-6">

                            {/* Email */}
                            <View className="mb-5">
                                <Text className="text-xs font-bold text-gray-400 ml-1 mb-2 uppercase tracking-wide">Email</Text>
                                <View className="flex-row items-center bg-black/40 border border-white/10 rounded-2xl px-4">
                                    <Mail size={18} color="#6b7280" />
                                    <TextInput
                                        placeholder="boutique@example.com"
                                        placeholderTextColor="#4b5563"
                                        className="flex-1 text-white py-4 pl-3 text-[15px]"
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        autoComplete="email"
                                    />
                                </View>
                            </View>

                            {/* Password */}
                            <View className="mb-6">
                                <View className="flex-row justify-between items-center ml-1 mb-2">
                                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mot de passe</Text>
                                    <TouchableOpacity>
                                        <Text className="text-[10px] font-bold text-blue-400">Oublié ?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row items-center bg-black/40 border border-white/10 rounded-2xl px-4">
                                    <Lock size={18} color="#6b7280" />
                                    <TextInput
                                        secureTextEntry={!showPassword}
                                        placeholder="••••••••"
                                        placeholderTextColor="#4b5563"
                                        className="flex-1 text-white py-4 pl-3 text-[15px]"
                                        value={password}
                                        onChangeText={setPassword}
                                        autoComplete="password"
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                                        {showPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                onPress={handleLogin}
                                disabled={isLoading}
                                activeOpacity={0.8}
                                className={`w-full py-4 rounded-2xl flex-row items-center justify-center gap-2 ${isLoading ? 'bg-blue-600/50' : 'bg-blue-600'}`}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Text className="text-white font-bold text-base">Se connecter</Text>
                                        <Sparkles size={16} color="white" style={{ opacity: 0.7 }} />
                                    </>
                                )}
                            </TouchableOpacity>
                        </GlassPanel>
                    </Animated.View>

                    {/* Footer */}
                    <Animated.View entering={FadeInDown.delay(400)} className="mt-6 items-center">
                        <TouchableOpacity>
                            <Text className="text-gray-400 text-xs font-medium">
                                Pas encore de compte ? <Text className="font-bold text-blue-400">Créer un compte</Text>
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
