import React from 'react';
import { View, ViewProps, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
interface GlassPanelProps extends ViewProps {
    intensity?: number;
    className?: string;
    children: React.ReactNode;
}

export const GlassPanel = ({
    intensity = 20,
    className,
    style,
    children,
    ...props
}: GlassPanelProps) => {

    if (Platform.OS === 'web') {
        return (
            <View
                className={`bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-xl ${className}`}
                style={style}
                {...props}
            >
                {children}
            </View>
        );
    }

    return (
        <View
            className={`overflow-hidden border border-white/20 dark:border-white/10 shadow-xl ${className}`}
            style={style}
            {...props}
        >
            <BlurView intensity={intensity} tint="default" style={StyleSheet.absoluteFill} />
            <View className="bg-white/10 dark:bg-black/10 flex-1">
                {children}
            </View>
        </View>
    );
};
