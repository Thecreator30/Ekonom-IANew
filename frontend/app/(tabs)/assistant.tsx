import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { EkoBot } from '../../components/EkoBot';

export default function AssistantScreen() {
    return (
        <View className="flex-1 bg-[#050505] justify-center items-center p-6">
            <AnimatedBackground />
            <GlassPanel className="w-full max-w-sm items-center p-8 rounded-3xl">
                <View className="mb-8 scale-150">
                    <EkoBot />
                </View>
                <Text className="text-white text-2xl font-bold mb-2">Je suis Eko.</Text>
                <Text className="text-gray-400 text-center">
                    Je peux analyser vos données, créer des promotions et gérer votre fidélité.
                </Text>
            </GlassPanel>
        </View>
    );
}
