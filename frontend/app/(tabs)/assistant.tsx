import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ListRenderItemInfo,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ArrowLeft, Sparkles } from 'lucide-react-native';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { EkoBot } from '../../components/EkoBot';
import { api } from '../../services/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

// ---------------------------------------------------------------------------
// Typing indicator  (3 animated dots)
// ---------------------------------------------------------------------------

const TypingIndicator = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <Animated.View entering={FadeInDown.duration(300)} className="flex-row items-end gap-2 mb-4 px-4">
            <View className="w-7 h-7 items-center justify-center">
                <EkoBot scale={0.35} />
            </View>
            <GlassPanel className="rounded-2xl rounded-bl-md px-5 py-3 max-w-[75%]">
                <Text className="text-white text-base tracking-widest">{dots || '...'}</Text>
            </GlassPanel>
        </Animated.View>
    );
};

// ---------------------------------------------------------------------------
// Chat bubble
// ---------------------------------------------------------------------------

const ChatBubble = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';

    if (isUser) {
        return (
            <Animated.View
                entering={FadeInDown.duration(300)}
                className="flex-row justify-end mb-4 px-4"
            >
                <GlassPanel
                    intensity={30}
                    className="rounded-2xl rounded-br-md px-5 py-3 max-w-[80%]"
                    style={{ backgroundColor: 'rgba(59,130,246,0.25)', borderColor: 'rgba(96,165,250,0.3)' }}
                >
                    <Text className="text-white text-[15px] leading-6">{item.content}</Text>
                </GlassPanel>
            </Animated.View>
        );
    }

    return (
        <Animated.View
            entering={FadeInDown.duration(300)}
            className="flex-row items-end gap-2 mb-4 px-4"
        >
            <View className="w-7 h-7 items-center justify-center">
                <EkoBot scale={0.35} />
            </View>
            <GlassPanel className="rounded-2xl rounded-bl-md px-5 py-3 max-w-[75%]">
                <Text className="text-gray-100 text-[15px] leading-6">{item.content}</Text>
            </GlassPanel>
        </Animated.View>
    );
};

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

const WELCOME_MESSAGE: Message = {
    id: 'welcome',
    role: 'assistant',
    content: "Salut ! Je suis Eko, ton assistant marketing. Comment puis-je t'aider ?",
};

export default function AssistantScreen() {
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList<Message>>(null);

    // ------------------------------------------------------------------
    // Send handler
    // ------------------------------------------------------------------

    const handleSend = useCallback(async () => {
        const text = inputText.trim();
        if (!text || isTyping) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
        };

        setMessages((prev) => [userMessage, ...prev]);
        setInputText('');
        setIsTyping(true);

        try {
            const response = await api.ai.generateWithEko(text);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response?.content || "Hmm, je n'ai pas pu formuler de r\u00e9ponse. R\u00e9essaie !",
            };
            setMessages((prev) => [assistantMessage, ...prev]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "D\u00e9sol\u00e9, une erreur est survenue. R\u00e9essaie dans un instant.",
            };
            setMessages((prev) => [errorMessage, ...prev]);
        } finally {
            setIsTyping(false);
        }
    }, [inputText, isTyping]);

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<Message>) => <ChatBubble item={item} />,
        [],
    );

    const keyExtractor = useCallback((item: Message) => item.id, []);

    return (
        <View className="flex-1 bg-[#050505]">
            <AnimatedBackground />

            <SafeAreaView className="flex-1" edges={['top']}>
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={0}
                >
                    {/* ---- Header ---- */}
                    <Animated.View entering={FadeInUp.duration(400)} className="px-5 pt-2 pb-3">
                        <GlassPanel className="rounded-2xl px-4 py-3 flex-row items-center gap-3">
                            <View className="w-10 h-10 items-center justify-center">
                                <EkoBot scale={0.55} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-lg font-bold tracking-tight">Eko Assistant</Text>
                                <Text className="text-xs text-purple-400 font-medium">Ton assistant marketing IA</Text>
                            </View>
                            <Sparkles size={20} color="#c084fc" />
                        </GlassPanel>
                    </Animated.View>

                    {/* ---- Messages ---- */}
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        inverted
                        contentContainerStyle={{ paddingTop: 12, paddingBottom: 8 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        ListHeaderComponent={isTyping ? <TypingIndicator /> : null}
                    />

                    {/* ---- Input bar ---- */}
                    <SafeAreaView edges={['bottom']} className="px-4 pt-2 pb-1">
                        <GlassPanel className="rounded-2xl flex-row items-end px-4 py-2 gap-2" intensity={30}>
                            <TextInput
                                className="flex-1 text-white text-[15px] max-h-28 py-2"
                                placeholder="Demande quelque chose \u00e0 Eko..."
                                placeholderTextColor="#6b7280"
                                value={inputText}
                                onChangeText={setInputText}
                                multiline
                                onSubmitEditing={handleSend}
                                blurOnSubmit={false}
                                returnKeyType="send"
                            />
                            <TouchableOpacity
                                onPress={handleSend}
                                disabled={!inputText.trim() || isTyping}
                                className={`w-10 h-10 rounded-xl items-center justify-center mb-0.5 ${
                                    inputText.trim() && !isTyping
                                        ? 'bg-blue-500'
                                        : 'bg-white/10'
                                }`}
                                activeOpacity={0.7}
                            >
                                <Send
                                    size={18}
                                    color={inputText.trim() && !isTyping ? '#ffffff' : '#6b7280'}
                                />
                            </TouchableOpacity>
                        </GlassPanel>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}
