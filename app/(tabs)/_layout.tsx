import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Heart, Map, Ticket, User } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          height: 100, // Increased from 90 to 100 to make icons higher
          paddingBottom: 25, // Increased from 20 to 25 to push icons up
          paddingTop: 20, // Increased from 16 to 20 to push icons higher
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 25, // Increased from 20 to 25 to push labels up
        },
        tabBarIconStyle: {
          marginTop: 16, // Increased from 12 to 16 to push icons higher
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color, size }) => <Ticket size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}