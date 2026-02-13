import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrendingUp, Users, Tag, Plus, ArrowRight, Bell, Sparkles, LogOut } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { api } from "../../services/api"; // Fixed path
import { clearTokens } from "../../services/storage"; // Fixed path

export default function DashboardScreen() {
    const router = useRouter();
    const [promotions, setPromotions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await api.promotions.list();
            setPromotions(data);
        } catch (error) {
            console.error(error);
            // Optional: Alert.alert("Erreur", "Impossible de charger les données");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await clearTokens();
        router.replace("/");
    };

    return (
        <View className="flex-1 bg-background">
            <StatusBar style="light" />

            {/* Background Gradient */}
            <View className="absolute top-0 left-0 right-0 h-[300px] opacity-20">
                <LinearGradient
                    colors={['#7c3aed', 'transparent']}
                    style={{ flex: 1 }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
            </View>

            <SafeAreaView className="flex-1">
                <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 100 }}>

                    {/* Header */}
                    <View className="flex-row justify-between items-center py-4 mb-6">
                        <View>
                            <Text className="text-slate-400 text-sm font-medium uppercase tracking-wider">Merchant Console</Text>
                            <Text className="text-white text-2xl font-bold">Bonjour 👋</Text>
                        </View>
                        <TouchableOpacity
                            className="bg-white/5 p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                            onPress={handleLogout}
                        >
                            <LogOut size={20} color="#94a3b8" />
                        </TouchableOpacity>
                    </View>

                    {/* Quick Actions / AI Banner */}
                    <View className="relative overflow-hidden rounded-3xl mb-8 group">
                        <LinearGradient
                            colors={['#7c3aed', '#c026d3']}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="opacity-90"
                        />
                        <View className="p-6">
                            <View className="flex-row items-center mb-2">
                                <Sparkles size={20} color="#fcd34d" className="mr-2" />
                                <Text className="text-yellow-300 font-bold uppercase tracking-wider text-xs">AI Copilot v2.0</Text>
                            </View>
                            <Text className="text-white font-bold text-xl mb-1">Besoin d'une nouvelle promo ?</Text>
                            <Text className="text-white/80 text-sm mb-4">Laissez l'IA analyser votre stock et générer des offres.</Text>
                            <TouchableOpacity
                                className="bg-white py-3 px-6 rounded-xl self-start flex-row items-center shadow-lg"
                                onPress={() => router.push("/promotions/oxy")}
                            >
                                <Text className="text-primary font-bold mr-2">Générer avec OXY</Text>
                                <ArrowRight size={16} color="#7c3aed" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* KPI Cards */}
                    <View className="flex-row gap-4 mb-8">
                        <View className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
                            <View className="bg-primary/20 p-2 rounded-xl self-start mb-3">
                                <Users size={20} color="#a78bfa" />
                            </View>
                            <Text className="text-3xl font-bold text-white mb-1">0</Text>
                            <Text className="text-slate-400 text-xs uppercase tracking-wide">Abonnés</Text>
                        </View>
                        <View className="flex-1 bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md">
                            <View className="bg-secondary/20 p-2 rounded-xl self-start mb-3">
                                <Tag size={20} color="#e879f9" />
                            </View>
                            <Text className="text-3xl font-bold text-white mb-1">{promotions.length}</Text>
                            <Text className="text-slate-400 text-xs uppercase tracking-wide">Promos Actives</Text>
                        </View>
                    </View>

                    {/* Recent Activity */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-end mb-4">
                            <Text className="text-white font-bold text-lg">Activités Récentes</Text>
                            <TouchableOpacity onPress={loadData}>
                                <Text className="text-accent text-sm font-semibold">Rafraîchir</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden min-h-[100px]">
                            {loading ? (
                                <View className="p-8 items-center"><Text className="text-slate-500">Chargement...</Text></View>
                            ) : promotions.length === 0 ? (
                                <View className="p-8 items-center"><Text className="text-slate-500">Aucune activité récente</Text></View>
                            ) : (
                                promotions.slice(0, 3).map((promo, i) => (
                                    <View key={i} className={`p-4 flex-row items-center border-b border-white/5 ${i === promotions.length - 1 ? 'border-b-0' : ''}`}>
                                        <View className="w-10 h-10 rounded-full bg-slate-800 items-center justify-center mr-4 border border-white/5">
                                            <Tag size={18} color="#94a3b8" />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-white font-semibold">{promo.title}</Text>
                                            <Text className="text-slate-500 text-xs">
                                                {new Date(promo.created_at).toLocaleDateString()}
                                            </Text>
                                        </View>
                                        <Text className={`font-bold text-xs px-2 py-1 rounded ${promo.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-300'}`}>
                                            {promo.status}
                                        </Text>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>

            {/* Floating Action Button */}
            <TouchableOpacity
                className="absolute bottom-6 right-6 bg-accent w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-accent/30"
                onPress={() => router.push("/promotions/create")}
            >
                <Plus size={28} color="#0f172a" strokeWidth={3} />
            </TouchableOpacity>
        </View>
    );
}
