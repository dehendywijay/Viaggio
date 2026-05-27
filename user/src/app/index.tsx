import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Search, Bell, User } from "lucide-react-native";
import DestinasiCard from "../components/DestinasiCard";
import KategoriList from "../components/KategoriList";
import RecentTripCard from "../components/RecentTripCard";
import { categories, recentTrips } from "../data/destinations";
import { useRouter } from "expo-router";
import { useWisata } from "@/hooks/wisata/useWisata";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedKategori, setSelectedKategori] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const { wisata, loading, error, refetch } = useWisata();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  const selectedCategoryObj = categories.find((c) => c.id === selectedKategori);

  const filteredDestinations = wisata.filter((item) => {
    const matchesKategori =
      selectedKategori === "1" || item.kategori === selectedCategoryObj?.name;
    const matchesSearch = item.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesKategori && matchesSearch;
  });

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
            <User size={20} color="#FF6B5B" />
          </View>
          <View>
            <Text className="text-slate-400 text-xs">Welcome back!</Text>
            <Text className="text-slate-900 font-bold text-base">Hello, Pengguna!</Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100 shadow-sm">
          <Bell size={20} color="#1e293b" />
          <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Hero Text */}
        <View className="px-6 mt-2">
          <Text className="text-3xl font-bold text-slate-900 leading-tight">
            Where do you want to{"\n"}explore today?
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-6 mt-5">
          <View className="flex-row items-center bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <TextInput
              placeholder="Explore by destination"
              className="flex-1 text-slate-900 text-base"
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Search size={20} color="#94a3b8" />
          </View>
        </View>

        {/* Categories */}
        <View className="mt-5">
          <KategoriList
            selectedId={selectedKategori}
            onSelect={(id) => setSelectedKategori(id)}
          />
        </View>

        {/* Recent Trip Section */}
        {recentTrips.length > 0 && (
          <View className="mt-6 px-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-xl font-bold text-slate-900">Recent Trip</Text>
              <TouchableOpacity onPress={() => router.push("/tickets")}>
                <Text className="text-primary font-semibold">See All</Text>
              </TouchableOpacity>
            </View>
            {recentTrips.map((trip) => (
              <RecentTripCard key={trip.id} trip={trip} />
            ))}
          </View>
        )}

        {/* Popular Destinations Section */}
        <View className="mt-6 px-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-slate-900">Popular Destinations</Text>
            <TouchableOpacity onPress={() => router.push("/category/1")}>
              <Text className="text-primary font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((item) => (
              <DestinasiCard key={item.ID} destination={item as any} />
            ))
          ) : (
            <View className="py-10 items-center justify-center">
              <Text className="text-slate-400">Destinasi tidak ditemukan</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
