import { View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Bot } from "lucide-react-native";
import { AuthService } from "../services/auth";
import { saveTokens } from "../services/storage";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await AuthService.login(email, password);
            await saveTokens(response.accessToken, response.refreshToken);
            router.replace("/(tabs)/dashboard");
        } catch (err: any) {
            setError(err.message || "Échec de la connexion");
        } finally {
            setLoading(false);
        }
    };

    return (
        colors = { ['#7c3aed', '#c026d3']}
                                style = {{ position: 'absolute', width: '100%', height: '100%' }
}
start = {{ x: 0, y: 0.5 }}
end = {{ x: 1, y: 0.5 }}
                            />
    < View className = "py-4 flex-row items-center" >
        <Text className="text-white font-bold text-lg mr-2 tracking-wide">
            {loading ? "Connexion..." : "Accéder au Console"}
        </Text>
{ !loading && <ArrowRight size={20} color="white" /> }
                            </View >
                        </TouchableOpacity >

    <TouchableOpacity
        className="w-full bg-white/5 py-4 rounded-xl flex-row justify-center items-center border border-white/10 hover:bg-white/10 transition-colors"
        onPress={() => Alert.alert("Beta", "L'inscription est fermée pour la beta.")}
    >
        <Text className="text-white font-semibold text-lg tracking-wide">Créer un compte</Text>
    </TouchableOpacity>
                    </View >
                </View >

    <View className="mt-12 items-center opacity-50">
        <Text className="text-slate-500 text-xs tracking-widest uppercase">Secured by Stitch • v2.0</Text>
    </View>
            </SafeAreaView >
        </View >
    );
}
