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
import { Mail, Lock, User, ArrowRight, ArrowLeft, MapPin } from "lucide-react-native";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading, error } = useRegister();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FF6B5B" }}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <ArrowLeft size={20} color="white" />
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <MapPin size={16} color="white" />
              <Text style={{ color: "white", fontWeight: "700", fontSize: 15, marginLeft: 6 }}>
                TripTix
              </Text>
            </View>
            <Text style={{ color: "white", fontWeight: "800", fontSize: 26, lineHeight: 34 }}>
              Buat Akun Baru 🗺️
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 6 }}>
              Bergabung dan mulai petualanganmu!
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 36,
              borderTopRightRadius: 36,
              paddingHorizontal: 28,
              paddingTop: 32,
              paddingBottom: 48,
              minHeight: 520,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#0f172a" }}>
              Isi Data Dirimu
            </Text>
            <Text style={{ color: "#94a3b8", fontSize: 13, marginTop: 4, marginBottom: 24 }}>
              Daftar gratis dan langsung eksplor!
            </Text>

            {error && (
              <View
                style={{
                  marginBottom: 16,
                  backgroundColor: "#fef2f2",
                  borderWidth: 1,
                  borderColor: "#fecaca",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              >
                <Text style={{ color: "#ef4444", fontSize: 13 }}>{error}</Text>
              </View>
            )}

            {/* Nama */}
            <View style={{ marginBottom: 14 }}>
              <Text style={{ color: "#475569", fontWeight: "600", fontSize: 13, marginBottom: 8 }}>
                Nama Lengkap
              </Text>
              <View
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#f1f5f9",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
              >
                <User size={18} color="#94a3b8" />
                <TextInput
                  placeholder="Nama lengkapmu"
                  style={{ marginLeft: 12, flex: 1, color: "#0f172a", fontSize: 15 }}
                  placeholderTextColor="#94a3b8"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email */}
            <View style={{ marginBottom: 14 }}>
              <Text style={{ color: "#475569", fontWeight: "600", fontSize: 13, marginBottom: 8 }}>
                Email
              </Text>
              <View
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#f1f5f9",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
              >
                <Mail size={18} color="#94a3b8" />
                <TextInput
                  placeholder="user@example.com"
                  style={{ marginLeft: 12, flex: 1, color: "#0f172a", fontSize: 15 }}
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}
            <View style={{ marginBottom: 28 }}>
              <Text style={{ color: "#475569", fontWeight: "600", fontSize: 13, marginBottom: 8 }}>
                Password
              </Text>
              <View
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#f1f5f9",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
              >
                <Lock size={18} color="#94a3b8" />
                <TextInput
                  placeholder="Min. 8 karakter"
                  style={{ marginLeft: 12, flex: 1, color: "#0f172a", fontSize: 15 }}
                  placeholderTextColor="#94a3b8"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#FF6B5B",
                borderRadius: 18,
                paddingVertical: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#FF6B5B",
                shadowOpacity: 0.4,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 7 },
                elevation: 10,
                opacity: loading ? 0.7 : 1,
              }}
              onPress={() => handleRegister(name, email, password)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={{ color: "white", fontWeight: "700", fontSize: 16, marginRight: 8 }}>
                    Daftar Sekarang
                  </Text>
                  <ArrowRight size={20} color="white" />
                </>
              )}
            </TouchableOpacity>

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 11,
                textAlign: "center",
                marginTop: 16,
                marginBottom: 20,
                lineHeight: 18,
              }}
            >
              Dengan mendaftar, kamu menyetujui{" "}
              <Text style={{ color: "#FF6B5B", fontWeight: "600" }}>Syarat & Ketentuan</Text>
              {" "}serta{" "}
              <Text style={{ color: "#FF6B5B", fontWeight: "600" }}>Kebijakan Privasi</Text> kami.
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#94a3b8" }}>Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: "#FF6B5B", fontWeight: "700" }}>Masuk di sini</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
