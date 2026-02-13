import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, ScanLine } from "lucide-react-native";

export default function ScanScreen() {
    return (
        <SafeAreaView className="flex-1 bg-slate-900 justify-center items-center">
            <View className="w-64 h-64 border-2 border-white/30 rounded-3xl items-center justify-center mb-8 relative">
                <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl" />
                <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl" />
                <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
                <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />

                <ScanLine size={48} color="white" className="opacity-50" />
            </View>

            <Text className="text-white text-xl font-bold mb-2">Scan Coupon QR</Text>
            <Text className="text-slate-400 text-center px-10">
                Align the customer's QR code within the frame to redeem.
            </Text>

            <TouchableOpacity className="mt-12 bg-blue-600 px-8 py-4 rounded-full">
                <Text className="text-white font-bold">Encording Camera Access...</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
