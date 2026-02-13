import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ticket, Clock, CheckCircle, XCircle, Tag } from "lucide-react-native";
import { AnimatedBackground } from "../../components/ui/AnimatedBackground";
import { GlassPanel } from "../../components/ui/GlassPanel";
import { api } from "../../services/api";
import Animated, { FadeInDown } from "react-native-reanimated";

type CouponStatus = "ACTIVE" | "USED" | "EXPIRED";

interface Coupon {
    id: string;
    code: string;
    discount_value: number;
    status: CouponStatus;
    expires_at: string;
}

type FilterKey = "ALL" | "ACTIVE" | "USED";

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "ACTIVE", label: "Active" },
    { key: "USED", label: "Used" },
];

const STATUS_CONFIG: Record<CouponStatus, { color: string; bg: string; border: string; icon: typeof CheckCircle }> = {
    ACTIVE: { color: "#4ade80", bg: "bg-green-500/20", border: "border-green-500/30", icon: CheckCircle },
    USED: { color: "#9ca3af", bg: "bg-gray-500/20", border: "border-gray-500/30", icon: Clock },
    EXPIRED: { color: "#f87171", bg: "bg-red-500/20", border: "border-red-500/30", icon: XCircle },
};

export default function CouponsScreen() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");

    const fetchCoupons = useCallback(async (filter: FilterKey) => {
        try {
            const statusParam = filter === "ALL" ? undefined : filter;
            const data = await api.coupons.list(statusParam);
            setCoupons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchCoupons(activeFilter);
    }, [activeFilter, fetchCoupons]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCoupons(activeFilter);
    };

    const handleFilterChange = (filter: FilterKey) => {
        if (filter === activeFilter) return;
        setActiveFilter(filter);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const renderCouponCard = ({ item, index }: { item: Coupon; index: number }) => {
        const config = STATUS_CONFIG[item.status] || STATUS_CONFIG.EXPIRED;
        const StatusIcon = config.icon;

        return (
            <Animated.View entering={FadeInDown.delay(100 + index * 80).springify()}>
                <GlassPanel className="rounded-[2rem] p-5 mb-4 relative overflow-hidden">
                    {/* Subtle glow for active coupons */}
                    {item.status === "ACTIVE" && (
                        <View className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[60px]" />
                    )}

                    <View className="flex-row items-start justify-between z-10">
                        {/* Left: Icon + Info */}
                        <View className="flex-row items-start gap-4 flex-1">
                            <View className={`w-12 h-12 rounded-2xl ${config.bg} items-center justify-center border ${config.border}`}>
                                <Ticket size={22} color={config.color} />
                            </View>

                            <View className="flex-1">
                                {/* Code */}
                                <Text className="text-lg font-bold text-white tracking-wide">
                                    {item.code}
                                </Text>

                                {/* Discount */}
                                <View className="flex-row items-center gap-2 mt-1">
                                    <Tag size={12} color="#9ca3af" />
                                    <Text className="text-sm text-gray-400 font-medium">
                                        -{item.discount_value}%
                                    </Text>
                                </View>

                                {/* Expiry */}
                                <View className="flex-row items-center gap-2 mt-2">
                                    <Clock size={12} color="#6b7280" />
                                    <Text className="text-xs text-gray-500">
                                        Expire le {formatDate(item.expires_at)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Right: Status Badge */}
                        <View className={`px-3 py-1.5 rounded-full ${config.bg} border ${config.border} flex-row items-center gap-1.5`}>
                            <StatusIcon size={12} color={config.color} />
                            <Text style={{ color: config.color }} className="text-xs font-bold uppercase">
                                {item.status}
                            </Text>
                        </View>
                    </View>
                </GlassPanel>
            </Animated.View>
        );
    };

    const renderEmptyState = () => (
        <View className="items-center justify-center mt-20 px-6">
            <View className="w-20 h-20 rounded-full bg-white/5 border border-white/10 items-center justify-center mb-5">
                <Ticket size={36} color="#4b5563" />
            </View>
            <Text className="text-white text-lg font-bold mb-2">Aucun coupon</Text>
            <Text className="text-gray-400 text-sm text-center leading-5">
                {activeFilter === "ALL"
                    ? "Aucun coupon disponible pour le moment."
                    : `Aucun coupon avec le statut "${activeFilter.toLowerCase()}" trouv\u00e9.`}
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-[#050505]">
            <StatusBar style="light" />
            <AnimatedBackground />

            <View className="flex-1 px-5 pt-12">
                {/* Header */}
                <Animated.View entering={FadeInDown.delay(50)} className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center gap-3">
                        <Text className="text-2xl font-bold text-white tracking-tight">
                            Coupons
                        </Text>
                        {!loading && (
                            <View className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                                <Text className="text-xs font-bold text-gray-300">
                                    {coupons.length}
                                </Text>
                            </View>
                        )}
                    </View>
                </Animated.View>

                {/* Filter Tabs */}
                <Animated.View entering={FadeInDown.delay(100)} className="flex-row gap-2 mb-6">
                    {FILTERS.map((filter) => {
                        const isActive = activeFilter === filter.key;
                        return (
                            <TouchableOpacity
                                key={filter.key}
                                onPress={() => handleFilterChange(filter.key)}
                                activeOpacity={0.7}
                            >
                                <GlassPanel
                                    className={`rounded-full px-4 py-2 ${
                                        isActive
                                            ? "border-purple-500/50"
                                            : "border-white/10"
                                    }`}
                                >
                                    <Text
                                        className={`text-sm font-semibold ${
                                            isActive ? "text-white" : "text-gray-500"
                                        }`}
                                    >
                                        {filter.label}
                                    </Text>
                                </GlassPanel>
                            </TouchableOpacity>
                        );
                    })}
                </Animated.View>

                {/* Content */}
                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#a855f7" />
                        <Text className="text-gray-500 text-sm mt-4">
                            Chargement des coupons...
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={coupons}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCouponCard}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor="#fff"
                            />
                        }
                        ListEmptyComponent={renderEmptyState}
                    />
                )}
            </View>
        </View>
    );
}
