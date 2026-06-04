import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeft, Users, CheckCircle2 } from "lucide-react-native";
import { useWisatabyId } from "@/hooks/wisata/useWisataById";
import { useCreateOrder } from "@/hooks/order/useCreateOrder";
import { useAuth } from "@/src/context/AuthContext";

const DATE_OPTIONS = ["Hari Ini", "Besok", "Lusa"] as const;

function resolveDate(label: (typeof DATE_OPTIONS)[number]): Date {
  const d = new Date();
  if (label === "Besok") d.setDate(d.getDate() + 1);
  if (label === "Lusa") d.setDate(d.getDate() + 2);
  d.setHours(8, 0, 0, 0);
  return d;
}

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [ticketCount, setTicketCount] = useState(1);
  const [selectedDate, setSelectedDate] =
    useState<(typeof DATE_OPTIONS)[number]>("Besok");
  const [selectedPayment, setSelectedPayment] = useState("E-Wallet");

  const { wisata, loading: wisataLoading } = useWisatabyId(id as string);
  const { createOrder, loading: ordering } = useCreateOrder();

  const harga = wisata?.harga ?? 0;
  const totalPrice = harga * ticketCount;
  const adminFee = 2500;
  const grandTotal = totalPrice + adminFee;

  const handleBayar = async () => {
    if (!user?.id || !wisata?.ID) return;

    try {
      await createOrder({
        user_id: user.id,
        wisata_id: Number(wisata.ID),
        qty: ticketCount,
        harga,
        tanggal: resolveDate(selectedDate).toISOString(),
        status: "pending",
      });

      Alert.alert(
        "Pembayaran Berhasil",
        "Tiket berhasil diterbitkan. Lihat pesananmu di My Trip.",
        [{ text: "OK", onPress: () => router.replace("/tickets") }]
      );
    } catch {
      Alert.alert("Gagal", "Terjadi kesalahan saat membuat pesanan.");
    }
  };

  if (wisataLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#FF6B5B" size="large" />
      </SafeAreaView>
    );
  }

  if (!wisata) return null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center border-b border-slate-100 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center -ml-2"
        >
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 ml-2">
          Checkout Tiket
        </Text>
      </View>

      <View className="flex-1 px-6 pt-6">
        <ScrollView
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          alwaysBounceVertical={true}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Destination Summary */}
          <View className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex-row mb-6">
            <Image
              source={{ uri: wisata.Fotos?.[0]?.url }}
              className="w-24 h-24 rounded-2xl"
              contentFit="cover"
            />
            <View className="ml-4 flex-1 justify-center">
              <Text
                className="text-lg font-bold text-slate-900"
                numberOfLines={1}
              >
                {wisata.nama}
              </Text>
              <Text className="text-slate-500 text-sm mt-1">{wisata.alamat}</Text>
              <Text className="text-primary font-bold mt-2">
                Rp {harga.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>

          {/* Date Selection */}
          <Text className="text-lg font-bold text-slate-900 mb-3">
            Tanggal Kunjungan
          </Text>
          <View className="flex-row gap-3 mb-6">
            {DATE_OPTIONS.map((date) => (
              <TouchableOpacity
                key={date}
                onPress={() => setSelectedDate(date)}
                className={`flex-1 py-3 rounded-2xl items-center border ${
                  selectedDate === date
                    ? "bg-primary/10 border-primary"
                    : "bg-white border-slate-200"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedDate === date ? "text-primary" : "text-slate-600"
                  }`}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Ticket Quantity */}
          <Text className="text-lg font-bold text-slate-900 mb-3">
            Jumlah Tiket
          </Text>
          <View className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center mr-3">
                <Users size={20} color="#64748b" />
              </View>
              <Text className="text-slate-700 font-medium text-base">
                Tiket Masuk
              </Text>
            </View>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setTicketCount(Math.max(1, ticketCount - 1))}
                className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center"
              >
                <Text className="text-slate-600 font-bold text-lg">-</Text>
              </TouchableOpacity>
              <Text className="mx-4 font-bold text-lg w-4 text-center">
                {ticketCount}
              </Text>
              <TouchableOpacity
                onPress={() => setTicketCount(ticketCount + 1)}
                className="w-8 h-8 rounded-full bg-primary items-center justify-center"
              >
                <Text className="text-white font-bold text-lg">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Method */}
          <Text className="text-lg font-bold text-slate-900 mb-3">
            Metode Pembayaran
          </Text>
          <View className="bg-white rounded-3xl shadow-sm border border-slate-100 mb-6 overflow-hidden">
            {["E-Wallet", "Transfer Bank", "Kartu Kredit"].map(
              (method, index) => (
                <TouchableOpacity
                  key={method}
                  onPress={() => setSelectedPayment(method)}
                  className={`p-4 flex-row items-center justify-between ${
                    index !== 2 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <Text className="text-slate-700 font-medium">{method}</Text>
                  {selectedPayment === method && (
                    <CheckCircle2 size={20} color="#FF6B5B" />
                  )}
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Price Details */}
          <Text className="text-lg font-bold text-slate-900 mb-3">
            Rincian Harga
          </Text>
          <View className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-8">
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-500">Tiket ({ticketCount}x)</Text>
              <Text className="text-slate-700 font-medium">
                Rp {totalPrice.toLocaleString("id-ID")}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3 pb-3 border-b border-slate-100">
              <Text className="text-slate-500">Biaya Layanan</Text>
              <Text className="text-slate-700 font-medium">
                Rp {adminFee.toLocaleString("id-ID")}
              </Text>
            </View>
            <View className="flex-row justify-between mt-1">
              <Text className="text-slate-900 font-bold text-base">
                Total Pembayaran
              </Text>
              <Text className="text-primary font-bold text-xl">
                Rp {grandTotal.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Action */}
      <View className="p-6 bg-white border-t border-slate-100 shadow-2xl">
        <TouchableOpacity
          className="bg-primary w-full py-4 rounded-2xl items-center shadow-lg shadow-primary/30"
          onPress={handleBayar}
          disabled={ordering}
        >
          {ordering ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Bayar Sekarang</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
