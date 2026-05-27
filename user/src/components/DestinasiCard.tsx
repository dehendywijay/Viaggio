import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Star, MapPin, Heart } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Wisata } from "@/type/wisata";

interface DestinasiCardProps {
  destination: Wisata;
  horizontal?: boolean;
}

export default function DestinasiCard({ destination, horizontal }: DestinasiCardProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/details/${destination.ID}`)}
      className={`rounded-3xl overflow-hidden mb-4 ${horizontal ? "w-72 mr-4" : "w-full"}`}
    >
      <View className="relative">
        <Image
          source={{ uri: destination.foto }}
          className="w-full h-52"
          contentFit="cover"
          transition={500}
        />
          <View className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">{destination.kategori}</Text>
          </View>
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full items-center justify-center"
        >
          <Heart
            size={18}
            color={isFavorite ? "#FF6B5B" : "#94a3b8"}
            fill={isFavorite ? "#FF6B5B" : "transparent"}
          />
        </TouchableOpacity>
      </View>

      <View className="bg-white px-4 py-3 border-x border-b border-slate-100 rounded-b-3xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-slate-900 flex-1 mr-2" numberOfLines={1}>
            {destination.nama}
          </Text>
          <View className="flex-row items-center">
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <Text className="text-slate-700 font-semibold text-sm ml-1">{destination.harga}</Text>
          </View>
        </View>
        <View className="flex-row items-center mt-1">
          <MapPin size={13} color="#94a3b8" />
          <Text className="text-slate-400 text-sm ml-1" numberOfLines={1}>
            {destination.alamat}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
