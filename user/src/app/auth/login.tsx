import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Mail, Lock, ArrowRight, Plane } from "lucide-react-native";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useLogin();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#FF6B5B" }}>
      <StatusBar barStyle="light-content" />

      <View className="items-center pt-10 pb-10 px-8">
        <View
          className="w-20 h-20 rounded-3xl items-center justify-center mb-5"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <Plane size={38} color="white" strokeWidth={1.8} />
        </View>

        <Text className="text-4xl font-bold text-white tracking-tight">TripTix</Text>
        <Text className="text-white/75 text-sm mt-2 text-center leading-5">
          Explore Indonesia, One Ticket at a Time
        </Text>

        <View className="flex-row items-center gap-2 mt-5">
          <View className="w-6 h-1.5 rounded-full bg-white" />
          <View className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <View className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 bg-white rounded-t-[40px]"
          contentContainerStyle={{ paddingHorizontal: 32, paddingTop: 36, paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-2xl font-bold text-slate-900">Selamat Datang!</Text>
          <Text className="text-slate-400 text-sm mt-1 mb-8">
            Masuk dan lanjutkan petualanganmu 🌏
          </Text>

          {error && (
            <View className="mb-4 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
              <Text className="text-red-500 text-sm">{error}</Text>
            </View>
          )}

          <View className="mb-4">
            <Text className="text-slate-600 font-semibold text-sm mb-2">Email</Text>
            <View className="bg-slate-50 px-4 py-4 rounded-2xl flex-row items-center border border-slate-100">
              <Mail size={18} color="#94a3b8" />
              <TextInput
                placeholder="user@example.com"
                className="ml-3 flex-1 text-slate-900 text-base"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View className="mb-2">
            <Text className="text-slate-600 font-semibold text-sm mb-2">Password</Text>
            <View className="bg-slate-50 px-4 py-4 rounded-2xl flex-row items-center border border-slate-100">
              <Lock size={18} color="#94a3b8" />
              <TextInput
                placeholder="••••••••"
                className="ml-3 flex-1 text-slate-900 text-base"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <TouchableOpacity className="items-end mb-8">
            <Text className="text-primary font-semibold text-sm">Lupa Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary w-full py-4 rounded-2xl flex-row items-center justify-center"
            style={{
              shadowColor: "#FF6B5B",
              shadowOpacity: 0.4,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 7 },
              elevation: 10,
              opacity: loading ? 0.7 : 1,
            }}
            onPress={() => handleLogin(email, password)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">Masuk Sekarang</Text>
                <ArrowRight size={20} color="white" />
              </>
            )}
          </TouchableOpacity>

          <View className="flex-row items-center my-7">
            <View className="flex-1 h-px bg-slate-100" />
            <Text className="text-slate-300 mx-4 text-sm">atau</Text>
            <View className="flex-1 h-px bg-slate-100" />
          </View>

          <View className="flex-row justify-center items-center">
            <Text className="text-slate-400">Belum punya akun? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text className="text-primary font-bold">Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
