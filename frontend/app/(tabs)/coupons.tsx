import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { GlassPanel } from '../../components/ui/GlassPanel';

export default function CouponsScreen() {
    return (
        <View className="flex-1 bg-[#050505] justify-center items-center p-6">
            <AnimatedBackground />
            <GlassPanel className="w-full max-w-sm items-center p-8 rounded-3xl">
                <Text className="text-white text-2xl font-bold mb-2">Coupons</Text>
                <Text className="text-gray-400 text-center">
                    Liste des coupons actifs et historique des scans.
                </Text>
            </GlassPanel>
        </View>
    );
}
