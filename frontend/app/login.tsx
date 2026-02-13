import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Store, User, Sparkles, ShieldCheck } from 'lucide-react-native';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { GlassPanel } from '../components/ui/GlassPanel';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { api } from '../services/api';
import { saveTokens } from '../services/storage';

export default function LoginScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState<'merchant' | 'client'>('merchant');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        setIsLoading(true);

        try {
            if (userType === 'merchant') {
                // Real API Call for Merchant
                const response = await api.auth.login(email, password);
                await saveTokens(response.accessToken, response.refreshToken);
                router.replace("/(tabs)/dashboard");
            } else {
                // Mock Client Login for now
                setTimeout(() => {
                    router.replace("/client/home"); // Assuming this route exists or we create it
                }, 1000);
            }
        } catch (err: any) {
            Alert.alert("Échec de la connexion", err.message || "Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <AnimatedBackground />

            {/* Header */}
            <View className="px-6 pt-12 pb-4 flex-row justify-between items-center z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"
                >
                    <ArrowLeft size={20} color="white" />
                </TouchableOpacity>
                <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                    <ShieldCheck size={12} color="#22c55e" />
                    <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secured</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-6 pb-10">
                    <Animated.View entering={FadeInUp.duration(800)} className="mb-10 items-center">
                        <View className="relative mb-6">
                            <View className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full" />
                            <View className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center border border-white/20 shadow-xl">
                                <Text className="text-4xl text-white font-bold">E</Text>
                            </View>
                        </View>
                        <Text className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                            {userType === 'merchant' ? 'Espace Pro' : 'Espace Client'}
                        </Text>
                        <Text className="text-gray-400 text-sm text-center max-w-[260px]">
                            Connectez-vous à l'OS marketing le plus avancé du marché.
                        </Text>
                    </Animated.View>

                    {/* Glass Card Container */}
                    <Animated.View entering={FadeInUp.delay(200).duration(800)}>
                        <GlassPanel className="rounded-[1.25rem] p-6 border-white/10">

                            {/* Role Switcher */}
                            <View className="flex-row p-1 bg-white/5 rounded-xl mb-6">
                                <TouchableOpacity
                                    onPress={() => setUserType('merchant')}
                                    className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-lg transition-all ${userType === 'merchant' ? 'bg-[#1A1F2E] border border-white/10' : ''}`}
                                >
                                    <Store size={16} color={userType === 'merchant' ? '#3b82f6' : '#6b7280'} />
                                    <Text className={`text-sm font-bold ${userType === 'merchant' ? 'text-blue-500' : 'text-gray-500'}`}>Marchand</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setUserType('client')}
                                    className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-lg transition-all ${userType === 'client' ? 'bg-[#1A1F2E] border border-white/10' : ''}`}
                                >
                                    <User size={16} color={userType === 'client' ? '#c084fc' : '#6b7280'} />
                                    <Text className={`text-sm font-bold ${userType === 'client' ? 'text-purple-500' : 'text-gray-500'}`}>Client</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="space-y-4">
                                <View className="space-y-1.5">
                                    <Text className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wide">Email</Text>
                                    <View className="relative">
                                        <View className="absolute inset-y-0 left-0 pl-4 justify-center pointer-events-none">
                                            <Mail size={18} color="#9ca3af" />
                                        </View>
                                        <TextInput
                                            placeholder={userType === 'merchant' ? "boutique@example.com" : "client@example.com"}
                                            placeholderTextColor="#6b7280"
                                            className="w-full pl-11 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white focus:border-blue-500/50"
                                            value={email}
                                            onChangeText={setEmail}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View className="space-y-1.5">
                                    <View className="flex-row justify-between items-center ml-1">
                                        <Text className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mot de passe</Text>
                                        <Text className="text-[10px] font-bold text-blue-500">Oublié ?</Text>
                                    </View>
                                    <View className="relative">
                                        <View className="absolute inset-y-0 left-0 pl-4 justify-center pointer-events-none">
                                            <Lock size={18} color="#9ca3af" />
                                        </View>
                                        <TextInput
                                            secureTextEntry={!showPassword}
                                            placeholder="••••••••"
                                            placeholderTextColor="#6b7280"
                                            className="w-full pl-11 pr-12 py-4 bg-black/40 border border-white/10 rounded-xl text-white focus:border-blue-500/50"
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 justify-center"
                                        >
                                            {showPassword ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={handleLogin}
                                    disabled={isLoading}
                                    className={`w-full py-4 rounded-xl shadow-lg flex-row items-center justify-center gap-2 mt-6 overflow-hidden ${userType === 'merchant'
                                            ? 'bg-blue-600'
                                            : 'bg-emerald-600'
                                        }`}
                                >
                                    {isLoading ? <ActivityIndicator color="white" /> : (
                                        <>
                                            <Text className="text-white font-bold text-base">Se connecter</Text>
                                            <Sparkles size={16} color="white" style={{ opacity: 0.7 }} />
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </GlassPanel>
                    </Animated.View>

                    <View className="mt-8 items-center">
                        <Text className="text-gray-400 text-xs font-medium">
                            Pas encore de compte ? <Text className={`font-bold ${userType === 'merchant' ? 'text-blue-500' : 'text-emerald-500'}`}>Créer un compte</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
