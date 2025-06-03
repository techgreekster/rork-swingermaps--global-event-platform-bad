import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { 
  User, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  FileText, 
  LogOut,
  Star,
  Calendar,
  MessageSquare
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: () => {
            logout();
            router.replace('/auth/login');
          }
        }
      ]
    );
  };
  
  const menuItems = [
    {
      title: 'Profile Settings',
      icon: <User size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/profile'),
    },
    {
      title: 'Payment Methods',
      icon: <CreditCard size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/payment'),
    },
    {
      title: 'My Calendar',
      icon: <Calendar size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/calendar'),
    },
    {
      title: 'My Reviews',
      icon: <Star size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/reviews'),
    },
    {
      title: 'Support',
      icon: <HelpCircle size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/support'),
    },
    {
      title: 'Messages',
      icon: <MessageSquare size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/messages'),
    },
    {
      title: 'Privacy Policy',
      icon: <FileText size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/privacy'),
    },
    {
      title: 'Terms of Service',
      icon: <FileText size={24} color={colors.darkGray} />,
      onPress: () => router.push('/settings/terms'),
    },
  ];
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.avatar }}
          style={styles.avatar}
          contentFit="cover"
        />
        
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.primary} fill={colors.primary} />
            <Text style={styles.rating}>{user?.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
      
      {user?.isHost && (
        <View style={styles.hostBadge}>
          <Text style={styles.hostBadgeText}>Event Host</Text>
        </View>
      )}
      
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIcon}>{item.icon}</View>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <LogOut size={24} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>swingerMaps v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
  },
  hostBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 24,
  },
  hostBadgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.darkGray,
  },
});