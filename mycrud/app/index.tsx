import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react-native";

export default function Index() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    try {
    } catch (error) {}
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-6 justify-center"
      >
        {/* Header Section */}
        <View className="mb-10 items-center">
          <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center shadow-lg mb-4">
            <Lock color="white" size={40} />
          </View>
          <Text className="text-3xl font-bold text-slate-900">Bienvenue</Text>
        </View>

        {/* Form Section */}
        <View className="space-y-4">
          <View className="relative">
            {/* L'icône est placée ici */}
            <View className="absolute left-4 top-3.5 z-10">
              <Mail color="#64748b" size={20} />
            </View>
            <TextInput
              placeholder="Email"
              className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4"
            />
          </View>

          <View className="relative">
            <View className="absolute left-4 top-3.5 z-10">
              <Lock color="#64748b" size={20} />
            </View>
            <TextInput
              placeholder="Mot de passe"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!isPasswordVisible}
              className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-slate-900 text-base focus:border-blue-500"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-3.5"
            >
              {isPasswordVisible ? (
                <EyeOff color="#64748b" size={20} />
              ) : (
                <Eye color="#64748b" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="items-end">
            <Text className="text-blue-600 font-medium">
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="bg-blue-600 rounded-2xl py-4 flex-row items-center justify-center shadow-md shadow-blue-300 mt-4"
          >
            <Text className="text-white font-bold text-lg mr-2">
              Se connecter
            </Text>
            <ArrowRight color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/register")}
            className="bg-blue-600 rounded-2xl py-4 flex-row items-center justify-center shadow-md shadow-blue-300 mt-4"
          >
            <Text className="text-white font-bold text-lg mr-2">
              Créer un compte
            </Text>
            <ArrowRight color="white" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
