import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react-native';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { GlassPanel } from '../components/ui/GlassPanel';
import { EkoBot } from '../components/EkoBot';
import Animated, { FadeInUp, FadeIn, FadeInDown } from 'react-native-reanimated';

export default function LandingScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <AnimatedBackground />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-14 pb-10">

                {/* Header */}
                <Animated.View entering={FadeIn.duration(800)} className="flex-row justify-between items-center mb-12">
                    <View className="flex-row items-center gap-2.5">
                        <View className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 items-center justify-center">
                            <Text className="text-white font-bold text-base">E</Text>
                        </View>
                        <Text className="text-white font-bold text-lg tracking-tight">Ekonom-IA</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push('/login')}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10"
                    >
                        <Text className="text-gray-300 font-bold text-xs uppercase tracking-widest">Connexion</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Main Content */}
                <View className="flex-1 justify-center items-center mb-10">

                    {/* Eko Bot Hero */}
                    <Animated.View entering={FadeInUp.delay(200).duration(1000)} className="items-center mb-10 relative">
                        {/* Glow behind bot */}
                        <View className="absolute w-48 h-48 bg-purple-500/15 rounded-full blur-3xl" />
                        <View className="absolute w-32 h-32 bg-blue-500/15 rounded-full blur-2xl mt-4" />

                        <GlassPanel
                            intensity={30}
                            className="w-44 h-44 rounded-full items-center justify-center border border-white/15"
                        >
                            <EkoBot scale={1.4} />
                        </GlassPanel>

                        {/* Floating label */}
                        <Animated.View
                            entering={FadeInDown.delay(600)}
                            className="mt-4"
                        >
                            <GlassPanel className="px-4 py-2 rounded-full flex-row items-center gap-2">
                                <Zap size={12} color="#facc15" fill="#facc15" />
                                <Text className="text-white text-xs font-bold">Eko IA v2.0</Text>
                            </GlassPanel>
                        </Animated.View>
                    </Animated.View>

                    {/* Text Content */}
                    <Animated.View entering={FadeInUp.delay(400).duration(800)} className="items-center">
                        <Text className="text-5xl font-extrabold text-white text-center leading-[1.1] mb-6">
                            Le Marketing{'\n'}
                            <Text style={{ color: '#c084fc' }}>Autonome.</Text>
                        </Text>
                        <Text className="text-gray-400 text-center text-base max-w-[300px] leading-relaxed">
                            Laissez Eko piloter vos campagnes, fidéliser vos clients et booster votre chiffre d'affaires.
                        </Text>
                    </Animated.View>

                </View>

                {/* Footer Actions */}
                <Animated.View entering={FadeInUp.delay(600).duration(800)} className="gap-5 w-full">

                    {/* CTA Button */}
                    <TouchableOpacity
                        className="w-full py-5 rounded-2xl flex-row items-center justify-center gap-3 overflow-hidden"
                        style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                        onPress={() => router.push('/login')}
                        activeOpacity={0.8}
                    >
                        <Text className="text-black font-bold text-lg">Commencer</Text>
                        <ArrowRight size={20} color="black" />
                    </TouchableOpacity>

                    {/* Trust indicators */}
                    <View className="flex-row justify-center gap-5">
                        <GlassPanel className="flex-row items-center gap-2 px-3 py-2 rounded-full">
                            <TrendingUp size={13} color="#4ade80" />
                            <Text className="text-gray-300 text-xs font-semibold">+30% Revenus</Text>
                        </GlassPanel>
                        <GlassPanel className="flex-row items-center gap-2 px-3 py-2 rounded-full">
                            <Zap size={13} color="#facc15" />
                            <Text className="text-gray-300 text-xs font-semibold">Setup 2min</Text>
                        </GlassPanel>
                        <GlassPanel className="flex-row items-center gap-2 px-3 py-2 rounded-full">
                            <Shield size={13} color="#60a5fa" />
                            <Text className="text-gray-300 text-xs font-semibold">Sécurisé</Text>
                        </GlassPanel>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
