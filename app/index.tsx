import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Redirect } from 'expo-router';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

export default function SplashScreen() {
  const { isAuthenticated } = useAuthStore();
  
  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  // Otherwise, redirect to onboarding
  return <Redirect href="/onboarding" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});