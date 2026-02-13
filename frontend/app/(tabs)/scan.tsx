import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    Platform,
    Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { ScanLine, CheckCircle, XCircle, Camera } from "lucide-react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    FadeIn,
    FadeOut,
    FadeInDown,
} from "react-native-reanimated";
import { AnimatedBackground } from "../../components/ui/AnimatedBackground";
import { GlassPanel } from "../../components/ui/GlassPanel";
import { api } from "../../services/api";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const FRAME_SIZE = 260;

type ScanResult = {
    type: "success" | "error";
    title: string;
    message: string;
};

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);

    // Animated scan line
    const scanLineY = useSharedValue(0);

    useEffect(() => {
        scanLineY.value = withRepeat(
            withSequence(
                withTiming(FRAME_SIZE - 4, {
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                }),
                withTiming(0, {
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                })
            ),
            -1,
            false
        );
    }, []);

    const scanLineStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scanLineY.value }],
    }));

    // Auto-dismiss result overlay after 3 seconds
    useEffect(() => {
        if (scanResult) {
            const timer = setTimeout(() => {
                setScanResult(null);
                setScanned(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [scanResult]);

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        if (scanned || processing) return;

        setScanned(true);
        setProcessing(true);

        // Haptic feedback
        if (Platform.OS !== "web") {
            try {
                await Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                );
            } catch {
                // Fallback to Vibration API
                Vibration.vibrate(200);
            }
        }

        try {
            const result = await api.coupons.redeem(data);
            setScanResult({
                type: "success",
                title: "Coupon valid\u00e9 !",
                message: result?.discount
                    ? `R\u00e9duction de ${result.discount}${result.discountType === "percentage" ? "%" : "\u20ac"} appliqu\u00e9e`
                    : result?.message || "Le coupon a \u00e9t\u00e9 valid\u00e9 avec succ\u00e8s.",
            });
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Ce coupon est invalide ou a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9.";

            setScanResult({
                type: "error",
                title: "Erreur",
                message: errorMessage,
            });
        } finally {
            setProcessing(false);
        }
    };

    // ----------------------------------------------------------------
    // Permission: still loading
    // ----------------------------------------------------------------
    if (!permission) {
        return (
            <View className="flex-1 bg-[#050505] justify-center items-center">
                <AnimatedBackground />
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    // ----------------------------------------------------------------
    // Permission: not granted
    // ----------------------------------------------------------------
    if (!permission.granted) {
        return (
            <View className="flex-1 bg-[#050505]">
                <AnimatedBackground />
                <SafeAreaView className="flex-1 justify-center items-center px-8">
                    <Animated.View entering={FadeInDown.delay(100)}>
                        <GlassPanel className="rounded-3xl p-8 items-center max-w-sm w-full">
                            {/* Camera Icon */}
                            <View className="w-20 h-20 rounded-full bg-blue-500/20 items-center justify-center mb-6 border border-blue-500/30">
                                <Camera size={40} color="#60a5fa" />
                            </View>

                            <Text className="text-white text-2xl font-bold mb-3 text-center">
                                Acc\u00e8s cam\u00e9ra requis
                            </Text>

                            <Text className="text-gray-400 text-center text-base leading-6 mb-8">
                                Pour scanner les QR codes de vos clients et valider
                                leurs coupons, Ekonom-IA a besoin d'acc\u00e9der \u00e0
                                votre cam\u00e9ra.
                            </Text>

                            {permission.canAskAgain ? (
                                <TouchableOpacity
                                    onPress={requestPermission}
                                    className="bg-blue-600 w-full py-4 rounded-2xl items-center active:bg-blue-700"
                                >
                                    <Text className="text-white font-bold text-base">
                                        Autoriser la cam\u00e9ra
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View className="w-full">
                                    <Text className="text-red-400 text-center text-sm mb-4">
                                        L'acc\u00e8s a \u00e9t\u00e9 refus\u00e9. Veuillez
                                        activer la cam\u00e9ra dans les r\u00e9glages de
                                        votre appareil.
                                    </Text>
                                    <TouchableOpacity
                                        onPress={requestPermission}
                                        className="bg-white/10 border border-white/20 w-full py-4 rounded-2xl items-center"
                                    >
                                        <Text className="text-white font-bold text-base">
                                            R\u00e9essayer
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </GlassPanel>
                    </Animated.View>
                </SafeAreaView>
            </View>
        );
    }

    // ----------------------------------------------------------------
    // Permission granted: camera + scanning UI
    // ----------------------------------------------------------------
    return (
        <View style={styles.container}>
            {/* Full-screen Camera */}
            <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

            {/* Semi-transparent overlay with hole for QR frame */}
            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                {/* Top overlay */}
                <View
                    style={[
                        styles.overlaySection,
                        {
                            height:
                                (SCREEN_HEIGHT - FRAME_SIZE) / 2 - 40,
                        },
                    ]}
                />

                {/* Middle row: left overlay + frame hole + right overlay */}
                <View style={styles.middleRow}>
                    <View
                        style={[
                            styles.overlaySection,
                            { width: (SCREEN_WIDTH - FRAME_SIZE) / 2 },
                        ]}
                    />

                    {/* QR Frame - transparent center */}
                    <View style={styles.frameContainer}>
                        {/* Corner Borders */}
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />

                        {/* Animated Scan Line */}
                        {!scanned && (
                            <Animated.View style={[styles.scanLine, scanLineStyle]} />
                        )}
                    </View>

                    <View
                        style={[
                            styles.overlaySection,
                            { width: (SCREEN_WIDTH - FRAME_SIZE) / 2 },
                        ]}
                    />
                </View>

                {/* Bottom overlay */}
                <View style={[styles.overlaySection, { flex: 1 }]} />
            </View>

            {/* Header text */}
            <SafeAreaView
                style={styles.headerContainer}
                pointerEvents="box-none"
            >
                <View className="items-center mt-8" pointerEvents="none">
                    <View className="bg-black/60 px-6 py-3 rounded-full border border-white/10">
                        <Text className="text-white text-lg font-bold">
                            Scanner un coupon
                        </Text>
                    </View>
                    <Text className="text-white/60 text-sm mt-3">
                        Placez le QR code dans le cadre
                    </Text>
                </View>
            </SafeAreaView>

            {/* Processing indicator */}
            {processing && (
                <View style={styles.processingOverlay}>
                    <GlassPanel className="rounded-3xl p-8 items-center">
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <Text className="text-white font-semibold text-base mt-4">
                            V\u00e9rification en cours...
                        </Text>
                    </GlassPanel>
                </View>
            )}

            {/* Success / Error Result Overlay */}
            {scanResult && (
                <Animated.View
                    entering={FadeIn.duration(300)}
                    exiting={FadeOut.duration(300)}
                    style={styles.resultOverlay}
                >
                    <GlassPanel
                        className={`rounded-3xl p-8 items-center max-w-xs w-full border ${
                            scanResult.type === "success"
                                ? "border-green-500/30"
                                : "border-red-500/30"
                        }`}
                    >
                        {/* Icon */}
                        <View
                            className={`w-20 h-20 rounded-full items-center justify-center mb-5 ${
                                scanResult.type === "success"
                                    ? "bg-green-500/20"
                                    : "bg-red-500/20"
                            }`}
                        >
                            {scanResult.type === "success" ? (
                                <CheckCircle size={48} color="#22c55e" />
                            ) : (
                                <XCircle size={48} color="#ef4444" />
                            )}
                        </View>

                        {/* Title */}
                        <Text
                            className={`text-2xl font-bold mb-2 ${
                                scanResult.type === "success"
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            {scanResult.title}
                        </Text>

                        {/* Message */}
                        <Text className="text-gray-300 text-center text-base leading-6">
                            {scanResult.message}
                        </Text>

                        {/* Dismiss hint */}
                        <Text className="text-gray-500 text-xs mt-5">
                            Fermeture automatique...
                        </Text>
                    </GlassPanel>
                </Animated.View>
            )}

            {/* Bottom action: tap to scan again if needed */}
            {scanned && !processing && !scanResult && (
                <View style={styles.bottomAction}>
                    <TouchableOpacity
                        onPress={() => setScanned(false)}
                        className="bg-blue-600 px-8 py-4 rounded-full"
                    >
                        <Text className="text-white font-bold text-base">
                            Scanner \u00e0 nouveau
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    overlaySection: {
        backgroundColor: "rgba(0, 0, 0, 0.65)",
    },
    middleRow: {
        flexDirection: "row",
        height: FRAME_SIZE,
    },
    frameContainer: {
        width: FRAME_SIZE,
        height: FRAME_SIZE,
        position: "relative",
    },
    corner: {
        position: "absolute",
        width: 32,
        height: 32,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: "#3b82f6",
        borderTopLeftRadius: 16,
    },
    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: "#3b82f6",
        borderTopRightRadius: 16,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: "#3b82f6",
        borderBottomLeftRadius: 16,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: "#3b82f6",
        borderBottomRightRadius: 16,
    },
    scanLine: {
        position: "absolute",
        left: 8,
        right: 8,
        height: 2,
        backgroundColor: "#3b82f6",
        shadowColor: "#3b82f6",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
    },
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    processingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },
    resultOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },
    bottomAction: {
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        alignItems: "center",
    },
});
