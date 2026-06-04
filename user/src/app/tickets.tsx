import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { MapPin, CalendarDays } from "lucide-react-native";
import { useAuth } from "@/src/context/AuthContext";
import { useOrders } from "@/hooks/order/useOrders";

export default function MyTripScreen() {
  const [activeTab, setActiveTab] = useState("Aktif");
  const { user } = useAuth();
  const { orders, loading, error } = useOrders(user?.id);

  const activeOrders = orders.filter((o) => o.status === "pending");
  const historyOrders = orders.filter((o) => o.status !== "pending");
  const displayOrders = activeTab === "Aktif" ? activeOrders : historyOrders;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-100">
        <Text className="text-2xl font-bold text-slate-900">My Trip</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 pt-4 pb-2 bg-white border-b border-slate-50">
        {["Aktif", "Riwayat"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`mr-6 pb-2 border-b-2 ${
              activeTab === tab ? "border-primary" : "border-transparent"
            }`}
          >
            <Text
              className={`text-base font-semibold ${
                activeTab === tab ? "text-primary" : "text-slate-400"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-1 px-6 pt-4">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator color="#FF6B5B" size="large" />
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-slate-400">{error}</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {displayOrders.length === 0 ? (
              <View className="py-20 items-center justify-center">
                <Text className="text-slate-400">
                  {activeTab === "Aktif"
                    ? "Tidak ada pesanan aktif."
                    : "Belum ada riwayat perjalanan."}
                </Text>
              </View>
            ) : (
              displayOrders.map((order, index) => (
                <View
                  key={index}
                  className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6"
                >
                  {/* Wisata Image */}
                  <View className="relative h-36">
                    <Image
                      source={{ uri: order.wisata?.Fotos?.[0]?.url }}
                      className="w-full h-full"
                      contentFit="cover"
                    />
                    <View className="absolute inset-0 bg-black/30 justify-center items-center">
                      <Text className="text-white font-bold text-xl">
                        {order.wisata?.nama ?? `Wisata #${order.wisata_id}`}
                      </Text>
                    </View>
                  </View>

                  <View className="p-5 relative">
                    <View className="flex-row justify-between mb-4">
                      <View>
                        <Text className="text-slate-400 text-xs mb-1">
                          Tanggal
                        </Text>
                        <View className="flex-row items-center">
                          <CalendarDays size={14} color="#64748b" />
                          <Text className="text-slate-700 font-medium ml-1">
                            {new Date(order.tanggal).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text className="text-slate-400 text-xs mb-1">
                          Jumlah
                        </Text>
                        <Text className="text-slate-700 font-medium text-right">
                          {order.qty} Orang
                        </Text>
                      </View>
                    </View>

                    {order.wisata?.alamat && (
                      <View className="mb-4">
                        <Text className="text-slate-400 text-xs mb-1">
                          Lokasi
                        </Text>
                        <View className="flex-row items-center">
                          <MapPin size={14} color="#64748b" />
                          <Text className="text-slate-700 font-medium ml-1">
                            {order.wisata.alamat}
                          </Text>
                        </View>
                      </View>
                    )}

                    <View className="border-t border-dashed border-slate-200 pt-4 mt-2 flex-row items-center justify-between">
                      <View>
                        <Text className="text-slate-400 text-xs mb-1">
                          Total
                        </Text>
                        <Text className="text-primary font-bold">
                          Rp {order.total_harga.toLocaleString("id-ID")}
                        </Text>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-xl ${
                          order.status === "pending"
                            ? "bg-amber-50"
                            : "bg-green-50"
                        }`}
                      >
                        <Text
                          className={`font-bold text-sm capitalize ${
                            order.status === "pending"
                              ? "text-amber-500"
                              : "text-green-600"
                          }`}
                        >
                          {order.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
