import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QrCode, Share2, ShieldCheck, RefreshCw } from "lucide-react-native";
import QRCode from "react-native-qrcode-svg";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { LinearGradient } from "expo-linear-gradient";

export default function QRScreen() {
    const [qrData, setQrData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadQR = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.welcomeOffer.get();
            setQrData(data.qr_data);
        } catch (err) {
            setError("Failed to load QR Code");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQR();
    }, []);

    const handleShare = async () => {
        if (!qrData) return;
        try {
            await Share.share({
                message: `Join our loyalty program! ${qrData}`,
            });
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <View className="flex-1 bg-background">
            <View className="absolute top-0 left-0 right-0 h-[400px]">
                <LinearGradient
                    colors={['#7c3aed', '#c026d3']}
                    style={{ flex: 1 }}
                />
            </View>

            <SafeAreaView className="flex-1 px-6">
                <View className="items-center mt-8 mb-8">
                    <Text className="text-white font-bold text-2xl mb-2 text-center">Welcome Offer</Text>
                    <Text className="text-white/80 text-center font-medium">
                        Show this QR code to new customers to add them to your loyalty program.
                    </Text>
                </View>

                {/* QR Card */}
                <View className="bg-white rounded-3xl p-8 items-center shadow-2xl shadow-black/50 mx-4">
                    {loading ? (
                        <View className="h-64 justify-center">
                            <ActivityIndicator size="large" color="#7c3aed" />
                        </View>
                    ) : error ? (
                        <View className="h-64 justify-center items-center">
                            <Text className="text-red-500 font-medium mb-4">{error}</Text>
                            <TouchableOpacity
                                onPress={loadQR}
                                className="bg-slate-100 px-4 py-2 rounded-full flex-row items-center"
                            >
                                <RefreshCw size={16} color="#475569" className="mr-2" />
                                <Text className="text-slate-600 font-semibold">Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="items-center">
                            <View className="p-4 bg-white border-2 border-slate-100 rounded-2xl mb-6">
                                <QRCode
                                    value={qrData || "error"}
                                    size={200}
                                    logoBackgroundColor='white'
                                />
                            </View>
                            <View className="flex-row items-center bg-green-50 px-3 py-1.5 rounded-full mb-2">
                                <ShieldCheck size={14} color="#16a34a" className="mr-1.5" />
                                <Text className="text-green-700 font-bold text-xs uppercase tracking-wide">
                                    Securely Signed
                                </Text>
                            </View>
                            <Text className="text-slate-400 text-xs text-center px-4">
                                This code is cryptographically signed and changes periodically to prevent fraud.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Actions */}
                <View className="mt-8 flex-row justify-center gap-4">
                    <TouchableOpacity
                        onPress={loadQR}
                        className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl flex-row items-center border border-white/20"
                    >
                        <RefreshCw size={20} color="white" className="mr-2" />
                        <Text className="text-white font-bold">Refresh</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleShare}
                        className="bg-white px-6 py-4 rounded-xl flex-row items-center shadow-lg"
                    >
                        <Share2 size={20} color="#7c3aed" className="mr-2" />
                        <Text className="text-primary font-bold">Share Link</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}
