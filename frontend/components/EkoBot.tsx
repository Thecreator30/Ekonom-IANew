import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const EkoBot = ({ scale = 1 }: { scale?: number }) => {
    // Animation values
    const floatY = useSharedValue(0);
    const blinkScale = useSharedValue(1);
    const antennaRotate = useSharedValue(0);

    // Floating Loop
    useEffect(() => {
        floatY.value = withRepeat(
            withSequence(
                withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        // Antenna subtle movement
        antennaRotate.value = withRepeat(
            withSequence(
                withTiming(5, { duration: 1500 }),
                withTiming(-5, { duration: 1500 })
            ),
            -1,
            true
        );
    }, []);

    // Blinking Logic
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            blinkScale.value = withSequence(
                withTiming(0.1, { duration: 100 }),
                withTiming(1, { duration: 100 })
            );
        }, 4000);

        return () => clearInterval(blinkInterval);
    }, []);

    // Animated Styles
    const floatStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: floatY.value }]
    }));

    const eyeStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: blinkScale.value }]
    }));

    const antennaStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${antennaRotate.value}deg` }]
    }));

    return (
        <View style={{ transform: [{ scale }] }}>
            <Animated.View style={[styles.container, floatStyle]}>

                {/* ANTENNA */}
                <Animated.View style={[styles.antennaContainer, antennaStyle]}>
                    <View className="w-0.5 h-4 bg-slate-400 rounded-full" />
                    <View className="absolute -top-1.5 -left-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50" />
                </Animated.View>

                {/* HEAD */}
                <LinearGradient
                    colors={['#f3f4f6', '#d1d5db']}
                    style={styles.head}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {/* FACE SCREEN */}
                    <View style={styles.face}>
                        {/* Reflection */}
                        <View className="absolute top-1 right-2 w-4 h-1.5 bg-white/10 rounded-full rotate-[-10deg]" />

                        {/* EYES */}
                        <Animated.View style={[styles.eyesContainer, eyeStyle]}>
                            {/* Left Eye (Purple) */}
                            <View className="w-3 h-4 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)] relative">
                                <View className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                            </View>

                            {/* Right Eye (Cyan) */}
                            <View className="w-3 h-4 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] relative">
                                <View className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                            </View>
                        </Animated.View>
                    </View>
                </LinearGradient>

                {/* BODY (Small neck/body piece) */}
                <LinearGradient
                    colors={['#e5e7eb', '#9ca3af']}
                    style={styles.body}
                >
                    <View className="w-4 h-4 bg-black/10 rounded-full items-center justify-center">
                        <LinearGradient
                            colors={['#22d3ee', '#a855f7']}
                            style={{ width: 8, height: 8, borderRadius: 4 }}
                        />
                    </View>
                </LinearGradient>

                {/* ARMS (Optional simple shapes) */}
                <View className="absolute top-12 w-full flex-row justify-between px-1">
                    <View className="w-1.5 h-5 bg-slate-300 rounded-full -rotate-12" />
                    <View className="w-1.5 h-5 bg-slate-300 rounded-full rotate-12" />
                </View>

            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 60,
        height: 80,
    },
    antennaContainer: {
        alignItems: 'center',
        marginBottom: -2,
        zIndex: 10,
    },
    head: {
        width: 50,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        zIndex: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    face: {
        width: '85%',
        height: '80%',
        backgroundColor: '#0f172a',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    eyesContainer: {
        flexDirection: 'row',
        gap: 6,
    },
    body: {
        marginTop: -4,
        width: 30,
        height: 24,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }
});
