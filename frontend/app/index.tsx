import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Sparkles, ArrowRight, Zap, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { GlassPanel } from '../components/ui/GlassPanel';
import Animated, { FadeInUp, FadeIn, useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export default function LandingScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <AnimatedBackground />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-12 pb-10">

                {/* Header */}
                <Animated.View entering={FadeIn.duration(800)} className="flex-row justify-between items-center mb-16">
                    <View className="flex-row items-center gap-2">
                        <View className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-lg shadow-purple-500/20">
                            <Text className="text-white font-bold">E</Text>
                        </View>
                        <Text className="text-white font-bold text-lg tracking-tight">Ekonom-IA</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest">Connexion</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Main Content */}
                <View className="flex-1 justify-center items-center mb-12">

                    {/* Holographic Card Visual */}
                    <Animated.View entering={FadeInUp.delay(200).duration(1000)} className="w-64 h-64 items-center justify-center mb-12 relative">
                        <View className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl opacity-50" />
                        <GlassPanel
                            intensity={40}
                            className="w-40 h-40 rounded-full items-center justify-center border border-white/20"
                        >
                            <LinearGradient
                                colors={['rgba(59, 130, 246, 0.2)', 'rgba(168, 85, 247, 0.2)']}
                                style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 999 }}
                            />
                            <Sparkles size={50} color="white" />
                        </GlassPanel>

                        {/* Orbiting Label */}
                        <Animated.View
                            entering={FadeInUp.delay(500)}
                            className="absolute -top-4 bg-white/10 border border-white/10 px-4 py-2 rounded-xl flex-row items-center gap-2 backdrop-blur-md"
                        >
                            <Zap size={14} color="#facc15" fill="#facc15" />
                            <Text className="text-white text-xs font-bold">Eko IA v2.0</Text>
                        </Animated.View>
                    </Animated.View>

                    {/* Text Content */}
                    <Animated.View entering={FadeInUp.delay(400).duration(800)} className="items-center">
                        <Text className="text-5xl font-extrabold text-white text-center leading-[1.1] mb-6">
                            Le Marketing{'\n'}
                            <Text className="text-transparent" style={{ color: '#c084fc' }}>Autonome.</Text>
                        </Text>
                        <Text className="text-gray-400 text-center text-lg max-w-[300px] leading-relaxed">
                            Laissez Eko piloter vos campagnes, fidéliser vos clients et booster votre chiffre d'affaires.
                        </Text>
                    </Animated.View>

                </View>

                {/* Footer Actions */}
                <Animated.View entering={FadeInUp.delay(600).duration(800)} className="gap-6 w-full">
                    <TouchableOpacity
                        className="w-full bg-white py-5 rounded-2xl flex-row items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 transition-transform"
                        onPress={() => router.push('/login')}
                    >
                        <Text className="text-black font-bold text-lg">Commencer</Text>
                        <ArrowRight size={20} color="black" />
                    </TouchableOpacity>

                    <View className="flex-row justify-center gap-6">
                        <View className="flex-row items-center gap-1.5">
                            <TrendingUp size={14} color="#6b7280" />
                            <Text className="text-gray-500 text-xs font-medium">+30% Revenus</Text>
                        </View>
                        <View className="flex-row items-center gap-1.5">
                            <Zap size={14} color="#6b7280" />
                            <Text className="text-gray-500 text-xs font-medium">Setup 2min</Text>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
