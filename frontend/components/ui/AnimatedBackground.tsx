import React, { useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Blob = ({ color, delay = 0, size = 300, initialPos }: any) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        // Random movement logic
        const duration = 8000 + Math.random() * 4000;

        translateX.value = withRepeat(
            withSequence(
                withTiming(Math.random() * 50 - 25, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
                withTiming(Math.random() * 50 - 25, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        translateY.value = withRepeat(
            withSequence(
                withTiming(Math.random() * 50 - 25, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
                withTiming(Math.random() * 50 - 25, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );

        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: duration, easing: Easing.inOut(Easing.ease) }),
                withTiming(0.9, { duration: duration, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
        );
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value }
        ]
    }));

    return (
        <Animated.View
            style={[
                styles.blob,
                {
                    backgroundColor: color,
                    width: size,
                    height: size,
                    left: initialPos.x,
                    top: initialPos.y
                },
                style
            ]}
        />
    );
};

export const AnimatedBackground = () => {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {/* Base Color #050505 */}
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#050505' }]} />

            {/* Gradients */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.5)']}
                style={StyleSheet.absoluteFill}
            />

            {/* Animated Blobs */}
            <View style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}>
                <Blob color="rgba(37, 99, 235, 0.2)" initialPos={{ x: -50, y: -50 }} size={width * 0.8} />
                <Blob color="rgba(147, 51, 234, 0.2)" delay={2000} initialPos={{ x: width * 0.5, y: height * 0.2 }} size={width * 0.7} />
                <Blob color="rgba(16, 185, 129, 0.15)" delay={4000} initialPos={{ x: -100, y: height * 0.6 }} size={width * 0.9} />
            </View>

            {/* Noise Overlay (Simulated with text pattern or image if available, ignoring for now or using SVG) */}
            {/* Ideally we'd use an image background with noise pattern here */}
        </View>
    );
};

const styles = StyleSheet.create({
    blob: {
        position: 'absolute',
        borderRadius: 9999,
        opacity: 0.6,
        // Add blur effect typically involves SVG or specific libraries in RN, 
        // or we just trust the opacity/gradient blend for performance.
        // On web we can use filter: blur(100px)
    }
});
