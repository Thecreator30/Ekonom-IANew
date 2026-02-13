import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Ticket, Users, Megaphone, Sparkles, QrCode, ScanLine } from 'lucide-react-native';
import { GlassPanel } from './GlassPanel';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function GlassDock({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View className="absolute bottom-6 left-4 right-4 items-center">
            <GlassPanel className="flex-row rounded-3xl p-2 items-center justify-between w-full max-w-md mx-auto shadow-2xl border-white/20 bg-black/40">
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    // Render Special Eko Button for the middle item (or specific route)
                    // Adjusting logic: logic based on route name or position.
                    // In the user's design, Eko was central. Here strictly mapping tabs.
                    // Let's make "assistant" or specific tab the central one if possible.
                    // For now, I'll map standard icons.

                    let Icon = Home;
                    if (route.name === 'dashboard') Icon = Home;
                    if (route.name === 'coupons') Icon = Ticket;
                    if (route.name === 'subscribers') Icon = Users;
                    if (route.name === 'promotions') Icon = Megaphone;
                    if (route.name === 'scan') Icon = ScanLine;
                    if (route.name === 'qr') Icon = QrCode;
                    if (route.name === 'assistant') Icon = Sparkles;

                    // Special styling for Assistant/Eko if it exists, or just standard tabs
                    const isEko = route.name === 'assistant';

                    if (isEko) {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={onPress}
                                className="-mt-12"
                                activeOpacity={0.8}
                            >
                                <View className="w-16 h-16 rounded-2xl items-center justify-center border border-white/20 bg-[#050505] shadow-lg shadow-purple-500/20 overflow-hidden">
                                    <LinearGradient
                                        colors={['rgba(59, 130, 246, 0.2)', 'rgba(168, 85, 247, 0.2)']}
                                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                                    />
                                    <Sparkles size={28} color="white" fill={isFocused ? "rgba(255,255,255,0.2)" : "transparent"} />
                                </View>
                                <Text className="text-[10px] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-1 absolute -bottom-4 w-full">EKO</Text>
                            </TouchableOpacity>
                        );
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            className="w-14 h-12 items-center justify-center"
                            activeOpacity={0.7}
                        >
                            <View className={`absolute inset-0 rounded-xl bg-white/10 transition-all ${isFocused ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
                            <Icon
                                size={22}
                                color={isFocused ? "white" : "#94a3b8"}
                                strokeWidth={isFocused ? 2.5 : 2}
                            />
                            {isFocused && (
                                <View className="absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </GlassPanel>
        </View>
    );
}
