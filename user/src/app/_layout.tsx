import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import BottomNav from "../components/BottomNav";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "../../global.css";

function AuthGuard() {
  const { isLoggedIn, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === "auth";
    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/auth/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [isLoggedIn, isLoading, segments]);

  return null;
}

function ConditionalBottomNav() {
  const segments = useSegments();
  if (segments[0] === "auth") return null;
  return <BottomNav />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard />
      <View style={{ flex: 1, height: "100%", overflow: "hidden" }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { flex: 1, backgroundColor: "#f8fafc" },
          }}
        />
        <ConditionalBottomNav />
      </View>
    </AuthProvider>
  );
}
