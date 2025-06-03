import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/colors';
import { trpc, trpcClient } from '@/lib/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.white,
              },
              headerTintColor: colors.text,
              headerTitleStyle: {
                fontWeight: '600',
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ title: "Log In" }} />
            <Stack.Screen name="auth/signup" options={{ title: "Sign Up" }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="event/[id]" 
              options={{ 
                title: "Event Details",
                headerBackTitle: "Back"
              }} 
            />
            <Stack.Screen 
              name="ticket/[id]" 
              options={{ 
                title: "Ticket Details",
                headerBackTitle: "Back"
              }} 
            />
            <Stack.Screen 
              name="checkout/[eventId]" 
              options={{ 
                title: "Checkout",
                headerBackTitle: "Back"
              }} 
            />
            <Stack.Screen 
              name="host/create-event" 
              options={{ 
                title: "Create Event",
                headerBackTitle: "Back"
              }} 
            />
          </Stack>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
}