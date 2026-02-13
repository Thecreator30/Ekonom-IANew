import { View, Text, ScrollView, TouchableOpacity, Image, Alert, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TrendingUp, Users, Tag, Plus, ArrowRight, Bell, Sparkles, LogOut, Menu, User, Calendar, Gift } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { clearTokens } from "../../services/storage";
import { EkoBot } from "../../components/EkoBot";

export default function DashboardScreen() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
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

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const handleLogout = async () => {
        await clearTokens();
        router.replace("/");
    };

    return (
        <View className="flex-1 bg-slate-50 dark:bg-slate-900">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="px-5 pt-14 pb-4 bg-white dark:bg-slate-800 flex-row justify-between items-center shadow-sm z-10">
                <View className="flex-row items-center gap-3">
                    <TouchableOpacity className="p-2 -ml-2">
                        <Menu size={24} color="#64748b" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold bg-clip-text text-transparent" style={{ color: '#3b82f6' }}>
                        Ekonom-IA
                    </Text>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                    <Image
                        source={{ uri: "https://api.dicebear.com/7.x/avataaars/png?seed=Felix" }}
                        className="w-10 h-10 rounded-full border-2 border-blue-100"
                    />
                    <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="px-5 pt-6 mb-6">
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white">Bonjour, Thomas 👋</Text>
                    <Text className="text-sm text-slate-500 mt-1">Voici ce qui se passe dans votre boutique.</Text>
                </View>

                {/* KPI Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5 pb-6 -mr-5 gap-4" contentContainerStyle={{ paddingRight: 40 }}>
                    {/* Subscribers Card */}
                    <View className="min-w-[260px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                        <View className="absolute top-0 right-0 p-4 opacity-10">
                            <Users size={80} color="#3b82f6" />
                        </View>
                        <View className="flex-row justify-between mb-4">
                            <View className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl">
                                <Users size={24} color="#3b82f6" />
                            </View>
                            <View className="bg-green-50 px-2 py-1 rounded-full flex-row items-center">
                                <TrendingUp size={14} color="#16a34a" />
                                <Text className="text-xs font-bold text-green-600 ml-1">+12%</Text>
                            </View>
                        </View>
                        <Text className="text-slate-500 text-sm font-medium">Nombre Abonnés</Text>
                        <Text className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats?.totalSubscribers || 0}</Text>
                    </View>

                    {/* Active Promotions Card */}
                    <View className="min-w-[260px] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                        <View className="absolute top-0 right-0 p-4 opacity-10">
                            <Tag size={80} color="#8b5cf6" />
                        </View>
                        <View className="flex-row justify-between mb-4">
                            <View className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-xl">
                                <Tag size={24} color="#8b5cf6" />
                            </View>
                            <Text className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">En cours</Text>
                        </View>
                        <Text className="text-slate-500 text-sm font-medium">Promotions Actives</Text>
                        <Text className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stats?.activePromotions || 0}</Text>
                    </View>

                    {/* AI Usage Card */}
                    <View className="min-w-[260px] bg-indigo-600  p-5 rounded-2xl shadow-lg shadow-indigo-500/30 relative overflow-hidden">
                        <View className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl" />
                        <View className="flex-row justify-between mb-4">
                            <View className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                                <Sparkles size={24} color="white" />
                            </View>
                            <Text className="text-xs font-bold text-white bg-white/20 px-2 py-1 rounded-full">Beta</Text>
                        </View>
                        <Text className="text-indigo-100 text-sm font-medium">Contenu IA Généré</Text>
                        <Text className="text-3xl font-bold text-white mt-1">{stats?.aiUsage || 0}</Text>
                        <Text className="text-xs text-indigo-200 mt-2 flex-row items-center">
                            <Calendar size={12} color="#c7d2fe" /> Cette semaine
                        </Text>
                    </View>
                </ScrollView>

                {/* Quick Actions */}
                <View className="px-5 mb-8 flex-row gap-3">
                    <TouchableOpacity
                        className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-dashed border-slate-300 items-center active:bg-blue-50"
                        onPress={() => router.push("/promotions/create")}
                    >
                        <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-2">
                            <Plus size={24} color="#3b82f6" />
                        </View>
                        <Text className="text-xs font-bold text-slate-700">Nouvelle Promo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-dashed border-slate-300 items-center active:bg-purple-50"
                        onPress={() => router.push("/promotions/oxy")}
                    >
                        <View className="w-12 h-12 rounded-full bg-purple-100 items-center justify-center mb-2">
                            <Sparkles size={24} color="#8b5cf6" />
                        </View>
                        <Text className="text-xs font-bold text-slate-700">Générer avec IA</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <View className="px-5 mb-8">
                    <View className="flex-row justify-between items-end mb-4">
                        <Text className="text-lg font-bold text-slate-900">Activités Récentes</Text>
                        <TouchableOpacity onPress={loadData}>
                            <Text className="text-blue-600 font-semibold text-sm">Rafraîchir</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        {loading ? (
                            <View className="p-8 items-center"><Text className="text-slate-500">Chargement...</Text></View>
                        ) : !stats?.recentActivity?.length ? (
                            <View className="p-8 items-center"><Text className="text-slate-500">Aucune activité récente</Text></View>
                        ) : (
                            stats.recentActivity.map((log: any, i: number) => (
                                <View key={i} className={`p-4 flex-row items-start border-b border-slate-50 ${i === stats.recentActivity.length - 1 ? 'border-b-0' : ''}`}>
                                    <View className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0 ${log.action.includes('USER') ? 'bg-green-100' :
                                        log.action.includes('COUPON') ? 'bg-orange-100' : 'bg-purple-100'
                                        }`}>
                                        {log.action.includes('USER') ? <User size={20} color="#16a34a" /> :
                                            log.action.includes('COUPON') ? <Gift size={20} color="#ea580c" /> :
                                                <Bell size={20} color="#8b5cf6" />}
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-sm font-bold text-slate-900">{log.action}</Text>
                                        <Text className="text-xs text-slate-500 mt-1" numberOfLines={1}>
                                            {JSON.stringify(log.metadata)}
                                        </Text>
                                        <Text className="text-[10px] text-slate-400 mt-2">
                                            {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </View>

                {/* AI Insight Card */}
                <View className="px-5 mb-24">
                    <Text className="text-lg font-bold text-slate-900 mb-4">Suggestion IA du jour</Text>
                    <View className="bg-slate-900 rounded-2xl p-5 relative overflow-hidden shadow-lg">
                        <View className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-20 rounded-full blur-3xl -mr-10 -mt-10" />

                        <View className="flex-row items-center gap-2 mb-3">
                            <Sparkles size={16} color="#c084fc" />
                            <Text className="text-xs font-bold uppercase tracking-wider text-slate-300">Ekonom-IA Insight</Text>
                        </View>

                        <Text className="text-slate-200 text-sm leading-6 mb-4">
                            Les ventes chutent généralement le mardi. Lancez une "Offre Flash Mardi" pour vos {stats?.totalSubscribers || 0} abonnés pour booster le trafic.
                        </Text>

                        <TouchableOpacity
                            className="bg-white py-3 rounded-xl items-center"
                            onPress={() => router.push("/promotions/create")}
                        >
                            <Text className="text-slate-900 font-bold text-sm">Créer cette campagne</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <StatusBar style="dark" />
        </View>
    );
}
