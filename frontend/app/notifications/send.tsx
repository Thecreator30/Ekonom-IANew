import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Bell, Send, Users } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { api } from "../../services/api";

export default function SendNotificationScreen() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!title || !message) {
            Alert.alert("Missing Fields", "Please provide a title and message.");
            return;
        }

        setLoading(true);
        try {
            await api.push.send(title, message, 'ALL');
            Alert.alert("Success", "Notification scheduled successfully!", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to send notification");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1" edges={['top']}>
                <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-100 bg-white z-10">
                    <Text className="text-xl font-bold text-slate-900">New Message</Text>
                    <TouchableOpacity onPress={() => router.back()} className="bg-slate-50 p-2 rounded-full">
                        <X size={24} color="#334155" />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView className="flex-1 p-6">

                        <View className="bg-blue-50 p-4 rounded-xl mb-6 flex-row items-center border border-blue-100">
                            <Users size={20} color="#2563eb" className="mr-3" />
                            <View className="flex-1">
                                <Text className="text-blue-900 font-bold">To: All Subscribers</Text>
                                <Text className="text-blue-600 text-xs">Reach 1,240 active users</Text>
                            </View>
                        </View>

                        <View className="mb-6">
                            <Text className="font-bold text-slate-700 mb-2">Message Title</Text>
                            <TextInput
                                className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-900 font-semibold"
                                placeholder="e.g. Happy Hour Starts Now! 🍹"
                                placeholderTextColor="#94a3b8"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="font-bold text-slate-700 mb-2">Message Body</Text>
                            <TextInput
                                className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-900 h-32 text-start"
                                placeholder="Type your notification message..."
                                placeholderTextColor="#94a3b8"
                                multiline
                                textAlignVertical="top"
                                value={message}
                                onChangeText={setMessage}
                            />
                        </View>

                        <View className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <Text className="text-xs text-slate-500 mb-1 font-bold uppercase">Preview</Text>
                            <View className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex-row items-center">
                                <View className="bg-slate-900 w-10 h-10 rounded-lg mr-3 items-center justify-center">
                                    <Bell size={20} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-bold text-slate-900 text-sm">{title || "Message Title"}</Text>
                                    <Text className="text-slate-500 text-xs" numberOfLines={2}>{message || "Your message preview will appear here..."}</Text>
                                </View>
                            </View>
                        </View>

                    </ScrollView>

                    <View className="p-6 border-t border-slate-100 bg-white">
                        <TouchableOpacity
                            className={`w-full py-4 rounded-xl items-center shadow-lg flex-row justify-center ${loading ? 'bg-slate-700 opacity-80' : 'bg-blue-600 shadow-blue-200'}`}
                            onPress={handleSend}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    <Send size={20} color="white" className="mr-2" />
                                    <Text className="text-white font-bold text-lg">Send Broadcast</Text>
                                </>
                            )}
                        </TouchableOpacity>
                        <Text className="text-center text-slate-400 text-xs mt-4">
                            You have 3 free broadcasts remaining today.
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}
