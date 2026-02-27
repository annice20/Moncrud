import React, { useState } from "react";
import { registerUser } from "../services/api";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  MapPin,
  Phone,
  Globe,
} from "lucide-react-native";
import { router } from "expo-router";

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    tel: "",
    ville: "",
    pays: "",
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    if (
      !user.nom ||
      !user.prenom ||
      !user.prenom ||
      !user.adresse ||
      !user.tel ||
      !user.ville ||
      !user.pays ||
      !user.email ||
      !user.password
    ) {
      Alert.alert("Erreur", "Veuillez remplir les champs");
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser(user);
      Alert.alert("Succès", "Votre compte a été créé !");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* ScrollView permet de faire défiler si le contenu est trop long */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }} // Espace en bas pour respirer
          className="px-6"
        >
          {/* Header Section - Un peu plus petit pour gagner de la place */}
          <View className="mt-10 mb-8 items-center">
            <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center shadow-lg mb-4">
              <User color="white" size={32} />
            </View>
            <Text className="text-2xl font-bold text-slate-900">
              Créer un compte
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-3">
            {/* Ligne : Nom & Prénom */}
            <View className="flex-row space-x-2">
              <View className="flex-1 relative">
                <TextInput
                  placeholder="Nom"
                  value={user.nom}
                  onChangeText={(text) => handleChange("nom", text)}
                  className="bg-white border border-slate-200 rounded-xl py-3 px-4"
                />
              </View>
              <View className="flex-1 relative">
                <TextInput
                  placeholder="Prénom"
                  value={user.prenom}
                  onChangeText={(text) => handleChange("prenom", text)}
                  className="bg-white border border-slate-200 rounded-xl py-3 px-4"
                />
              </View>
            </View>

            <View className="relative">
              <View className="absolute left-4 top-3 z-10">
                <MapPin color="#64748b" size={18} />
              </View>
              <TextInput
                placeholder="Adresse"
                value={user.adresse}
                onChangeText={(text) => handleChange("adresse", text)}
                className="bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4"
              />
            </View>

            <View className="relative">
              <View className="absolute left-4 top-3 z-10">
                <Phone color="#64748b" size={18} />
              </View>
              <TextInput
                placeholder="Tel"
                value={user.tel}
                onChangeText={(text) => handleChange("tel", text)}
                keyboardType="phone-pad"
                className="bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4"
              />
            </View>

            {/* Ligne : Ville & Pays */}
            <View className="flex-row space-x-2">
              <View className="flex-1 relative">
                <TextInput
                  placeholder="Ville"
                  value={user.ville}
                  onChangeText={(text) => handleChange("ville", text)}
                  className="bg-white border border-slate-200 rounded-xl py-3 px-4"
                />
              </View>
              <View className="flex-1 relative">
                <TextInput
                  placeholder="Pays"
                  value={user.pays}
                  onChangeText={(text) => handleChange("pays", text)}
                  className="bg-white border border-slate-200 rounded-xl py-3 px-4"
                />
              </View>
            </View>

            <View className="relative">
              <View className="absolute left-4 top-3 z-10">
                <Mail color="#64748b" size={18} />
              </View>
              <TextInput
                placeholder="Email"
                value={user.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4"
              />
            </View>

            <View className="relative">
              <View className="absolute left-4 top-3 z-10">
                <Lock color="#64748b" size={18} />
              </View>
              <TextInput
                placeholder="Mot de passe"
                value={user.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry={!isPasswordVisible}
                className="bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-12"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4 top-3"
              >
                {isPasswordVisible ? (
                  <EyeOff color="#64748b" size={18} />
                ) : (
                  <Eye color="#64748b" size={18} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="bg-blue-600 rounded-xl py-4 flex-row items-center justify-center shadow-md mt-4"
            >
              <Text className="text-white font-bold text-lg mr-2">Valider</Text>
              <ArrowRight color="white" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace("/")}
              className="py-4"
            >
              <Text className="text-center text-slate-500">
                Déjà un compte ?{" "}
                <Text className="text-blue-600 font-bold">Connexion</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
