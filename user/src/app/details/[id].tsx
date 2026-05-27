"use client"

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  DollarSign,
  MessageSquarePlus,
  ChevronUp,
} from "lucide-react-native";
import { useWisatabyId } from "@/hooks/wisata/useWisataById";
import { useReviewsByWisata } from "@/hooks/review/useReviewsByWisata";
import { useCreateReview } from "@/hooks/review/useCreateReview";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { wisata, loading, error } = useWisatabyId(id as string);
  const { reviews, loading: reviewLoading, refetch: refetchReviews } = useReviewsByWisata(id as string);
  const { submitReview, loading: submitting, error: reviewError } = useCreateReview();

  const shortDesc = wisata?.deskripsi.slice(0, 100);
  const isLong = (wisata?.deskripsi?.length ?? 0) > 100;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  const handleSubmitReview = async () => {
    if (!wisata?.ID || rating === 0) return;
    try {
      await submitReview(wisata.ID, rating, comment);
      setRating(0);
      setComment("");
      setShowForm(false);
      refetchReviews();
    } catch {
      // error sudah di-handle di hook
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Hero Image */}
      <View className="relative h-[380px]">
        <Image
          source={{ uri: wisata?.Fotos?.[0]?.url }}
          className="w-full h-full rounded-b-[36px]"
          contentFit="cover"
        />
        <View className="absolute top-0 left-0 right-0 h-28 bg-black/25 rounded-b-none" />

        {/* Top Navigation */}
        <View className="absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 bg-black/30 rounded-full items-center justify-center"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className="w-11 h-11 bg-black/30 rounded-full items-center justify-center"
            >
              <Heart
                size={22}
                color="white"
                fill={isFavorite ? "white" : "transparent"}
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-11 h-11 bg-black/30 rounded-full items-center justify-center">
              <Share2 size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-6 pt-6">
          {/* Title */}
          <Text className="text-3xl font-bold text-slate-900">{wisata?.nama}</Text>

          {/* Rating */}
          <View className="flex-row items-center mt-2 flex-wrap gap-x-3">
            <View className="flex-row items-center">
              <Star size={16} color="#f59e0b" fill={avgRating ? "#f59e0b" : "transparent"} />
              <Text className="text-slate-700 font-semibold ml-1">
                {avgRating ? avgRating.toFixed(1) : "Baru"}
              </Text>
              <Text className="text-slate-400 ml-1 text-sm">
                {reviews.length > 0 ? `(${reviews.length} ulasan)` : "(Belum ada ulasan)"}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mt-5">
            <Text className="text-slate-500 leading-6 text-base">
              {expanded || !isLong ? wisata?.deskripsi : shortDesc + "..."}
            </Text>
            {isLong && (
              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text className="text-primary font-semibold mt-1">
                  {expanded ? "Show less" : "Read more..."}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Location */}
          <View className="mt-6 flex-row items-start">
            <View className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center mr-3 mt-0.5">
              <MapPin size={20} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-xs mb-0.5">Lokasi</Text>
              <Text className="text-slate-900 font-semibold">{wisata?.alamat}</Text>
            </View>
          </View>

          {/* Price */}
          <View className="mt-4 flex-row items-start">
            <View className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center mr-3 mt-0.5">
              <DollarSign size={20} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-xs mb-0.5">Harga Tiket</Text>
              <Text className="text-slate-900 font-semibold">
                {wisata?.harga === 0
                  ? "Gratis"
                  : `Rp ${wisata?.harga.toLocaleString("id-ID")}`}
              </Text>
              {(wisata?.harga ?? 0) > 0 && (
                <Text className="text-slate-400 text-xs">per orang • IDR</Text>
              )}
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            className="bg-primary mt-8 py-4 rounded-2xl items-center"
            style={{
              shadowColor: "#FF6B5B",
              shadowOpacity: 0.35,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
            }}
            onPress={() => router.push(`/checkout/${wisata?.ID}`)}
          >
            <Text className="text-white font-bold text-lg">Mulai Perjalanan</Text>
          </TouchableOpacity>

          {/* ── Reviews Section ── */}
          <View className="mt-10">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-900 font-bold text-xl">Ulasan</Text>
              {avgRating && (
                <View className="flex-row items-center bg-amber-50 px-3 py-1.5 rounded-full">
                  <Star size={13} color="#f59e0b" fill="#f59e0b" />
                  <Text className="text-amber-600 font-bold ml-1 text-sm">
                    {avgRating.toFixed(1)}
                  </Text>
                  <Text className="text-amber-400 text-xs ml-1">
                    / 5
                  </Text>
                </View>
              )}
            </View>

            {/* Review List */}
            {reviewLoading ? (
              <ActivityIndicator color="#FF6B5B" className="my-4" />
            ) : reviews.length === 0 ? (
              <View className="bg-slate-50 rounded-2xl p-5 items-center">
                <Text className="text-slate-400 text-sm text-center">
                  Belum ada ulasan untuk destinasi ini.{"\n"}Jadilah yang pertama menulis!
                </Text>
              </View>
            ) : (
              reviews.map((review) => (
                <View
                  key={review.ID}
                  className="bg-slate-50 rounded-2xl p-4 mb-3 border border-slate-100"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          color="#f59e0b"
                          fill={s <= review.rating ? "#f59e0b" : "transparent"}
                        />
                      ))}
                    </View>
                    <Text className="text-slate-400 text-xs">
                      {new Date(review.CreatedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                  </View>
                  {review.User?.nama && (
                    <Text className="text-slate-500 text-xs font-semibold mb-1">
                      {review.User.nama}
                    </Text>
                  )}
                  <Text className="text-slate-700 text-sm leading-5">{review.comment}</Text>
                </View>
              ))
            )}

            {/* Toggle Form Button */}
            <TouchableOpacity
              className="mt-3 py-3.5 rounded-2xl border border-primary flex-row items-center justify-center gap-2"
              onPress={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <>
                  <ChevronUp size={18} color="#FF6B5B" />
                  <Text className="text-primary font-semibold">Tutup Form</Text>
                </>
              ) : (
                <>
                  <MessageSquarePlus size={18} color="#FF6B5B" />
                  <Text className="text-primary font-semibold">Tulis Ulasan</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Review Form */}
            {showForm && (
              <View className="mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                {/* Star Picker */}
                <Text className="text-slate-700 font-semibold mb-3">Rating kamu</Text>
                <View className="flex-row mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <TouchableOpacity
                      key={s}
                      onPress={() => setRating(s)}
                      className="mr-3"
                    >
                      <Star
                        size={36}
                        color="#f59e0b"
                        fill={s <= rating ? "#f59e0b" : "transparent"}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Comment Input */}
                <Text className="text-slate-700 font-semibold mb-2">Komentar</Text>
                <TextInput
                  value={comment}
                  onChangeText={setComment}
                  multiline
                  placeholder="Ceritakan pengalamanmu di sini..."
                  placeholderTextColor="#94a3b8"
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                    borderRadius: 12,
                    padding: 12,
                    color: "#0f172a",
                    fontSize: 14,
                    textAlignVertical: "top",
                    minHeight: 100,
                  }}
                />

                {reviewError && (
                  <Text className="text-red-500 text-sm mt-2">{reviewError}</Text>
                )}

                {/* Submit */}
                <TouchableOpacity
                  className="mt-4 py-3.5 rounded-2xl items-center"
                  style={{
                    backgroundColor: rating === 0 ? "#cbd5e1" : "#FF6B5B",
                  }}
                  onPress={handleSubmitReview}
                  disabled={submitting || rating === 0}
                >
                  {submitting ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-bold">Kirim Ulasan</Text>
                  )}
                </TouchableOpacity>
                {rating === 0 && (
                  <Text className="text-slate-400 text-xs text-center mt-2">
                    Pilih bintang dulu sebelum mengirim
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
