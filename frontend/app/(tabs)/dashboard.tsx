import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Users, Ticket, ArrowUpRight, Sparkles, Plus, Activity, Bell } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedBackground } from "../../components/ui/AnimatedBackground";
import { GlassPanel } from "../../components/ui/GlassPanel";
import { api } from "../../services/api";
import { EkoBot } from "../../components/EkoBot";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function DashboardScreen() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const data = await api.dashboard.stats();
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const currentHour = new Date().getHours();
    let greeting = "Bonjour";
    if (currentHour >= 18) greeting = "Bonsoir";

    return (
        <View className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <AnimatedBackground />

            <ScrollView
                className="flex-1 px-5 pt-12"
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
            >
                {/* Top Bar */}
                <View className="flex-row justify-between items-center mb-8">
                    <TouchableOpacity onPress={() => router.push("/settings")} className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-full border border-white/10 overflow-hidden">
                            <Image
                                source={{ uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" }}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        <View>
                            <Text className="text-xl font-bold text-white tracking-tight">{greeting}, Alex</Text>
                            <Text className="text-xs text-gray-400">Boutique St-Honoré • <Text className="text-green-500 font-bold">Ouvert</Text></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-white/10 border border-white/10 items-center justify-center relative">
                        <Bell size={20} color="#d1d5db" />
                        <View className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </TouchableOpacity>
                </View>

                {/* Bento Grid Layout */}
                <View className="flex-row flex-wrap gap-4 mb-6">

                    {/* Main Stat Card - Full Width */}
                    <Animated.View entering={FadeInDown.delay(100)} style={{ width: '100%' }}>
                        <GlassPanel className="rounded-[2rem] p-6 relative overflow-hidden h-48 justify-between">
                            <View className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

                            <View className="flex-row justify-between items-start z-10">
                                <View>
                                    <Text className="text-sm text-gray-400 font-medium mb-1">Chiffre d'affaires (Est.)</Text>
                                    <Text className="text-4xl font-bold text-white tracking-tight">12,450€</Text>
                                    <View className="flex-row items-center gap-2 mt-2">
                                        <View className="px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 flex-row items-center">
                                            <ArrowUpRight size={12} color="#4ade80" />
                                            <Text className="text-green-400 text-xs font-bold ml-1">+14%</Text>
                                        </View>
                                        <Text className="text-xs text-gray-500">vs mois dernier</Text>
                                    </View>
                                </View>
                                <View className="w-12 h-12 rounded-2xl bg-purple-500/20 items-center justify-center border border-purple-500/20">
                                    <Activity size={24} color="#a855f7" />
                                </View>
                            </View>

                            {/* Micro Chart Visualization (CSS Bars) */}
                            <View className="flex-row items-end gap-1 h-12 opacity-50 z-10">
                                {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                                    <View key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/50 rounded-t-sm" />
                                ))}
                            </View>
                        </GlassPanel>
                    </Animated.View>

                    {/* Action Card 1: New Promo - Half Width */}
                    <Animated.View entering={FadeInDown.delay(200)} style={{ width: '47%' }}>
                        <TouchableOpacity onPress={() => router.push("/promotions/create")}>
                            <GlassPanel className="rounded-[2rem] p-5 h-40 justify-between group active:bg-blue-500/10">
                                <View className="w-10 h-10 rounded-full bg-blue-500/20 items-center justify-center border border-blue-500/20 text-blue-400">
                                    <Plus size={20} color="#60a5fa" />
                                </View>
                                <View>
                                    <Text className="font-bold text-lg text-white leading-tight mb-1">Créer{'\n'}Offre</Text>
                                    <Text className="text-xs text-gray-500">QR Code & Promo</Text>
                                </View>
                            </GlassPanel>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Action Card 2: Eko Insight - Half Width */}
                    <Animated.View entering={FadeInDown.delay(300)} style={{ width: '47%' }}>
                        <TouchableOpacity onPress={() => router.push("/assistant")}>
                            <GlassPanel className="rounded-[2rem] p-5 h-40 justify-between active:bg-purple-500/10">
                                <View className="w-10 h-10 rounded-full bg-purple-500/20 items-center justify-center border border-purple-500/20">
                                    <Sparkles size={20} color="#c084fc" />
                                </View>
                                <View>
                                    <Text className="font-bold text-lg text-white leading-tight mb-1">Demander{'\n'}à Eko</Text>
                                    <Text className="text-xs text-gray-500">Assistant IA</Text>
                                </View>
                            </GlassPanel>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Stat Card: Subscribers */}
                    <Animated.View entering={FadeInDown.delay(400)} style={{ width: '47%' }}>
                        <GlassPanel className="rounded-[2rem] p-5 h-32 justify-between">
                            <View className="flex-row justify-between items-start">
                                <Users size={20} color="#9ca3af" />
                                <Text className="text-xs text-green-500 font-bold">+{stats?.newSubscribers || 12}</Text>
                            </View>
                            <View>
                                <Text className="text-2xl font-bold text-white">{stats?.totalSubscribers || '...'}</Text>
                                <Text className="text-xs text-gray-500">Abonnés actifs</Text>
                            </View>
                        </GlassPanel>
                    </Animated.View>

                    {/* Stat Card: Coupons */}
                    <Animated.View entering={FadeInDown.delay(500)} style={{ width: '47%' }}>
                        <GlassPanel className="rounded-[2rem] p-5 h-32 justify-between">
                            <View className="flex-row justify-between items-start">
                                <Ticket size={20} color="#9ca3af" />
                                <Text className="text-xs text-orange-500 font-bold">Exp. 2j</Text>
                            </View>
                            <View>
                                <Text className="text-2xl font-bold text-white">{stats?.activeCoupons || '...'}</Text>
                                <Text className="text-xs text-gray-500">Coupons scannés</Text>
                            </View>
                        </GlassPanel>
                    </Animated.View>

                </View>

                {/* Eko Insight Bar */}
                <Animated.View entering={FadeInDown.delay(600)}>
                    <GlassPanel className="rounded-2xl p-2 pr-4 flex-row items-center gap-3 border-l-4 border-l-purple-500">
                        <View className="w-10 h-10 rounded-xl bg-purple-500/20 items-center justify-center shrink-0">
                            {/* Small version of EkoBot or just icon */}
                            <EkoBot scale={0.5} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Insight Eko</Text>
                            <Text className="text-xs text-gray-300" numberOfLines={1}>Vos ventes de café baissent le mardi. Lancez une offre flash ?</Text>
                        </View>
                        <TouchableOpacity className="p-2">
                            <ArrowUpRight size={16} color="#9ca3af" />
                        </TouchableOpacity>
                    </GlassPanel>
                </Animated.View>

            </ScrollView>
        </View>
    );
}
