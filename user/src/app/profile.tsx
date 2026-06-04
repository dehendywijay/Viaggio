import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import {
  User,
  Settings,
  CreditCard,
  Heart,
  LogOut,
  ChevronRight,
  Star,
  Backpack,
} from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "@/hooks/auth/useLogout";
import { useProfile } from "@/hooks/user/useProfile";
import { useOrders } from "@/hooks/order/useOrders";

const MENU_ITEMS = [
  { icon: User, label: "Edit Profil", sub: "Ubah foto & informasi", color: "#FF6B5B", route: "/auth/login" },
  { icon: CreditCard, label: "Metode Pembayaran", sub: "Kelola kartu & dompet digital", color: "#10b981", route: null },
  { icon: Heart, label: "Destinasi Favorit", sub: "Lihat wishlist destinasimu", color: "#f43f5e", route: "/favorite" },
  { icon: Settings, label: "Pengaturan", sub: "Notifikasi & preferensi akun", color: "#64748b", route: null },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { handleLogout, loading: loggingOut } = useLogout();
  const { profile, loading: profileLoading } = useProfile(user?.email);
  const { orders } = useOrders(user?.id);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        bounces={true}
        alwaysBounceVertical={true}
      >
        {/* Coral hero header */}
        <View
          className="px-6 pt-6 pb-24 items-center"
          style={{ backgroundColor: "#FF6B5B" }}
        >
          <View className="w-full flex-row justify-between items-center mb-8">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Settings size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View
            className="w-24 h-24 rounded-full items-center justify-center border-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.25)",
              borderColor: "rgba(255,255,255,0.5)",
            }}
          >
            <User size={40} color="white" />
          </View>

          <Text className="text-white text-xl font-bold mt-4">{user?.nama ?? "Pengguna TripTix"}</Text>
          <Text className="text-white/70 text-sm mt-1">{user?.email ?? ""}</Text>

          <TouchableOpacity
            className="mt-4 px-6 py-2 rounded-full border border-white/40"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            onPress={() => router.push("/auth/login")}
          >
            <Text className="text-white font-semibold text-sm">Edit Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Stats card — overlaps hero */}
        <View className="px-6 -mt-14 mb-6 z-10">
          <View
            className="bg-white rounded-3xl px-6 py-5 flex-row justify-between items-center border border-slate-100"
            style={{ shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 12 }}
          >
            <View className="items-center flex-1">
              <View className="w-10 h-10 rounded-2xl bg-primary/10 items-center justify-center mb-2">
                <Backpack size={18} color="#FF6B5B" />
              </View>
              <Text className="text-xl font-bold text-slate-900">
                {orders.length}
              </Text>
              <Text className="text-slate-400 text-xs text-center mt-0.5">Trip{"\n"}Selesai</Text>
            </View>

            <View className="w-px h-14 bg-slate-100" />

            <View className="items-center flex-1">
              <View className="w-10 h-10 rounded-2xl bg-amber-50 items-center justify-center mb-2">
                <Star size={18} color="#f59e0b" />
              </View>
              {profileLoading ? (
                <ActivityIndicator size="small" color="#f59e0b" />
              ) : (
                <Text className="text-xl font-bold text-slate-900">
                  {profile?.reviews?.length ?? 0}
                </Text>
              )}
              <Text className="text-slate-400 text-xs text-center mt-0.5">Ulasan{"\n"}Diberikan</Text>
            </View>

            <View className="w-px h-14 bg-slate-100" />

            <View className="items-center flex-1">
              <View className="w-10 h-10 rounded-2xl bg-rose-50 items-center justify-center mb-2">
                <Heart size={18} color="#f43f5e" />
              </View>
              <Text className="text-xl font-bold text-slate-900">-</Text>
              <Text className="text-slate-400 text-xs text-center mt-0.5">Favorit{"\n"}Tersimpan</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View className="px-6 mb-6">
          <Text className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-3 ml-1">
            Akun
          </Text>
          <View className="bg-white rounded-3xl border border-slate-100 overflow-hidden"
                style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 }}>
            {MENU_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center px-5 py-4 ${
                    index !== MENU_ITEMS.length - 1 ? "border-b border-slate-50" : ""
                  }`}
                  onPress={() => item.route && router.push(item.route as any)}
                >
                  <View
                    className="w-11 h-11 rounded-2xl items-center justify-center mr-4"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon size={20} color={item.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-800 font-semibold text-base">{item.label}</Text>
                    <Text className="text-slate-400 text-xs mt-0.5">{item.sub}</Text>
                  </View>
                  <ChevronRight size={18} color="#cbd5e1" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Logout */}
        <View className="px-6">
          <TouchableOpacity
            className="bg-red-50 py-4 rounded-2xl flex-row items-center justify-center border border-red-100"
            onPress={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <ActivityIndicator color="#ef4444" size="small" />
            ) : (
              <>
                <LogOut size={18} color="#ef4444" />
                <Text className="text-red-500 font-bold ml-2">Keluar dari Akun</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
